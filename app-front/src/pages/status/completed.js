import {useState, useEffect} from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { abi, contractAddress } from 'src/constant'
import CardCompleted from 'src/views/cards/TodoCard'
import { useAccount, useSigner, useProvider, useContract } from 'wagmi'
import WalletNotConnected from 'src/views/WalletConnected'

const Completed = () => {
  const { address, isConnected } = useAccount()

  const { data: signer} = useSigner()
  const [completedTodos, setCompletedTodos] = useState([])
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

  const getCompletedTodos = async () => {
    try{
      setIsLoading(true)
      const _completedTodos = await contract.getTodosByStatus(2)
      setCompletedTodos(_completedTodos)
      setIsLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    if(!signer) return
    if(completedTodos.lenght !== [] && completedTodos.lenght !== 0) {
      getCompletedTodos()
    }
  }, [signer, completedTodos])

  if (isConnected) {
    return (
      <Grid container spacing={6}>
        

        <Grid item xs={12}>
          <Card>
            <CardHeader title='Completed 2Do' titleTypographyProps={{ variant: 'h6' }} />
            {isLoading?
              <CardCompleted pageName='completed' todos={completedTodos}/> :
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

export default Completed
