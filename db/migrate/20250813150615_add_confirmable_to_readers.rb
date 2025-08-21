class AddConfirmableToReaders < ActiveRecord::Migration[7.1]
  def change
    add_column :readers, :confirmation_token, :string
    add_column :readers, :confirmed_at, :datetime
    add_column :readers, :confirmation_sent_at, :datetime
    add_column :readers, :unconfirmed_email, :string # only if using reconfirmable

    # Add an index on confirmation_token for lookup
    add_index :readers, :confirmation_token, unique: true
  end
end
