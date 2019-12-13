defmodule UCast.Casting.Request do
  use Ecto.Schema
  import Ecto.Changeset

  schema "requests" do
    field :influencer_id, :string
    field :instructions, :string
    field :message_from, :string
    field :message_to, :string
    field :requester, :string
    field :requester_email, :string
    field :requester_id, :string
    field :requester_phonenumber, :string

    timestamps()
  end

  @doc false
  def changeset(request, attrs) do
    request
    |> cast(attrs, [:requester, :requester_phonenumber, :requester_email, :message_from, :message_to, :instructions, :requester_id, :influencer_id])
    |> validate_required([:requester, :requester_phonenumber, :requester_email, :message_from, :message_to, :instructions, :requester_id, :influencer_id])
  end
end
