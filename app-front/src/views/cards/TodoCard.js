// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CardTwitter from './CardTwitter'

// ** Icons Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const TodoCard = props => {
  // ** State
  // const [collapse, setCollapse] = useState(false)
  // // console.log(props)
  // const handleClick = () => {
  //   setCollapse(!collapse)
  // }

const showTodos = (todo) => {
  let todoStatus = parseInt((todo?.status ?? 0).toString())
  if (todoStatus !== 0) {
    return (
      <Grid key={todo?.id} item xs={12} sm={6} md={4}>
        <CardTwitter 
          pageName={props.pageName}
          title={todo?.title}
          description={todo?.description}
          todoTime={todo?.todoTime}
          priority={todo?.priority}
          status={todo?.status}
          id={((parseInt(todo?.id, 10) || 0) + 1).toString()} //add 1 to the todo ID so the modal in CardTwitter with open prop declared as boolean will not have 0 as value and return false
          contract = {props.contract}
        />
      </Grid>
      
    )
  }else{

    return(
      <Grid key={todo?.id} item xs={12} sm={6} md={4}>
        <h4>No Available Todos </h4>
      </Grid>
    )
  }
}

  return (
    <Card>
      <>
          <Grid container spacing={6} style={{ padding: '10px' }}>
            {props.todos.length > 0 && 
            props.todos.map(todo => {
              return showTodos(todo)
            }) 
            }
          </Grid>
      </>

      
    </Card>
  )
}

export default TodoCard
