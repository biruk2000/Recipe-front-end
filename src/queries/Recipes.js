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
      Rating {
        ratingValue
        totalValue
        totalUser
      }
      User {
        id
        user_name
        path
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
      Rating {
        ratingValue
        totalValue
        totalUser
      }
      User {
        id
        user_name
        path
      }
      RecipeImages {
        id
        path
      }
    }
  }
`;

export const FILTER_RECIPE = gql`
  query ($title: String!, $prepTime: String!, $ingName: String!) {
    Recipes(
      where: {
        _and: {
          title: { _eq: $title }
          prepTime: { _eq: $prepTime }
          Ingredients: { name: { _eq: $ingName } }
        }
      }
    ) {
      id
      title
      description
      noServant
      prepTime
      categories
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
      Rating {
        ratingValue
        totalValue
        totalUser
      }
      User {
        id
        user_name
      }
      RecipeImages {
        id
        path
      }
    }
  }
`;

export const GET_RECIPE = gql`
  query ($id: Int!) {
    Recipes_by_pk(id: $id) {
      id
      title
      description
      noServant
      prepTime
      categories
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
      RecipeImages {
        id
        path
      }
      Comments {
        id
        comment
        date
        User {
          id
          user_name
        }
      }
      Rating {
        ratingValue
        totalValue
        totalUser
      }
      User {
        id
        user_name
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
      noServant
      prepTime
      categories
      user_id
    }
  }
`;

// recipe search by title
export const SEARCH_RECIPES = gql`
  query ($searchTerm: String!) {
    Recipes(where: { _or: { categories: { _eq: $searchTerm } } }) {
      id
      title
      description
      RecipeImages(limit: 1) {
        path
      }
    }
  }
`;

export const UPDATE_RECIPE = gql`
  mutation (
    $recipeId: Int!
    $title: String!
    $description: String!
    $category: String!
    $noServant: Int!
    $prepTime: String!
  ) {
    update_Recipes_by_pk(
      pk_columns: { id: $recipeId }
      _set: {
        title: $title
        description: $description
        categories: $category
        noServant: $noServant
        prepTime: $prepTime
      }
    ) {
      id
    }
  }
`;

export const DELETE_RECIPE = gql`
  mutation ($recipeId: Int!) {
    delete_Ingredients(where: { recepi_id: { _eq: $recipeId } }) {
      returning {
        id
      }
      affected_rows
    }
    delete_Steps(where: { recipe_id: { _eq: $recipeId } }) {
      affected_rows
      returning {
        id
      }
    }
    delete_Ratings(where: { recipe_id: { _eq: $recipeId } }) {
      affected_rows
      returning {
        id
      }
    }
    delete_Comments(where: { recipe_id: { _eq: $recipeId } }) {
      affected_rows
      returning {
        id
      }
    }
    delete_Comments(where: { recipe_id: { _eq: $recipeId } }) {
      affected_rows
      returning {
        id
      }
    }
    delete_RecipeImages(where: { recipe_id: { _eq: $recipeId } }) {
      affected_rows
      returning {
        id
      }
    }
    delete_Recipes_by_pk(id: $recipeId) {
      id
    }
  }
`;
