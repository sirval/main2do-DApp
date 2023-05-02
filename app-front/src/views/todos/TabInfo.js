// ** React Imports
import { forwardRef, useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import TimePicker from 'react-time-picker'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef((props, ref) => {
  return <TextField inputRef={ref} label='Todo Date/Time' fullWidth {...props} />
})

const TabInfo = () => {
  // ** State
  const [date, setDate] = useState(null)
  const [time, setTime] = useState(null)

  return (
    <CardContent>
      <form>
        <Grid container spacing={7}>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth type='text' label='Todo Title' placeholder='Exercise' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePickerWrapper>
              <DatePicker
                selected={date}
                showYearDropdown
                showMonthDropdown
                showTimeSelect
                timeFormat='HH:mm'
                timeIntervals={30}
                dateFormat='MMMM d, yyyy h:mm aa'
                id='account-settings-date'
                placeholderText='MM-DD-YYYY'
                customInput={<CustomInput />}
                onChange={date => setDate(date)}
              />
            </DatePickerWrapper>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Choose Priority</InputLabel>
              <Select label='Choose Priority' defaultValue='Very High'>
                <MenuItem value='Very High'>Very High</MenuItem>
                <MenuItem value='High'>High</MenuItem>
                <MenuItem value='Low'>Low</MenuItem>
                <MenuItem value='Very Low'>Very Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Choose Status</InputLabel>
              <Select label='Choose Status' defaultValue='Pending'>
                <MenuItem value='Pending'>Pending</MenuItem>
                <MenuItem value='Ongoing'>Ongoing</MenuItem>
                <MenuItem value='Completed'>Completed</MenuItem>
                <MenuItem value='Cancelled'>Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ marginTop: 1 }}>
            <TextField
              fullWidth
              multiline
              label='Todo Description'
              minRows={2}
              placeholder='State a brief description of this todo'
              defaultValue='Hit the Gym'
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabInfo
