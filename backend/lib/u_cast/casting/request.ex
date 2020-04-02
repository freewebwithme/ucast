defmodule UCast.Casting.Request do
  use Ecto.Schema
  import Ecto.Changeset

  schema "requests" do
    field(:influencer_id, :string)
    field(:instructions, :string)
    field(:message_from, :string)
    field(:message_to, :string)
    field(:requester_name, :string)
    field(:requester_email, :string)
    field(:requester_id, :string)
    field(:requester_phonenumber, :string)
    field(:occasion, :string)
    field(:recipient_photo, :string)
    field(:status, :string)

    timestamps()
  end

  @doc false
  def changeset(request, attrs) do
    request
    |> cast(attrs, [
      :requester_name,
      :requester_phonenumber,
      :requester_email,
      :message_from,
      :message_to,
      :instructions,
      :requester_id,
      :influencer_id,
      :occasion,
      :recipient_photo,
      :status
    ])
    |> validate_required([
      :requester_name,
      :requester_phonenumber,
      :requester_email,
      :message_from,
      :message_to,
      :instructions,
      :requester_id,
      :influencer_id,
      :status,
      :occasion
    ])
  end
end
