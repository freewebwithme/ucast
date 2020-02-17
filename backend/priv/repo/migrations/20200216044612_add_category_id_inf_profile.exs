defmodule UCast.Repo.Migrations.AddCategoryIdInfProfile do
  use Ecto.Migration

  def change do
    alter table(:influencer_profiles) do
      add(:category_id, references(:categories), null: false)
    end
  end
end
