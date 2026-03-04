class ChangeMonetaryColumnsScaleTo3 < ActiveRecord::Migration[7.0]
  def up
    # author_revenues.amount: scale 2 -> 3
    change_column :author_revenues, :amount, :decimal, precision: 10, scale: 3, null: false

    # purchases monetary columns: scale 2 -> 3
    change_column :purchases, :paystack_fee, :decimal, precision: 10, scale: 3
    change_column :purchases, :delivery_fee, :decimal, precision: 10, scale: 3
    change_column :purchases, :admin_revenue, :decimal, precision: 10, scale: 3
    change_column :purchases, :author_revenue_amount, :decimal, precision: 10, scale: 3
  end

  def down
    change_column :author_revenues, :amount, :decimal, precision: 10, scale: 2, null: false

    change_column :purchases, :paystack_fee, :decimal, precision: 10, scale: 2
    change_column :purchases, :delivery_fee, :decimal, precision: 10, scale: 2
    change_column :purchases, :admin_revenue, :decimal, precision: 10, scale: 2
    change_column :purchases, :author_revenue_amount, :decimal, precision: 10, scale: 2
  end
end
