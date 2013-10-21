class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.string :path
      t.string :title
      t.boolean :published
      t.string :content

      t.timestamps
    end
  end
end
