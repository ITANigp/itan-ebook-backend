class Admin < ApplicationRecord
  self.primary_key = :id

  # Include default devise modules
  devise :database_authenticatable, :recoverable,
         :rememberable, :validatable

  # associations
  has_many :notifications, as: :user

  # Send welcome email after admin is created
  # after_create :send_welcome_email

  private

  def send_welcome_email
    AdminMailer.welcome_email(self).deliver_now
  end
end
