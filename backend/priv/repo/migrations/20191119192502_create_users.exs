defmodule UCast.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string
      add :password, :string
      add :username, :string
      add :name, :string
      add :avatar_url, :string
      add :intro, :text
      add :user_type, :string
      
      timestamps()
    end
    
    create unique_index(:users, [:email, :username])
  end
end
