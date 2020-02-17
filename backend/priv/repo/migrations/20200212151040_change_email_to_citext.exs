defmodule UCast.Repo.Migrations.ChangeEmailToCitext do
  use Ecto.Migration

  def change do
    alter table(:users) do
      modify(:email, :citext, null: false)
    end
  end
end
