class AddPublicationDateToBooks < ActiveRecord::Migration[7.1]
  def change
    add_column :books, :publication_date, :date
  end
end
