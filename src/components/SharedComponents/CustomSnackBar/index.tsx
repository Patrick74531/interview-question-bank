import Snackbar from '@mui/material/Snackbar'
import { Fragment } from 'react'
import { Alert } from '@mui/material'
import { useQuestions } from '../../../context/QuestionsContext'
import { SET_SNACKBAR_STATE } from '../../../context/QuestionsContext/anctions/ActionTypes'

const CustomSnackBar = ({ message }: { message: string }) => {
  const { snackBarState, dispatch } = useQuestions()
  const handleClose = () => {
    dispatch({
      type: SET_SNACKBAR_STATE,
      payload: {
        ...snackBarState,
        open: false,
      },
    })
  }

  const { vertical, horizontal, open } = snackBarState
  return (
    <Fragment>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity='info'>{message}</Alert>
      </Snackbar>
    </Fragment>
  )
}

export default CustomSnackBar
