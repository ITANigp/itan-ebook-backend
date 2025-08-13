class AddTwoFactorToReaders < ActiveRecord::Migration[7.1]
  def change
    add_column :readers, :two_factor_enabled, :boolean
    add_column :readers, :preferred_2fa_method, :string
    add_column :readers, :phone_number, :string
    add_column :readers, :phone_verified, :boolean
    add_column :readers, :two_factor_code, :string
    add_column :readers, :two_factor_expires_at, :datetime
  end
end
