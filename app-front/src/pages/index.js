// ** MUI Imports
import Grid from '@mui/material/Grid';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts';
import CardFacebook from 'src/views/cards/CardFacebook';
import Typography from '@mui/material/Typography';
import { useAccount, useContract, useSigner, useProvider } from 'wagmi';
import WalletNotConnected from 'src/views/WalletConnected';
import { contractAddress, abi } from 'src/constant';
import { TimerSandComplete, TimerSandEmpty, TimerSandPaused, TimerOff } from 'mdi-material-ui'

const Dashboard = () => {
  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
  const [allTodos, setAllTodos] = useState([]);
  const [cancelledTodos, setCancelledTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);
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

  const getAllTodos = async () => {
    try {
      setIsLoading(true);
      const _allTodos = await contract.getTodos();
      setAllTodos(_allTodos);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const getOngoingTodos = async () => {
    try {
      const _ongoingTodos = await contract.getTodosByStatus(1);
      setOngoingTodos(_ongoingTodos);
    } catch (err) {
      console.error(err);
    }
  };

  const getCompletedTodos = async () => {
    try {
      const _completedTodos = await contract.getTodosByStatus(2);
      setCompletedTodos(_completedTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const getCancelledTodos = async () => {
    try {
      const _cancelledTodos = await contract.getTodosByStatus(4);
      setCancelledTodos(_cancelledTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const getPendingTodos = async () => {
    try {
      const _pendingTodos = await contract.getTodosByStatus(3);
      setPendingTodos(_pendingTodos);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!signer) return;
    if (allTodos.lenght !== [] && allTodos.lenght !== 0) {
      getAllTodos();
      getCancelledTodos();
      getCompletedTodos();
      getOngoingTodos();
      getPendingTodos();
    }
  }, [signer, allTodos]);

  const cardDetail = (todoStatus) => {
    if (todoStatus === 4) {
      return {
        color: '#ff7663',
        name: 'Cancel Todo',
        icon: 'TimerOff',
        total: cancelledTodos.length
      };
    }
    if (todoStatus === 1) {
      return {
        color: 'info.main',
        name: 'Ongoing Todo',
        icon: 'TimerSandEmpty',
        total: ongoingTodos.length
      };
    }
    if (todoStatus === 2) {
      return {
        color: 'green',
        name: 'Completed Todo',
        icon: 'TimerSandComplete',
        total: completedTodos.length
      };
    }
    if (todoStatus === 3) {
      return {
        color: 'orange',
        name: 'Pending Todo',
        icon: 'TimerSandPaused'
      };
    }
  };


  const myTodos = () => {
    if(allTodos.lenght !== [] && allTodos.lenght !== 0){
      return (
        <>
          <Link style={{cursor: 'pointer !important'}} href='status/ongoing'>
            <Grid item xs={12} sm={6} md={4}>
              <CardFacebook pageName='home' cardDetail={{color: 'info.main', name: 'Ongoing Todos', icon: 'TimerSandEmpty', total: ongoingTodos.length}} />
            </Grid>
          </Link>
          <Link style={{cursor: 'pointer !important'}} href='status/completed'>
            <Grid item xs={12} sm={6} md={4}>
              <CardFacebook pageName='home' cardDetail={{color: 'green', name: 'Completed Todos',  icon: 'TimerSandComplete', total: completedTodos.length}} />
            </Grid>
          </Link>
          <Link style={{cursor: 'pointer !important'}} href='status/cancelled'>
            <Grid item xs={12} sm={6} md={4}>
              <CardFacebook pageName='home' cardDetail={{color: '#ff7663', name: 'Cancelled Todos',  icon: 'TimerOff', total: cancelledTodos.length}} />
            </Grid>
          </Link>
          <Link style={{cursor: 'pointer !important'}} href='status/pending'>
            <Grid item xs={12} sm={6} md={4}>
              <CardFacebook pageName='home' cardDetail={{color: 'orange', name: 'Pending Todos',  icon: 'TimerSandPaused', total: pendingTodos.length}} />
            </Grid>
          </Link>

        </>
      )
    }else {
      return (
        <h4>You don't have any todo yet</h4>
      )
    }
      
  }

  const renderPageOnConnection = () => {
    if (isConnected) {
      return (
        <>
          <Grid container spacing={6}>
            <Grid item xs={12} sx={{ pb: 4, pt: (theme) => `${theme.spacing(17.5)} !important` }}>
              <Typography variant='h5'>Todo List </Typography>
            </Grid>
              {myTodos()}
          </Grid>
        </>
      );
    } else {
      return <WalletNotConnected isConnected={isConnected} />;
    }
  };

  return <ApexChartWrapper>{renderPageOnConnection()}</ApexChartWrapper>;
};

export default Dashboard;
