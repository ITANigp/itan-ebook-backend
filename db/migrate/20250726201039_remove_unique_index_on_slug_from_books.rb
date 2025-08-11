class RemoveUniqueIndexOnSlugFromBooks < ActiveRecord::Migration[7.1]
  def change
      remove_index :books, name: 'index_books_on_slug'
  end
end
