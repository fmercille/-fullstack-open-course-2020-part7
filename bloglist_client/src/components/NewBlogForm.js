import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  TextField
} from '@material-ui/core'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog} className="newBlogForm">
        <div>
          <TextField label="Title" id="titleInput" value={newTitle} onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
          <TextField label="Author" id="authorInput" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
          <TextField label="URL" id="urlInput" value={newUrl} onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <div>
          <Button id="newBlogSubmitButton" variant="contained" color="primary" type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default NewBlogForm