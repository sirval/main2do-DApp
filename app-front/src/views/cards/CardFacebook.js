// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Heart from 'mdi-material-ui/Heart'
import Facebook from 'mdi-material-ui/Facebook'
import ShareVariant from 'mdi-material-ui/ShareVariant'
import { TimerSandComplete, TimerSandEmpty, TimerSandPaused, TimerOff } from 'mdi-material-ui'


const CardFacebook = (props) => {
  
  const cardIcon = () => {
    if(props.cardDetail.icon === 'TimerSandComplete') return  <TimerSandComplete sx={{ marginRight: 2.5 }} />
    if(props.cardDetail.icon === 'TimerSandEmpty') return  <TimerSandEmpty sx={{ marginRight: 2.5 }} />
    if(props.cardDetail.icon === 'TimerSandPaused') return  <TimerSandPaused sx={{ marginRight: 2.5 }} />
    if(props.cardDetail.icon === 'TimerOff') return  <TimerOff sx={{ marginRight: 2.5 }} />
  }
  return (
    <Card sx={{ border: 0, boxShadow: 0, color: 'common.white', backgroundColor: `${props.cardDetail.color}` }}>
      <CardContent sx={{ padding: theme => `${theme.spacing(3.25, 5, 4.5)} !important` }}>
        <Typography
          variant='h6'
          sx={{ display: 'flex', marginBottom: 2.75, alignItems: 'center', color: 'common.white' }}
        >
         {cardIcon()}
          {props.cardDetail.name}
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant='body2' sx={{ color: 'common.white' }}>
              Total {props.cardDetail.name, `: ${props.cardDetail.total}`}
            </Typography>
          </Box>
          
        </Box>
      </CardContent>
    </Card>
  )
}

export default CardFacebook
