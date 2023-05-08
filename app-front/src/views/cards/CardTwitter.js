import { useState } from 'react';
// ** MUI Imports
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart';
import Twitter from 'mdi-material-ui/Twitter';
import ShareVariant from 'mdi-material-ui/ShareVariant';
import Button from '@mui/material/Button';
import { Timer, TimerSandEmpty, TimerSandPaused, TimerOff } from 'mdi-material-ui';

import Modal from '@mui/material/Modal';
import { useAccount, useSigner, useContract, useProvider } from 'wagmi';
import { abi, contractAddress } from 'src/constant';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const CardTwitter = (props) => {
 
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = (id) => {
    setSelectedTodoId(id);
  };

  const handleClose = () => {
    setSelectedTodoId(null);
    // setOpen(false);
  };
  // console.log(props)
  const pageName = () => {
    if (props.pageName == 'cancelled') {
      return '#ff7663';
    }
    if (props.pageName == 'ongoing') {
      return 'info.main';
    }
    if (props.pageName == 'completed') {
      return 'green';
    }
    if (props.pageName == 'pending') {
      return 'orange';
    }

    if (props.pageName == 'home') {
      return 'yellow';
    }
  };

  const getTodoPriority = (priority) => {
    let todo_priority = parseInt(priority.toString());
    if (todo_priority === 1) return 'Very High';
    if (todo_priority === 2) return 'High';
    if (todo_priority === 3) return 'Medium';
    if (todo_priority === 3) return 'Low';
    // uint256 status // 1=ongoing, 2=completed, 3=pending, 4=cancelled
  };

  const getTodoStatus = (status) => {
    let todo_status = parseInt(status.toString());
    if (todo_status === 1) return 'Ongoing';
    if (todo_status === 2) return 'Completed';
    if (todo_status === 3) return 'Pending';
    if (todo_status === 4) return 'Cancelled';
  };

  const { address, isConnected } = useAccount();
  const { data: signer } = useSigner();
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


  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const errors = {};

    if (!formData.status) {
      errors.status = 'Todo status is required';
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);

      return;
    }
    //return the actual value of the ID by subtracting it by 1
    //this was done to make sure the modal does not have open as 0 which will cause it not to open
    let key = {
      todoId: selectedTodoId - 1
    };
    if(key.todoId === undefined){
      alert('Form not submitted. Try again')
    }
   
     //make rpc call
     try{
      setIsLoading(true)
      contract.updateTodoStatus(
        key.todoId,
        formData.status
      )
      .then((response) => {
        setIsLoading(false)
        alert('Todo status successfully changed')
        setFormData({})
        setSelectedTodoId(null)
      })
      .catch((error) => {
        console.error(error);
      })
    }catch(err){
      console.error(err)
    }
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: pageName() }}>
      <CardContent sx={{ padding: (theme) => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 3, alignItems: 'center', color: 'common.white' }}
        >
          {props.title}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4, color: 'common.white' }}>
          <span sx={{ marginRight: 2.5 }}>Description: </span>
          {props.description}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4, color: 'common.white' }}>
          <span
            sx={{ marginRight: 2.5 }}
            style={{ backgroundColor: 'red', borderRadius: '5px', padding: '2px' }}
          >
            <b>Priority </b>
          </span>
          &nbsp; {getTodoPriority(props?.priority ?? 1)}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span
            sx={{ marginRight: 2.5 }}
            style={{ backgroundColor: 'red', borderRadius: '5px', padding: '2px' }}
          >
            <b>Status </b>
          </span>
          &nbsp; {getTodoStatus(props?.status ?? 1)}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4, color: 'common.white' }}>
          <span
            sx={{ marginRight: 2.5 }}
            style={{ backgroundColor: 'red', borderRadius: '5px', padding: '2px' }}
          >
            <b>Time</b>
          </span>
          &nbsp;{props.todoTime} &nbsp;&nbsp;
        </Typography>

        <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}></Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button onClick={() => handleOpen(props.id)}>Update Status</Button>

          <Modal
            open={Boolean(selectedTodoId)}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <form onSubmit={handleFormSubmit}>
                <>
                  <Grid item xs={12} sm={12} sx={{ marginBottom: 5 }}>
                    <FormControl fullWidth>
                      <InputLabel>Choose Status</InputLabel>
                      <Select
                        label='Choose Status'
                        defaultValue='1'
                        name='status'
                        onChange={handleChange}
                        value={formData.status || ''}
                        error={!!errors.status}
                        helperText={errors.status}
                      >
                        <MenuItem value='1'>Ongoing</MenuItem>
                        <MenuItem value='2'>Completed</MenuItem>
                        <MenuItem value='3'>Pending</MenuItem>
                        <MenuItem value='4'>Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                 

                  <Grid item xs={12}>
                    <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
                      Update Status
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={handleClose}>
                      Cancel
                    </Button>
                  </Grid>
                </>
              </form>
            </Box>
          </Modal>
          {/* <Button type='submit' variant='contained' style={{ font: '5px', width: 80, backgroundColor: 'yellow'}}>Ongoing</Button>
          <Button type='submit' variant='contained' style={{ font: '5px', width: 100, backgroundColor: 'blue'}}>Completed</Button>
          <Button type='submit' variant='contained' style={{ font: '5px', width: 80, backgroundColor: 'orange'}}>Pending</Button>
          <Button type='submit' variant='contained' style={{ font: '5px', width: 70, backgroundColor: 'red'}}>Cancel</Button> */}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CardTwitter;
