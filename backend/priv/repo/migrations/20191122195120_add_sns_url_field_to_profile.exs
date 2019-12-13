defmodule UCast.Repo.Migrations.AddSnsUrlFieldToProfile do
  use Ecto.Migration

  def change do
    alter table(:influencer_profiles) do
      add :sns_url, :string
    end
  end
end
