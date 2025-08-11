class AddPartialUniqueIndexOnBooksSlug < ActiveRecord::Migration[7.1]
  def change
      add_index :books, :slug, unique: true, where: "slug IS NOT NULL"
  end
end
