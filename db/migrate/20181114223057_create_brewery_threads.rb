class CreateBreweryThreads < ActiveRecord::Migration[5.2]
  def change
    create_table :brewery_threads do |t|
      t.integer :brewery_state_id
      t.integer :user_id
      t.string :brewery, null: false
      t.string :slug, null: false
      t.integer :posts_count, default: 0

      t.timestamps
    end
  end
end
