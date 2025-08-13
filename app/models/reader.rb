class Reader < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable,
         :recoverable, :validatable, :confirmable, :rememberable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  before_create :set_jti
  after_create :set_trial_period
  after_commit :send_welcome_email, on: :update, if: :just_confirmed?

  # Associations
  has_many :purchases, dependent: :destroy
  has_many :purchased_books, -> { where(purchases: { purchase_status: 'completed' }) }, through: :purchases, source: :book
  has_many :accessible_chapters, through: :purchased_books, source: :chapters
  has_many :reading_statuses, dependent: :destroy
  has_many :notifications, dependent: :destroy
  has_many :reviews, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :liked_books, through: :likes, source: :book

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :first_name, :last_name, presence: true

  # === 2FA Attributes ===
  # two_factor_enabled:boolean
  # preferred_2fa_method:string
  # phone_number:string
  # phone_verified:boolean
  # two_factor_code:string
  # two_factor_expires_at:datetime

  # === 2FA Helpers ===
  def generate_two_factor_code!
    code = rand(100_000..999_999).to_s
    update(two_factor_code: code, two_factor_expires_at: 10.minutes.from_now)
    code
  end

  def valid_two_factor_code?(code)
    two_factor_code == code && two_factor_expires_at&.future?
  end

  def clear_two_factor_code!
    update(two_factor_code: nil, two_factor_expires_at: nil)
  end

  def two_factor_enabled?
    two_factor_enabled
  end

  def preferred_2fa_method
    self[:preferred_2fa_method] || 'email'
  end

  def phone_verified?
    phone_verified
  end

  # === Access/Ownership helpers ===
  def owns_book?(book)
    purchased_books.include?(book)
  end

  def trial_active?
    trial_start.present? && trial_end.present? && Time.current < trial_end
  end

  def can_access_chapter?(chapter)
    owns_book?(chapter.book)
  end

  private

  def just_confirmed?
    confirmed_at_previously_changed? && confirmed_at.present?
  end

  def send_welcome_email
    ReaderMailer.welcome_email(self).deliver_later
  end

  def set_jti
    self.jti ||= SecureRandom.uuid
  end

  def set_trial_period
    days = ENV.fetch('TRIAL_PERIOD_DAYS', 14).to_i
    update(trial_start: Time.current, trial_end: days.days.from_now)
  end
end
