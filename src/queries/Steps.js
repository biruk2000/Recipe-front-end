import { gql } from "@apollo/client/core";

export const INSERT_STEPS = gql`
  mutation ($step: String!, $recipe_id: Int!) {
    insert_Steps_one(object: { step: $step, recipe_id: $recipe_id }) {
      id
      step
      recipe_id
    }
  }
`;

export const UPDATE_STEPS = gql`
  mutation ($id: Int!, $step: String!) {
    update_Steps_by_pk(pk_columns: { id: $id }, _set: { step: $step }) {
      id
    }
  }
`;

export const DELETE_STEP = gql`
  mutation ($id: Int!) {
    delete_Steps_by_pk(id: $id) {
      id
    }
  }
`;
