// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'


// ** Third Party Imports
import DatePicker from 'react-datepicker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Todo Date/Time' fullWidth {...props} />
})

const NewTodo = ({signer, contract, provider}) => {
  // ** State
  const [selectedDate, setSelectedDate] = useState(null)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async evt => {
    evt.preventDefault()
    const errors = {}

    let dateObj =  new Date(selectedDate);
    let todoTime = dateObj.toLocaleString();
   

    setFormData({ ...formData, todoTime })
    if(formData.todoTime === undefined){
      alert('Form not submitted. Try again')
    }

    // validate input
    if (!formData.title) {
      errors.title = 'Title is required'
    }
    
    if (!formData.priority) {
      errors.priority = 'Todo priority is required'
    }
    if (!formData.status) {
      errors.status = 'Todo status is required'
    }
    
    if (!formData.description) {
      errors.description = 'Description is required'
    }
    
    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      
      return
    }
    //make rpc call
    try{
      setIsLoading(true)
      contract.newTodo(
        formData.title,
        formData.description,
        formData.todoTime,
        formData.priority, 
        formData.status 
      )
      .then((response) => {
        setIsLoading(false)
        alert('New todo successfully added')
        setFormData({})
        setSelectedDate(null)
      })
      .catch((error) => {
        console.error(error);
      })
    }catch(err){
      console.error(err)
    }
  }

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  return (
    <CardContent>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type='text'
              name='title'
              onChange={handleChange}
              value={formData.title || ''}
              label='Todo Title'
              placeholder='Exercise'
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={selectedDate}
                showYearDropdown
                showMonthDropdown
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={30}
                dateFormat='MMMM d, yyyy h:mm aa'
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => {
                  setSelectedDate(date)
                }}
                name='todoDateTime'
                
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Choose Priority</InputLabel>
              <Select
                label='Choose Priority'
                defaultValue='1'
                name='priority'
                onChange={handleChange}
                value={formData.priority || ''}
                error={!!errors.priority}
                helperText={errors.priority}
              >
                <MenuItem value='1'>Very High</MenuItem>
                <MenuItem value='2'>High</MenuItem>
                <MenuItem value='3'>Low</MenuItem>
                <MenuItem value='4'>Very Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
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

          <Grid item xs={12} sm={12} sx={{ marginTop: 1 }}>
            <TextField
              fullWidth
              multiline
              label='Todo Description'
              minRows={2}
              placeholder='State a brief description of this todo'
              // defaultValue=''
              name='description'
              onChange={handleChange}
              value={formData.description || ''}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setSelectedDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default NewTodo
