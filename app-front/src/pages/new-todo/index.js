// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'
import { styled } from '@mui/material/styles'
import MuiTab from '@mui/material/Tab'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'
import InformationOutline from 'mdi-material-ui/InformationOutline'

// ** Demo Tabs Imports
import TabInfo from 'src/views/todos/TabInfo'
import NewTodo from 'src/views/todos/NewTodo'

// ** Third Party Styles Imports
import 'react-datepicker/dist/react-datepicker.css'

import WalletNotConnected from 'src/views/WalletConnected'
import { useAccount, useSigner, useContract, useProvider } from 'wagmi'
import { abi, contractAddress } from 'src/constant'

const Tab = styled(MuiTab)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    minWidth: 100
  },
  [theme.breakpoints.down('sm')]: {
    minWidth: 67
  }
}))

const TabName = styled('span')(({ theme }) => ({
  lineHeight: 1.71,
  fontSize: '0.875rem',
  marginLeft: theme.spacing(2.4),
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}))

const AccountSettings = () => {
  // ** State
  const [value, setValue] = useState('new-todo')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const { address, isConnected } = useAccount()
  const { data: signer} = useSigner()
  const provider = useProvider()

  const getProviderOrSigner = (needSigner) => {
    if(needSigner){
      return signer
    }else{
      return provider
    }
  }
  // contract
  const contract = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: getProviderOrSigner(signer)
  })

  if (isConnected) {
    return (
      <Card>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            aria-label='account-settings tabs'
            sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
          >
            <Tab
              value='new-todo'
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountOutline />
                  <TabName>New Todo</TabName>
                </Box>
              }
            />
          </TabList>

          <TabPanel sx={{ p: 0 }} value='new-todo'>
            <NewTodo signer={signer} contract={contract} provider={provider}/>
          </TabPanel>
        </TabContext>
      </Card>
    )
  } else {
    return <WalletNotConnected isConnected={isConnected} />
  }
}

export default AccountSettings
