use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :u_cast, UCastWeb.Endpoint,
  http: [port: 4002],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :u_cast, UCast.Repo,
  username: "postgres",
  password: "postgres",
  database: "u_cast_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
