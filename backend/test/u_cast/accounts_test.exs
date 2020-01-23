defmodule UCast.AccountsTest do
  use UCast.DataCase

  alias UCast.Accounts

  #  describe "users" do
  #    alias UCast.Accounts.User
  #
  #    @valid_attrs %{email: "some email", password: "some password", password_hash: "some password_hash"}
  #    @update_attrs %{email: "some updated email", password: "some updated password", password_hash: "some updated password_hash"}
  #    @invalid_attrs %{email: nil, password: nil, password_hash: nil}
  #
  #    def user_fixture(attrs \\ %{}) do
  #      {:ok, user} =
  #        attrs
  #        |> Enum.into(@valid_attrs)
  #        |> Accounts.create_user()
  #
  #      user
  #    end
  #
  #    test "list_users/0 returns all users" do
  #      user = user_fixture()
  #      assert Accounts.list_users() == [user]
  #    end
  #
  #    test "get_user!/1 returns the user with given id" do
  #      user = user_fixture()
  #      assert Accounts.get_user!(user.id) == user
  #    end
  #
  #    test "create_user/1 with valid data creates a user" do
  #      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
  #      assert user.email == "some email"
  #      assert user.password == "some password"
  #      assert user.password_hash == "some password_hash"
  #    end
  #
  #    test "create_user/1 with invalid data returns error changeset" do
  #      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
  #    end
  #
  #    test "update_user/2 with valid data updates the user" do
  #      user = user_fixture()
  #      assert {:ok, %User{} = user} = Accounts.update_user(user, @update_attrs)
  #      assert user.email == "some updated email"
  #      assert user.password == "some updated password"
  #      assert user.password_hash == "some updated password_hash"
  #    end
  #
  #    test "update_user/2 with invalid data returns error changeset" do
  #      user = user_fixture()
  #      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
  #      assert user == Accounts.get_user!(user.id)
  #    end
  #
  #    test "delete_user/1 deletes the user" do
  #      user = user_fixture()
  #      assert {:ok, %User{}} = Accounts.delete_user(user)
  #      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
  #    end
  #
  #    test "change_user/1 returns a user changeset" do
  #      user = user_fixture()
  #      assert %Ecto.Changeset{} = Accounts.change_user(user)
  #    end
  #  end

  describe "tags" do
    alias UCast.Accounts.Tag

    @valid_attrs %{name: "some name"}
    @update_attrs %{name: "some updated name"}
    @invalid_attrs %{name: nil}

    def tag_fixture(attrs \\ %{}) do
      {:ok, tag} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_tag()

      tag
    end

    test "list_tags/0 returns all tags" do
      tag = tag_fixture()
      assert Accounts.list_tags() == [tag]
    end

    test "get_tag!/1 returns the tag with given id" do
      tag = tag_fixture()
      assert Accounts.get_tag!(tag.id) == tag
    end

    test "create_tag/1 with valid data creates a tag" do
      assert {:ok, %Tag{} = tag} = Accounts.create_tag(@valid_attrs)
      assert tag.name == "some name"
    end

    test "create_tag/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_tag(@invalid_attrs)
    end

    test "update_tag/2 with valid data updates the tag" do
      tag = tag_fixture()
      assert {:ok, %Tag{} = tag} = Accounts.update_tag(tag, @update_attrs)
      assert tag.name == "some updated name"
    end

    test "update_tag/2 with invalid data returns error changeset" do
      tag = tag_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_tag(tag, @invalid_attrs)
      assert tag == Accounts.get_tag!(tag.id)
    end

    test "delete_tag/1 deletes the tag" do
      tag = tag_fixture()
      assert {:ok, %Tag{}} = Accounts.delete_tag(tag)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_tag!(tag.id) end
    end

    test "change_tag/1 returns a tag changeset" do
      tag = tag_fixture()
      assert %Ecto.Changeset{} = Accounts.change_tag(tag)
    end
  end
end
