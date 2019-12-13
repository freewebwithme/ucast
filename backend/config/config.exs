# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :u_cast,
  ecto_repos: [UCast.Repo]

# Configures the endpoint
config :u_cast, UCastWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Di/I1Yn/XZhgEgPPoMN67If3n51+eAwMKzzIi/PAZzWH/tQxm5g9UHC5XTJ+N+8G",
  render_errors: [view: UCastWeb.ErrorView, accepts: ~w(json)],
  pubsub: [name: UCast.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :ex_aws,
  access_key_id: [{:system, "AWS_ACCESS_KEY_ID"}, :instance_role],
  secret_access_key: [{:system, "AWS_SECRET_ACCESS_KEY"}, :instance_role],
  region: "us-west-2",
  debug_requests: true
  
config :ex_aws, :hackney_opts,
  follow_redirect: true,
  recv_timeout: 30_000

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
