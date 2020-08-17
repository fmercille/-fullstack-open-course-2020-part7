import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import NewBlogForm from './NewBlogForm'

const NewBlogFormContainer = () => {
  const dispatch = useDispatch()
  const [newBlogFormVisible, setNewBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: newBlogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: newBlogFormVisible ? '' : 'none' }

  const handleCreateBlog = async (blogObject) => {
    console.log('handleCreateBlog')
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification('notice', 'Blog added'))
    } catch (error) {
      console.log(error.response)
      if (error.response.data.error) {
        dispatch(setNotification('error', error.response.data.error))
      } else {
        dispatch(setNotification('error', 'An error occured'))
      }
    }
  }

  return (
    <>
      <div style={hideWhenVisible}>
        <button id="newBlogButton" onClick={() => setNewBlogFormVisible(true)}>New blog</button>
      </div>

      <div style={showWhenVisible}>
        <h2>Create new blog</h2>
        <NewBlogForm
          createBlog={handleCreateBlog}
        />
        <button onClick={() => setNewBlogFormVisible(false)}>Cancel</button>
      </div>
    </>
  )
}

export default NewBlogFormContainer