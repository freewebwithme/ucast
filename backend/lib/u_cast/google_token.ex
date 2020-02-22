defmodule UCast.GoogleToken do
  use Joken.Config

  add_hook(JokenJwks, strategy: UCast.MyStrategy)

  def token_config do
    auds = [
      "837078523922-kk5vhkmhl089j7ngqdmoebgssq986c9g.apps.googleusercontent.com",
      "837078523922-g5dvh1cudg53ndi3ld65t0dm1j7tbnk7.apps.googleusercontent.com"
    ]

    # validate from the token
    default_claims()
    |> add_claim("iss", nil, &(&1 == "https://accounts.google.com"))
    |> add_claim(
      "aud",
      nil,
      &Enum.member?(auds, &1)
    )
  end
end
