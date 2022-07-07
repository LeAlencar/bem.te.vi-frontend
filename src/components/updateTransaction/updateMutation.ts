/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const updateTransactionMutation = graphql`
  mutation updateMutation($input: TransactionUpdateInput!) {
    TransactionUpdate(input: $input) {
      success
      error
      transaction {
        id
        name
        category
        price
      }
    }
  }
`
