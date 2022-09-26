/* eslint-disable @typescript-eslint/no-var-requires */
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useState } from 'react'
import { UpdateTransactionModal } from '../updateTransaction'
import { useFragment, useMutation } from 'react-relay'
import { TransactionDelete } from '../../mutations/deleteMutation'
import { toast } from 'react-toastify'
import { Transaction_transaction$key } from './__generated__/Transaction_transaction.graphql'
const graphql = require('babel-plugin-relay/macro')

interface TransactionProps {
  transaction: Transaction_transaction$key
}

export function Transaction(props: TransactionProps) {
  const transaction = useFragment(
    graphql`
      fragment Transaction_transaction on Transaction {
        id
        name
        price
        category
      }
    `,
    props.transaction
  )

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [transactionDelete] = useMutation(TransactionDelete)

  function handleOpenUpdateModal() {
    setIsUpdateModalOpen(true)
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalOpen(false)
  }

  function handleDelete() {
    transactionDelete({
      variables: {
        input: {
          transactionId: transaction.id
        }
      },
      onCompleted(data) {
        console.log(data)
        toast.success('Transaction Deleted!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    })
  }

  return (
    <Card sx={{ minWidth: 175, marginBottom: 5 }}>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {transaction.name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Price: R$ {transaction.price}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Category: {transaction.category}
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Button
            color="success"
            variant="contained"
            onClick={handleOpenUpdateModal}
          >
            Edit
          </Button>
          <Button color="warning" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
        <UpdateTransactionModal
          isOpen={isUpdateModalOpen}
          onRequestClose={handleCloseUpdateModal}
          node={transaction}
        />
      </CardContent>
    </Card>
  )
}
