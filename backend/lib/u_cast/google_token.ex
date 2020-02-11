defmodule UCast.GoogleToken do
  use Joken.Config

  add_hook(JokenJwks, strategy: UCast.MyStrategy)

  # @impl true
  def token_config do
    # validate from the token
    default_claims()
    |> add_claim("iss", nil, &(&1 == "https://accounts.google.com"))
    |> add_claim(
      "aud",
      nil,
      &(&1 == "837078523922-kk5vhkmhl089j7ngqdmoebgssq986c9g.apps.googleusercontent.com")
    )
  end
end
