defmodule UCast.Repo do
  use Ecto.Repo,
    otp_app: :u_cast,
    adapter: Ecto.Adapters.Postgres
end
