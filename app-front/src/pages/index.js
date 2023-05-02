// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardTwitter from 'src/views/cards/CardTwitter'
import Typography from '@mui/material/Typography'
import { useAccount, useContract, useSigner } from 'wagmi'
import WalletNotConnected from 'src/views/WalletConnected'
import { contractAddress, abi } from 'src/constant'

const Dashboard = () => {
  const { address, isConnected } = useAccount()

  const renderPageOnConnection = () => {
    if (isConnected) {
      return (
        <>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{ pb: 4, pt: theme => `${theme.spacing(17.5)} !important` }}>
              <Typography variant='h5'>Todo List </Typography>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <CardTwitter pageName='home' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardTwitter pageName='home' />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CardTwitter pageName='home' />
            </Grid>
          </Grid>
        </>
      )
    } else {
      return <WalletNotConnected isConnected={isConnected} />
    }
  }

  return <ApexChartWrapper>{renderPageOnConnection()}</ApexChartWrapper>
}

export default Dashboard
