defmodule UCast.Repo.Migrations.AddUniqIndexForProviderId do
  use Ecto.Migration

  def change do
    create unique_index(:users, [:provider_id])
  end
end
