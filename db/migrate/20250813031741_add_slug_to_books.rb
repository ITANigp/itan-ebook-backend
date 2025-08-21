class AddSlugToBooks < ActiveRecord::Migration[7.1]
  def change
    unless column_exists?(:books, :slug)
      add_column :books, :slug, :string
    end
  end
end
