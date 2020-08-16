import deepFreeze from 'deep-freeze'
import blogReducer from './blogReducer'

describe('redux-blogs reducer', () => {
  const initialState = [
    { id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', likes: 7, url: 'https://reactpatterns.com/', 'user': '5a422a851b54a006234d17f3', __v: 0 },
    { id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5, url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', 'user': '5a422a851b54a006234d17f3', __v: 0 },
    { id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12, url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', 'user': '5a422a851b54a006234d17f3', __v: 0 },
    { id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', likes: 10, url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', 'user': '5a422a851b54a006234d17f3', __v: 0 },
    { id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', likes: 0, url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', 'user': '5a422a851b54a006234d17f2', __v: 0 },
    { id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', likes: 2, url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 'user': '5a422a851b54a006234d17f2', __v: 0 }
  ]

  test('invalid action does nothing', () => {
    const action = {
      type: 'INVALID'
    }

    const newState = blogReducer(initialState, action)
    expect(newState).toBe(initialState)
  })

  test('like action increments like count', () => {
    const id = '5a422aa71b54a676234d17f8'
    const action = {
      type: 'BLOG.LIKE',
      blog: initialState.find(blog => blog.id === id)
    }
    const state = initialState

    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState.find((blog) => blog.id === id).likes).toBe(initialState.find((blog) => blog.id === id).likes + 1)
  })

  test('create new blog returns proper state', () => {
    const action = {
      type: 'BLOG.CREATE',
      data: {
        title: 'This is a test',
        author: 'Foobar McJohnson',
        url: 'https://www.example.net',
        likes: 0,
        id: 'csL9X5w'
      }
    }
    const state = initialState

    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toHaveLength(initialState.length + 1)
    expect(newState[initialState.length].title).toBe('This is a test')
    expect(newState[initialState.length].likes).toBe(0)
  })

  test('delete blog returns proper state', () => {
    const action = {
      type: 'BLOG.DELETE',
      blog: {
        id: '5a422a851b54a676234d17f7'
      }
    }

    const state = initialState

    deepFreeze(state)
    const newState = blogReducer(state, action)
    expect(newState).toHaveLength(initialState.length - 1)
  })

  test('blogs are returned ordered by likes', () => {
    const id = '5a422b891b54a676234d17fa'
    const action = {
      type: 'BLOG.LIKE',
      blog: id
    }
    const state = initialState

    deepFreeze(state)
    const newState = blogReducer(state, action)
    const expectedOrder = [
      '5a422b3a1b54a676234d17f9',
      '5a422b891b54a676234d17fa',
      '5a422a851b54a676234d17f7',
      '5a422aa71b54a676234d17f8',
      '5a422bc61b54a676234d17fc',
      '5a422ba71b54a676234d17fb'
    ]
    expect(newState.map((blog) => blog.id)).toEqual(expectedOrder)
  })
})