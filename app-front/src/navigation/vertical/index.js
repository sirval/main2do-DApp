// ** Icon imports
import Table from 'mdi-material-ui/Table'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import { TimerSandComplete, TimerSandEmpty, TimerSandPaused, TimerOff } from 'mdi-material-ui'

const navigation = () => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/'
    },
    {
      title: 'New Todo',
      icon: AccountCogOutline,
      path: '/new-todo'
    },
    {
      title: 'Ongoing',
      path: '/status/ongoing',
      icon: TimerSandEmpty
    },

    {
      title: 'Completed',
      icon: TimerSandComplete,
      path: '/status/completed'
    },
    {
      title: 'Pending',
      icon: TimerSandPaused,
      path: '/status/pending'
    },
    {
      title: 'Cancelled',
      icon: TimerOff,
      path: '/status/cancelled'
    }

    // {
    //   icon: CubeOutline,
    //   title: 'Form Layouts',
    //   path: '/form-layouts'
    // }
  ]
}

export default navigation
