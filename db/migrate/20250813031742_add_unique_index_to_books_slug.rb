class AddUniqueIndexToBooksSlug < ActiveRecord::Migration[7.1]
  def change
     remove_index :books, :slug if index_exists?(:books, :slug)
     add_index :books, :slug, unique: true, where: "slug IS NOT NULL"
  end
end
