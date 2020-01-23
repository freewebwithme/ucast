defmodule UCastWeb.AuthToken do
  @user_salt "ucast auth salt"

  @doc """
  Encodes the given `user` id and signs it, returning a token
  clients can use an identification when using the API.
  """
  def sign(user) do
    Phoenix.Token.sign(UCastWeb.Endpoint, @user_salt, %{id: user.id})
  end

  def verify(token) do
    Phoenix.Token.verify(UCastWeb.Endpoint, @user_salt, token, max_age: 365 * 24 * 3600)
  end
end
