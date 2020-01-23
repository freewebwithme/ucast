defmodule UCastWeb.Router do
  use UCastWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug UCastWeb.Plugs.SetCurrentUser
  end

  scope "/" do
    pipe_through :api

    forward "/api", Absinthe.Plug, schema: UCastWeb.Schema.Schema

    forward "/graphiql", Absinthe.Plug.GraphiQL,
      schema: UCastWeb.Schema.Schema,
      socket: UCastWeb.UserSocket
  end
end
