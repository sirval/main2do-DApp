// ** MUI Imports
import Grid from '@mui/material/Grid'

import Typography from '@mui/material/Typography'
import { Web3Button } from '@web3modal/react'

const WalletConnected = ({ isConnected }) => {
  if (!isConnected) {
    return (
      <>
        <Grid container sx={{ mb: 8, alignItems: 'center', justifyContent: 'center' }}>
          <Grid
            item
            xs={12}
            sx={{
              pb: 4,
              pt: theme => `${theme.spacing(1.5)} !important`,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography style={{ textAlign: 'center' }} variant='h6'>
              Connect wallet to access this page{' '}
            </Typography>
          </Grid>

          <Web3Button />
        </Grid>
      </>
    )
  }
}

export default WalletConnected
