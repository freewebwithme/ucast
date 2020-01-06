defmodule UCast.Repo.Migrations.CreateCategoryFieldInInfluencerProfile do
  use Ecto.Migration

  def change do
    alter table(:influencer_profiles) do
      add :category, :string
    end
  end
end
