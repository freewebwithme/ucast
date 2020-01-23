# IEx.configure colors: [enabled: true]
# IEx.configure colors: [ eval_result: [ :cyan, :bright ] ]
IO.puts(
  IO.ANSI.red_background() <>
    IO.ANSI.white() <> " ❄❄❄ No Other Name, Only Jesus ❄❄❄ " <> IO.ANSI.reset()
)

Application.put_env(:elixir, :ansi_enabled, true)

IEx.configure(
  colors: [
    eval_result: [:green, :bright],
    eval_error: [[:red, :bright, "Bug Bug ..!!"]],
    eval_info: [:yellow, :bright]
  ],
  default_prompt:
    [
      # ANSI CHA, move cursor to column 1
      "\e[G",
      :white,
      "I",
      :red,
      # plain string
      "❤",
      :green,
      "%prefix",
      :white,
      "|",
      :blue,
      "%counter",
      :white,
      "|",
      :red,
      # plain string
      "▶",
      :white,
      # plain string
      "▶▶",
      # ❤ ❤-»" ,  # plain string
      :reset
    ]
    |> IO.ANSI.format()
    |> IO.chardata_to_string()
)

alias UCast.Accounts
alias UCast.Accounts.{User, InfluencerProfile}
alias UCast.Casting
alias UCast.Casting.{Request}
alias UCast.Repo
alias Ecto.Changeset
alias ExAws.{S3}
import Ecto.Query

token =
  "eyJhbGciOiJSUzI1NiIsImtpZCI6IjVlZGQ5NzgyZDgyMDQwM2VlODUxOGM0YWFiYjJiOWZlMzEwY2FjMTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2F
jY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4MzcwNzg1MjM5MjItYWppNHVycm52MnNrb2VpMTczYmNjNmNtZTYwN2U5NGwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQ
iOiI4MzcwNzg1MjM5MjItYWppNHVycm52MnNrb2VpMTczYmNjNmNtZTYwN2U5NGwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgzODk0ODUzMzYyMTQ1MjY0NTg
iLCJlbWFpbCI6InRleHR5bWFya2V0aW5nQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiNkFZSG5tSmRlVXdEYkdoRk1HMGs2USIsIm5hbWUiOiJUZXh
0eSBNYXJrZXRpbmciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDUuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy15em9kVGN1S0N4NC9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JkMHZ
WSWNkNVIyWV9WZHI4alBYbm1nUDA3Q1lnL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJUZXh0eSIsImZhbWlseV9uYW1lIjoiTWFya2V0aW5nIiwibG9jYWxlIjoiZW4iLCJ
pYXQiOjE1Nzk1MzA2MTAsImV4cCI6MTU3OTUzNDIxMH0.SXmU5UJ3OazEI2jy130HBbiUqmI_v4WZFe86kEaXo5BQIYrfhboD2AwJDA43IgzWB0DP8lvMDD54wvIdTE_8Efasr_3zXvy
kePAZbyz-z-wLwOjijshxABTTtltw0LciMcUkL3xNDhcXLwxvZhrwq04Hdocb5KCP8m8L7BcUJHw1gsintHPR6jek9In3CaL_-zf84vZbR1FbZQTADtKTumT0XTBH2Q_6JM79dirY19B
RDqvGJsjGA0c9OC6nKMU2_KO67pbGnfk0MV7-NZcKRWFl1Q3u38iJQFYmCKrDURatDR13AEFFlRwq7WgKtlZqj5XEGiN4jfdkh0EiDVajzQ"
