defmodule UCastWeb.Schema.Mutation.SigninTest do
  use UCastWeb.ConnCase, async: true

  @query """
  mutation ($username: String!, $password: String!){
    signin(username: $username, password: $password) {
      user {
        username
      }
      token
    }
  }
  """
  test "signing in" do
    user_attrs = %{
      username: "taehwan",
      password: "secret",
      name: "taehwankim",
      email: "taehwan@example.com"
    }
    assert {:ok, user} = UCast.Accounts.create_user(user_attrs)

    variables = %{
      username: user_attrs[:username],
      password: user_attrs[:password]
    }
    conn = post(build_conn(), "/api", %{
      query: @query,
      variables: variables
    })
    assert %{
      "data" => %{
        "signin" => session
      }} = json_response(conn, 200) 
    

    assert %{
      "user" => user_data,
      "token" => token
    } = session 

    assert user_data == %{"username" => user.username}
    assert {:ok, %{id: user.id}} == UCastWeb.AuthToken.verify(token)
  end
end
