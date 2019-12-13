defmodule UCast.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  schema "users" do
    field :email, :string
    field :password, Comeonin.Ecto.Password 
    field :username, :string
    field :name, :string
    field :avatar_url, :string
    field :intro, :string
    field :user_type, :string, default: "customer"

    has_one :influencer_profile, UCast.Accounts.InfluencerProfile, on_delete: :delete_all
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    required_fields = [:email, :password, :username, :name] 
    user
    |> cast(attrs, required_fields ++ [:user_type]) 
    |> unique_constraint(:username, name: :users_email_username_index)
    |> validate_required(required_fields)
    |> validate_length(:username, min: 3)
    |> validate_length(:password, min: 6)
  end
end
