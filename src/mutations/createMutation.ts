/* eslint-disable @typescript-eslint/no-var-requires */
const graphql = require('babel-plugin-relay/macro')

export const TransactionCreate = graphql`
  mutation newTransactionModalMutation($input: TransactionCreateInput!) {
    TransactionCreate(input: $input) {
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
