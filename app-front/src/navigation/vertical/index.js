// ** Icon imports
import HomeOutline from 'mdi-material-ui/HomeOutline';
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline';
import {
  TimerSandComplete,
  TimerSandEmpty,
  TimerSandPaused,
  TimerOff,
  AccountSupervisor,
} from 'mdi-material-ui';

const navigation = () => {
  return [
    {
      title: 'Home',
      icon: HomeOutline,
      path: '/',
    },
    {
      title: 'New Todo',
      icon: AccountCogOutline,
      path: '/new-todo',
    },
    {
      title: 'Ongoing',
      path: '/status/ongoing',
      icon: TimerSandEmpty,
    },

    {
      title: 'Completed',
      icon: TimerSandComplete,
      path: '/status/completed',
    },
    {
      title: 'Pending',
      icon: TimerSandPaused,
      path: '/status/pending',
    },
    {
      title: 'Cancelled',
      icon: TimerOff,
      path: '/status/cancelled',
    },

    {
      title: 'Hire Me',
      icon: AccountSupervisor,
      path: 'https://drive.google.com/file/d/1sFAXP9xnJ1eyUhAxppmubFZ0tFwvTXPA/view?usp=sharing',
    },
  ];
};

export default navigation;
