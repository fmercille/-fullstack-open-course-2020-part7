import blogService from '../services/blogs'

const sorter = (a, b) => a.likes > b.likes ? -1 : (a.likes < b.likes ? 1 : 0)

const reducer = (state = [], action) => {
  let newState = state

  switch (action.type) {
  case 'BLOG.LIKE':
    newState = state.map((blog) => blog.id === action.blog.id ? { ...blog, likes: blog.likes + 1 } : blog)
    break
  case 'BLOG.CREATE':
    newState = [...state, action.data]
    break
  case 'BLOG.DELETE':
    newState = state.filter(blog => blog.id !== action.blog.id)
    break
  case 'BLOG.NEW_COMMENT':
    newState = state.map((blog) => {
      if (blog.id === action.id) {
        return {
          ...blog,
          comments: [...blog.comments, action.comment]
        }
      } else {
        return blog
      }
    })
    break
  case 'BLOG.INIT':
    newState = action.data
    break
  default:
    return state
  }

  return newState.sort(sorter)
}


const like = (blog) => {
  return async dispatch => {
    await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'BLOG.LIKE',
      blog: blog
    })
  }
}

const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'BLOG.CREATE',
      data: newBlog
    })
  }
}

const deleteBlog = (blog) => {
  return async dispatch => {
    const deletedBlog = await blogService.delete(blog.id)
    dispatch({
      type: 'BLOG.DELETE',
      blog: deletedBlog
    })
  }
}

const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'BLOG.INIT',
      data: blogs
    })
  }
}

const addComment = (id, comment) => {
  return async dispatch => {
    await blogService.addComment(id, comment)
    dispatch({
      type: 'BLOG.NEW_COMMENT',
      id,
      comment
    })
  }
}

export default reducer

export {
  like,
  createBlog,
  deleteBlog,
  addComment,
  initializeBlogs
}