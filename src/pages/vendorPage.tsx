import VendorContainer from '../containers/provider/input'
import { Typography } from '@mui/material'

const Vendorpage = () => {
  return (
    <div>
      <Typography variant='h4' display="flex" justifyContent="center">Vendor page</Typography>

     <VendorContainer/>
    </div>
  )
}

export default Vendorpage
