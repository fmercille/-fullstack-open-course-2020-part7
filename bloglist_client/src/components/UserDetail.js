import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const UserDetail = ({ user }) => {
  const blogs = useSelector(state => state.blogs)
  const classes = useStyles()
  const history = useHistory()

  const handleBlogClick = (blog) => {
    console.log(blog)
    history.push(`/blogs/${blog.id}`)
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <Typography variant="h2">
        {user.name}
      </Typography>
      <Typography variant="h3">
        Added blogs
      </Typography>
      <List className={classes.root}>
        {blogs
          .filter(blog => blog.user.id === user.id)
          .map(blog => (
            <ListItem id={`userBlog_${blog.id}`} key={blog.id} dense button onClick={() => handleBlogClick(blog)}>
              <ListItemText id={`listItem_${blog.id}`} primary={blog.title} />
            </ListItem>
          ))}
      </List>

    </div>
  )
}

UserDetail.propTypes = {
  user: PropTypes.object
}

export default UserDetail
