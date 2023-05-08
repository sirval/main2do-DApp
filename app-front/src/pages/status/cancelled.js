import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardCancelled from 'src/views/cards/TodoCard';
import { TimerOff } from 'mdi-material-ui';

import { useAccount, useSigner, useContract, useProvider } from 'wagmi';
import WalletNotConnected from 'src/views/WalletConnected';
import { abi, contractAddress } from 'src/constant';

const Cancelled = () => {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [cancelledTodos, setCancelledTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const provider = useProvider();

  const getProviderOrSigner = (needSigner) => {
    if (needSigner) {
      return signer;
    } else {
      return provider;
    }
  };

  const contract = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: getProviderOrSigner(signer),
  });

  const getCancelledTodos = async () => {
    try {
      setIsLoading(true);
      const _cancelledTodos = await contract.getTodosByStatus(4);
      setCancelledTodos(_cancelledTodos);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!signer) return;
    if (cancelledTodos.lenght !== [] && cancelledTodos.lenght !== 0) {
      getCancelledTodos();
    }
  }, [signer, cancelledTodos]);

  if (isConnected) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Cancelled 2Do' titleTypographyProps={{ variant: 'h6' }} />
            {isLoading ? (
              <CardCancelled pageName='cancelled' todos={cancelledTodos} />
            ) : (
              <h3>Loading...</h3>
            )}
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return <WalletNotConnected isConnected={isConnected} />;
  }
};

export default Cancelled;
