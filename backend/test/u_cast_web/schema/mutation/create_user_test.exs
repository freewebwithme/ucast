defmodule UCastWeb.Schema.Mutation.CreateUserTest do
  use UCastWeb.ConnCase, async: true

  @query """
  mutation signup($email: String!, $name: String!, $password: String!, $username: String!) {
    signup(email: $email, name: $name, password: $password, username: $username) {
      user {
        username
      }
    }
  }
  """
  test "sign up is working" do
    input = %{
      email: "user@example.com",
      name: "new user",
      password: "secret",
      username: "newUser"
    }
    conn = build_conn()
    conn = post(conn, "/api", %{query: @query, variables: input})
    assert json_response(conn, 200) == %{
      "data" => %{
        "signup" => %{
          "user" => %{
            "username" => "newUser"
           }
        }
      }
    }
  end
end
