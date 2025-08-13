class AddStateToAuthors < ActiveRecord::Migration[7.1]
  def change
    add_column :authors, :state, :string
  end
end
