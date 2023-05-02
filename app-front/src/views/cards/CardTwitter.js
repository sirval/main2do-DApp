import {useState} from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import Twitter from 'mdi-material-ui/Twitter'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import Button from '@mui/material/Button'
import { Timer, TimerSandEmpty, TimerSandPaused, TimerOff } from 'mdi-material-ui'

import Modal from '@mui/material/Modal';

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
const CardTwitter = props => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // console.log(props)
  const pageName = () => {
    if (props.pageName == 'cancelled') {
      return '#ff7663'
    }
    if (props.pageName == 'ongoing') {
      return 'info.main'
    }
    if (props.pageName == 'completed') {
      return 'green'
    }
    if (props.pageName == 'pending') {
      return 'orange'
    }

    if (props.pageName == 'home') {
      return 'yellow'
    }
  }

  const getTodoPriority = (priority) => {
    let todo_priority = parseInt(priority.toString())
    if(todo_priority === 1)return 'Very High'
    if(todo_priority === 2)return 'High'
    if(todo_priority === 3)return 'Medium'
    if(todo_priority === 3)return 'Low'
      // uint256 status // 1=ongoing, 2=completed, 3=pending, 4=cancelled
    
  }

  const getTodoStatus = (status) => {
    let todo_status = parseInt(status.toString())
    if(todo_status === 1)return 'Ongoing'
    if(todo_status === 2)return 'Completed'
    if(todo_status === 3)return 'Pending'
    if(todo_status === 4)return 'Cancelled'
      // uint256 status // 1=ongoing, 2=completed, 3=pending, 4=cancelled
    
  }


  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const handleFormSubmit = evt => {
    evt.preventDefault()
    const errors = {}

  
    if (!formData.status) {
      errors.status = 'Todo status is required'
    }


    if (Object.keys(errors).length > 0) {
      setErrors(errors)

      return
    }
    console.log(formData)
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: pageName() }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 3, alignItems: 'center', color: 'common.white' }}
        >
          {props.title}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4, color: 'common.white' }}>
           <span sx={{ marginRight: 2.5 }} >Description: </span>
            {props.description}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4, color: 'common.white' }}>
            <span sx={{ marginRight: 2.5 }} style={{backgroundColor: 'red', borderRadius: '5px', padding: '2px'}}><b>Priority </b></span>&nbsp; {getTodoPriority(props?.priority)}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span sx={{ marginRight: 2.5 }} style={{backgroundColor: 'red', borderRadius: '5px', padding: '2px'}}><b>Status </b></span>&nbsp; {getTodoStatus(props?.status)}
        </Typography>
        <Typography variant='body2' sx={{ marginBottom: 4, color: 'common.white' }}>
            <span sx={{ marginRight: 2.5 }} style={{backgroundColor: 'red', borderRadius: '5px', padding: '2px'}}><b>Time</b></span>&nbsp;{props.todoTime} &nbsp;&nbsp;
        </Typography>


        <Typography variant='body2' sx={{ marginBottom: 3, color: 'common.white' }}>
            
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button onClick={handleOpen}>Update Status</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
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
  )
}

export default CardTwitter
