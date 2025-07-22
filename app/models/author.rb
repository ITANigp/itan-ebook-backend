class Author < ApplicationRecord
  self.primary_key = :id
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable,
         :omniauthable, omniauth_providers: [:google_oauth2]

  # Email validation
  validates :email, presence: true,
                    format: { with: URI::MailTo::EMAIL_REGEXP, message: 'must be a valid email address' },
                    uniqueness: { case_sensitive: false }
  validates :phone_number, format: { with: /\A\+?[\d\s\-\(\)]+\z/, allow_blank: true }

  # associations
  has_many :notifications
  has_many :books
  has_many :author_revenues
  has_many :purchases, through: :books
  has_one :author_banking_detail, dependent: :destroy

  # Active storage attachment
  has_one_attached :author_profile_image

  # 2FA methods
  def generate_two_factor_code!
    # Generate a 6-digit code
    code = rand(100_000..999_999).to_s

    # Store the code with expiration time (10 minutes)
    update(
      two_factor_code: code,
      two_factor_code_expires_at: 10.minutes.from_now,
      two_factor_attempts: 0
    )

    code
  end

  def valid_two_factor_code?(code)
    # Check if code exists and hasn't expired
    return false if two_factor_code.nil? || two_factor_code_expires_at < Time.now

    # Increment attempts counter
    increment!(:two_factor_attempts)

    # After 5 attempts, invalidate code
    if two_factor_attempts >= 5
      clear_two_factor_code!
      return false
    end

    # Compare codes using secure comparison to prevent timing attacks
    ActiveSupport::SecurityUtils.secure_compare(two_factor_code.to_s, code.to_s)
  end

  def clear_two_factor_code!
    update(
      two_factor_code: nil,
      two_factor_code_expires_at: nil,
      two_factor_attempts: 0
    )
  end

  def send_two_factor_code
    code = generate_two_factor_code!

    if preferred_2fa_method == 'sms' && phone_verified?
      send_code_via_sms(code)
    else
      send_code_via_email(code)
    end
  end

  # Add this method for OAuth functionality with security validations
  def self.from_omniauth(auth)
    # Security validations
    return nil unless auth&.info&.email&.present?
    return nil unless auth.info.email.match?(URI::MailTo::EMAIL_REGEXP)

    # Optional: Restrict to specific email domains in production
    if Rails.env.production?
      allowed_domains = ['gmail.com', 'yahoo.com', 'outlook.com'] # Add your allowed domains
      email_domain = auth.info.email.split('@').last.downcase
      return nil unless allowed_domains.include?(email_domain)
    end

    # Log OAuth attempt for monitoring
    Rails.logger.info "OAuth login attempt for email: #{auth.info.email}"

    # First, try to find existing OAuth user
    author = where(provider: auth.provider, uid: auth.uid).first

    if author
      # Existing OAuth user - just return them
      Rails.logger.info "Existing OAuth user found: #{author.email}"
      return author
    end

    # Check if author with this email already exists (regular signup)
    existing_author = find_by(email: auth.info.email)
    
    if existing_author
      # Link OAuth to existing author account
      Rails.logger.info "Linking OAuth to existing author: #{existing_author.email}"
      existing_author.update!(
        provider: auth.provider,
        uid: auth.uid,
        confirmed_at: Time.current  # Ensure they're confirmed
      )
      
      # Update profile info if missing
      existing_author.update!(
        first_name: auth.info.first_name || auth.info.name&.split&.first
      ) if existing_author.first_name.blank?
      
      existing_author.update!(
        last_name: auth.info.last_name || auth.info.name&.split&.last
      ) if existing_author.last_name.blank?

      # Attach profile image if available and not already set
      if auth.info.image && !existing_author.author_profile_image.attached?
        attach_profile_image(existing_author, auth.info.image)
      end

      return existing_author
    end

    # Create new OAuth user
    Rails.logger.info "Creating new OAuth user: #{auth.info.email}"
    create!(
      provider: auth.provider,
      uid: auth.uid,
      email: auth.info.email,
      password: Devise.friendly_token[0, 20],
      first_name: auth.info.first_name || auth.info.name&.split&.first,
      last_name: auth.info.last_name || auth.info.name&.split&.last,
      confirmed_at: Time.current
    ).tap do |new_author|
      new_author.skip_confirmation!
      # Attach profile image if available
      attach_profile_image(new_author, auth.info.image) if auth.info.image
    end

  rescue StandardError => e
    Rails.logger.error "OAuth error: #{e.message}"
    Rails.logger.error "Auth info: provider=#{auth.provider}, uid=#{auth.uid}, email=#{auth.info.email}"
    nil
  end

  def self.attach_profile_image(author, image_url)
    temp_file = Down.download(
      image_url,
      max_size: 5 * 1024 * 1024, # 5MB limit
      max_redirects: 2
    )
    author.author_profile_image.attach(
      io: temp_file,
      filename: "profile_#{SecureRandom.hex(8)}.jpg",
      content_type: temp_file.content_type
    )
  rescue Down::Error => e
    Rails.logger.error "Profile image download failed: #{e.message}"
  ensure
    temp_file&.close if temp_file.respond_to?(:close)
  end

  # Override password required for OAuth users
  def password_required?
    # Don't require password for OAuth users during updates unless they're setting one
    return false if provider.present? && encrypted_password.blank? && password.blank?

    super
  end

  def total_earnings
    author_revenues.sum(:amount)
  end

  def pending_earnings
    author_revenues.pending.sum(:amount)
  end

  def approved_earnings
    author_revenues.approved.sum(:amount)
  end

  def monthly_earnings(year = Date.current.year)
    result = {}

    raw_data = author_revenues
      .where('extract(year from created_at) = ?', year)
      .group('extract(month from created_at)')
      .sum(:amount)

    raw_data.each do |month_num, amount|
      month_name = Date::MONTHNAMES[month_num.to_i]
      result[month_name] = amount
    end

    result
  end

  def book_earnings
    author_revenues
      .joins(purchase: :book)
      .group('books.id, books.title')
      .sum(:amount)
  end

  def next_payment_date
    # Calculate next payment date (end of current month + 30 days)
    (Date.today.end_of_month + 30.days).strftime('%B %d, %Y')
  end

  private

  def send_code_via_email(code)
    AuthorMailer.verification_code(self, code).deliver_now
  end

  def send_code_via_sms(code)
    client = Twilio::REST::Client.new(ENV.fetch('TWILIO_ACCOUNT_SID', nil), ENV.fetch('TWILIO_AUTH_TOKEN', nil))
    client.messages.create(
      from: ENV.fetch('TWILIO_PHONE_NUMBER', nil),
      to: phone_number,
      body: "Your verification code is: #{code}"
    )
  rescue StandardError => e
    Rails.logger.error "SMS sending failed: #{e.message}"
    # Fallback to email
    send_code_via_email(code)
  end
end
