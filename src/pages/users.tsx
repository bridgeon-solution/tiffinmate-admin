import UserContainer from '../containers/users/input'
import { Typography } from '@mui/material'

const Users = () => {
  return (
    <div>
            <Typography variant='h4' display="flex" justifyContent="center">Users page</Typography>

      <UserContainer/>
    </div>
  )
}

export default Users
