class AddAcceptedTermsToAuthors < ActiveRecord::Migration[7.1]
  def change
    add_column :authors, :accepted_terms, :boolean, default: false, null: false
  end
end
