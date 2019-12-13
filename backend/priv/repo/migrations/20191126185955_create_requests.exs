defmodule UCast.Repo.Migrations.CreateRequests do
  use Ecto.Migration

  def change do
    create table(:requests) do
      add :requester, :string
      add :requester_phonenumber, :string
      add :requester_email, :string
      add :message_from, :string
      add :message_to, :string
      add :instructions, :string
      add :requester_id, :string
      add :influencer_id, :string

      timestamps()
    end

  end
end
