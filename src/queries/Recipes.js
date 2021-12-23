import { gql } from "@apollo/client/core";

export const GET_RECIPES = gql`
  query getAllRecipes {
    Recipes {
      id
      title
      description
      noServant
      prepTime
      categories
      likes
      Steps {
        id
        step
      }
      Ingredients {
        id
        name
        amount
        unit
      }
      Comments {
        id
        comment
      }
      RecipeImages {
        id
        path
      }
    }
  }
`;

export const INFINITE_SCROLL_POST = gql`
  query InfiniteScrollRecipes($offset: Int, $limit: Int) {
    Recipes(offset: $offset, limit: $limit, order_by: { created_at: asc }) {
      id
      title
      description
      noServant
      prepTime
      categories
      likes
      Steps {
        id
        step
      }
      Ingredients {
        id
        name
        amount
        unit
      }
      Comments {
        id
        comment
      }
      RecipeImages {
        id
        path
      }
    }
  }
`;

export const INSERT_RECIPE = gql`
  mutation (
    $title: String!
    $description: String!
    $categories: String!
    $noServant: Int!
    $user_id: uuid!
    $prepTime: String!
  ) {
    insert_Recipes_one(
      object: {
        title: $title
        description: $description
        noServant: $noServant
        prepTime: $prepTime
        user_id: $user_id
        categories: $categories
      }
    ) {
      id
      title
      description
      likes
      noServant
      prepTime
      categories
      user_id
    }
  }
`;
