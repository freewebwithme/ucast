use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :u_cast, UCastWeb.Endpoint,
  secret_key_base: "1hEvRCvSqaRJ28yyJv3nsV7plrOU8xSpc8U/t2Ee1HXDIdvQJo71DM724MQXt2th"

# Configure your database
config :u_cast, UCast.Repo,
  username: "postgres",
  password: "postgres",
  database: "u_cast_prod",
  pool_size: 15
