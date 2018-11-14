class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :brewery_thread_id
      t.integer :user_id
      t.text :body

      t.timestamps
    end
  end
end
