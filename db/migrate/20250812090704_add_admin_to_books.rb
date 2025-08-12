class AddAdminToBooks < ActiveRecord::Migration[7.1]
  def change
    add_reference :books, :admin, null: true, foreign_key: true, type: :uuid
  end
end
