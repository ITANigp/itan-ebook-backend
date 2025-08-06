class AddKycStepToAuthors < ActiveRecord::Migration[7.1]
  def change
    add_column :authors, :kyc_step, :integer, default: 0, null: false
  end
end
