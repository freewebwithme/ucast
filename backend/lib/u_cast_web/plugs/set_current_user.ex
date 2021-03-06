defmodule UCastWeb.Plugs.SetCurrentUser do
  @moduledoc """
  Adds an Absinthe execution context to the Phoenix connection.
  If a valid auth token is in the request header, the corresponding
  user is added to the context which is then available to all
  resolvers, Otherwise, the context is empty.

  This plug runs prior to `Absinthe.Plug`in the `:api` router
  so that the context is set up and `Absinthe.Plug` can extract
  the context from the connection.
  """

  @behaviour Plug

  import Plug.Conn

  def init(opts), do: opts

  def call(conn, _) do
    context = build_context(conn)
    result = get_req_header(conn, "authorization")
    IO.puts("Printing authorization header")
    IO.inspect(result)
    Absinthe.Plug.put_options(conn, context: context)
  end

  defp build_context(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization"),
         {:ok, %{id: id}} <- UCastWeb.AuthToken.verify(token),
         %{} = user <- UCast.Accounts.get_user(id) do
      IO.puts("User has bearer token in context")
      IO.inspect(token)

      %{current_user: user}
    else
      _ ->
        IO.puts("Can't find Bearer")
        %{}
    end
  end
end
