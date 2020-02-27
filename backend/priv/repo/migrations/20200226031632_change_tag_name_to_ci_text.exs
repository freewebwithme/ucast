defmodule UCast.Repo.Migrations.ChangeTagNameToCiText do
  use Ecto.Migration

  def change do
    alter table("tags") do
      modify(:name, :citext, null: false)
    end
  end
end
