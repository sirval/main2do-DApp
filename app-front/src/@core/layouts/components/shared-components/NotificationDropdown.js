// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MuiMenu from '@mui/material/Menu'
import MuiAvatar from '@mui/material/Avatar'
import MuiMenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import {BellOutline, TimerSandComplete, TimerSandEmpty, TimerSandPaused, TimerOff } from 'mdi-material-ui'

// ** Third Party Components
import PerfectScrollbarComponent from 'react-perfect-scrollbar'

import { useAccount, useContract, useSigner, useProvider } from 'wagmi';
import WalletNotConnected from 'src/views/WalletConnected';
import { contractAddress, abi } from 'src/constant';
import blockies from 'blockies';


// ** Styled Menu component
const Menu = styled(MuiMenu)(({ theme }) => ({
  '& .MuiMenu-paper': {
    width: 380,
    overflow: 'hidden',
    marginTop: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '& .MuiMenu-list': {
    padding: 0
  }
}))

// ** Styled MenuItem component
const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}))

const styles = {
  maxHeight: 349,
  '& .MuiMenuItem-root:last-of-type': {
    border: 0
  }
}

// ** Styled PerfectScrollbar component
const PerfectScrollbar = styled(PerfectScrollbarComponent)({
  ...styles
})

// ** Styled Avatar component
const Avatar = styled(MuiAvatar)({
  width: '2.375rem',
  height: '2.375rem',
  fontSize: '1.125rem'
})

// ** Styled component for the title in MenuItems
const MenuItemTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  flex: '1 1 100%',
  overflow: 'hidden',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  marginBottom: theme.spacing(0.75)
}))

// ** Styled component for the subtitle in MenuItems
const MenuItemSubtitle = styled(Typography)({
  flex: '1 1 100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
})


const NotificationDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null)

  // ** Hook
  const hidden = useMediaQuery(theme => theme.breakpoints.down('lg'))

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleDropdownClose = () => {
    setAnchorEl(null)
  }

  //Smart Contract Interface

  const { data: signer } = useSigner();

  const provider = useProvider();

  const { address, isConnected } = useAccount();
  const [allTodos, setAllTodos] = useState([]);
  const [cancelledTodos, setCancelledTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [ongoingTodos, setOngoingTodos] = useState([]);
  const [pendingTodos, setPendingTodos] = useState([]);

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
      const _allTodos = await contract.getTodos();
      setAllTodos(_allTodos);
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

  const ScrollWrapper = ({ children }) => {
    if (hidden) {
      return <Box sx={{ ...styles, overflowY: 'auto', overflowX: 'hidden' }}>{children}</Box>
    } else {
      return (
        <PerfectScrollbar options={{ wheelPropagation: false, suppressScrollX: true }}>{children}</PerfectScrollbar>
      )
    }
  }
  
  return (
    <Fragment>
      <IconButton color='inherit' aria-haspopup='true' onClick={handleDropdownOpen} aria-controls='customized-menu'>
        <BellOutline />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleDropdownClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem disableRipple>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            <Typography sx={{ fontWeight: 600 }}>Notifications</Typography>
            <Chip
              size='small'
              label={`${allTodos.length} New`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
          </Box>
        </MenuItem>
        <ScrollWrapper>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <TimerSandEmpty sx={{ marginRight: 2.5 }} />  
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Ongoing Todo </MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Created By {address}</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              <Chip
              size='small'
              label={`${ongoingTodos.length}`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <TimerSandComplete sx={{ marginRight: 2.5 }} />  
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Completed Todo </MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Created By {address}</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              <Chip
              size='small'
              label={`${completedTodos.length}`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <TimerSandPaused sx={{ marginRight: 2.5 }} />  
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Pending Todo </MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Created By {address}</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              <Chip
              size='small'
              label={`${pendingTodos.length}`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
              </Typography>
            </Box>
          </MenuItem>
          <MenuItem onClick={handleDropdownClose}>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <TimerOff sx={{ marginRight: 2.5 }} />  
              <Box sx={{ mx: 4, flex: '1 1', display: 'flex', overflow: 'hidden', flexDirection: 'column' }}>
                <MenuItemTitle>Cancelled Todo </MenuItemTitle>
                <MenuItemSubtitle variant='body2'>Created By {address}</MenuItemSubtitle>
              </Box>
              <Typography variant='caption' sx={{ color: 'text.disabled' }}>
              <Chip
              size='small'
              label={`${cancelledTodos.length}`}
              color='primary'
              sx={{ height: 20, fontSize: '0.75rem', fontWeight: 500, borderRadius: '10px' }}
            />
              </Typography>
            </Box>
          </MenuItem>
          
          
        </ScrollWrapper>
        <MenuItem
          disableRipple
          sx={{ py: 3.5, borderBottom: 0, borderTop: theme => `1px solid ${theme.palette.divider}` }}
        >
          
        </MenuItem>
      </Menu>
    </Fragment>
  )
  
}

export default NotificationDropdown
