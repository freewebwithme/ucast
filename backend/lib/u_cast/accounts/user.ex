defmodule UCast.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias UCast.Accounts.User

  schema "users" do
    field :email, :string
    field :password, Comeonin.Ecto.Password
    field :name, :string
    field :avatar_url, :string
    field :intro, :string
    field :user_type, :string, default: "customer"
    field :provider_name, :string, default: nil
    field :provider_id, :string, default: nil

    has_one :influencer_profile, UCast.Accounts.InfluencerProfile, on_delete: :delete_all
    timestamps()
  end

  @doc false
  def changeset(%User{} = user, attrs) do
    required_fields = [:email, :password, :name]

    user
    |> cast(
      attrs,
      required_fields ++ [:user_type, :avatar_url, :intro, :provider_name, :provider_id]
    )
    |> unique_constraint(:email)
    |> validate_email_format()
    |> validate_required(required_fields)
    |> validate_length(:password, min: 6)
  end

  @doc false
  def oauth_changeset(%User{} = user, attrs) do
    required_fields = [:email, :provider_id]

    user
    |> cast(
      attrs,
      required_fields ++ [:name, :user_type, :avatar_url, :intro, :provider_name, :provider_id]
    )
    |> unique_constraint(:provider_id)
    |> unique_constraint(:email)
    |> validate_required(required_fields)
  end

  defp validate_email_format(changeset) do
    case EmailChecker.Check.Format.valid?(changeset.changes.email) do
      true ->
        changeset

      _ ->
        add_error(changeset, :email, "email is not valid")
    end
  end
end
