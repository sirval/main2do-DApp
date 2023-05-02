// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { useState, useEffect } from 'react'
import CardOngoing from 'src/views/cards/TodoCard'
import WalletNotConnected from 'src/views/WalletConnected'
import {useAccount, useSigner, useContract, useProvider } from 'wagmi'
import { abi, contractAddress } from 'src/constant'
import { BigNumber } from 'bignumber.js'

const OngoingCard = () => {
  const { address, isConnected } = useAccount()
  const { data: signer} = useSigner()
  const [ongoingTodos, setOngoingTodos] = useState([])
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

  const getAllOngoingTodo = async () => {
    try {
      setIsLoading(true)
      const _ongoingTodos = await contract.getTodosByStatus(1)
      setOngoingTodos(_ongoingTodos)

      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if(!signer) return
    if(ongoingTodos.lenght !== [] && ongoingTodos.lenght !== 0) {
      getAllOngoingTodo()
    }
  }, [signer, ongoingTodos])


  if (isConnected) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Ongoing 2Do' titleTypographyProps={{ variant: 'h6' }} />
            {isLoading? 
            <CardOngoing pageName='ongoing' todos={ongoingTodos} /> : 
            <h3>Loading...</h3>
            }
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return <WalletNotConnected isConnected={isConnected} />
  }
}

export default OngoingCard
