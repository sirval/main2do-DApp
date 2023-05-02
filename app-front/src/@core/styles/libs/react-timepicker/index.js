// ** MUI imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const TimePickerWrapper = styled(Box)(({ theme }) => {
  return {
    /* import the React-time-picker CSS file */
    // @import url("react-time-picker/dist/TimePicker.css");

    /* override the default styles */
    '&.react-time-picker': {
      backgroundColor: '#f2f2f2',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '5px',
      fontSize: '16px',
      color: '#333'
    },

    '&.react-time-picker__wrapper': {
      position: 'relative'
    },

    '&.react-time-picker__clock': {
      backgroundColor: '#fff',
      border: 'none'
    },

    '&.react-time-picker__clock__face': {
      border: 'none',
      backgroundColor: '#fff'
    },

    '&.react-time-picker__clock__hand': {
      backgroundColor: '#333'
    },

    '&.react-time-picker__clock__dot': {
      backgroundColor: '#333'
    }
  }
})

export default TimePickerWrapper
