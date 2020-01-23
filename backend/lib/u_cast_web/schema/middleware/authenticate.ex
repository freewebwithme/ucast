defmodule UCastWeb.Schema.Middleware.Authenticate do
  @moduledoc """
  This is Absinthe.Middleware for query or mutation that needs for authentication.
  """
  @behaviour Absinthe.Middleware

  def call(resolution, _) do
    case resolution.context do
      %{current_user: _} ->
        resolution

      _ ->
        resolution
        |> Absinthe.Resolution.put_result({:error, "Please sign in first!"})
    end
  end
end
