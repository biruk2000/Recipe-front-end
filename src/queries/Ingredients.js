import { gql } from "@apollo/client/core";

export const INSERT_INGREDIENTS = gql`
  mutation ($name: String!, $unit: String!, $amount: Float!, $recepi_id: Int!) {
    insert_Ingredients_one(
      object: {
        name: $name
        unit: $unit
        amount: $amount
        recepi_id: $recepi_id
      }
    ) {
      id
      amount
      name
      recepi_id
      unit
    }
  }
`;

export const UPDATE_INGREDIENT = gql`
  mutation ($id: Int!, $amount: Float!, $name: String!, $unit: String!) {
    update_Ingredients_by_pk(
      pk_columns: { id: $id }
      _set: { amount: $amount, name: $name, unit: $unit }
    ) {
      id
    }
  }
`;

export const DELETE_INGREDIENT = gql`
  mutation ($id: Int!) {
    delete_Ingredients_by_pk(id: $id) {
      id
    }
  }
`;
