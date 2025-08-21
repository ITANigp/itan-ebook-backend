class AddReaderIdToNotifications < ActiveRecord::Migration[7.1]
  def change
    add_column :notifications, :reader_id, :uuid
  end
end
