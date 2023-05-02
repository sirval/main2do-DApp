import {useState, useEffect} from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'

import CardPending from 'src/views/cards/TodoCard'
import { useAccount, useSigner, useContract, useProvider } from 'wagmi'
import WalletNotConnected from 'src/views/WalletConnected'
import { abi, contractAddress } from 'src/constant'

const Pending = () => {
  const { address, isConnected } = useAccount()
  const { data: signer} = useSigner()
  const [pendingTodos, setPendingTodos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
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

  const getPendingTodos = async () => {
    try{
      setIsLoading(true)
      const _pendingTodos = await contract.getTodosByStatus(3)
      setPendingTodos(_pendingTodos)
      setIsLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if(!signer) return
   
    if(pendingTodos.lenght !== [] && pendingTodos.lenght !== 0) {
      getPendingTodos()
    }
  }, [signer, pendingTodos])

  if (isConnected) {
    return (
      <Grid container spacing={6}>
      
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Pending 2Do' titleTypographyProps={{ variant: 'h6' }} />
            <CardPending pageName='pending' todos={pendingTodos}/>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return <WalletNotConnected isConnected={isConnected} />
  }
}

export default Pending
