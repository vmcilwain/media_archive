class CreateMedia < ActiveRecord::Migration[8.0]
  def change
    create_table :media do |t|
      t.string :title
      t.text :description
      t.integer :kind, null: false, default: 0
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
