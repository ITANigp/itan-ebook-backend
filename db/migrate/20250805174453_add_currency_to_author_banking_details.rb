class AddCurrencyToAuthorBankingDetails < ActiveRecord::Migration[7.1]
  def change
    add_column :author_banking_details, :currency, :string
  end
end
