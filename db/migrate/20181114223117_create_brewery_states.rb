class CreateBreweryStates < ActiveRecord::Migration[5.2]
  def change
    create_table :brewery_states do |t|
      t.string :name, null: false
      t.string :slug, null: false

      t.timestamps
    end
  end
end
