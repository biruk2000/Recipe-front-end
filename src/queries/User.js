import { gql } from "@apollo/client/core";

export const SIGNUP = gql`
  mutation ($email: String!, $password: String!, $username: String!) {
    Signup(
      credentials: { email: $email, password: $password, username: $username }
    ) {
      email
      id
      password
      token
      user_name
    }
  }
`;
