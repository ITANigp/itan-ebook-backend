class AddBankNameToAuthorBankingDetails < ActiveRecord::Migration[7.1]
  def change
    add_column :author_banking_details, :bank_name, :string
  end
end
