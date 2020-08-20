describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Foo Bar',
      username: 'foobar',
      password: 'password123'
    }

    const user2 = {
      name: 'Spam Ham',
      username: 'spamham',
      password: 'password123'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
    cy.request('POST', 'http://localhost:3001/api/users', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('foobar')
      cy.get('#password').type('password123')
      cy.get('#loginButton').click()

      cy.contains('Foo Bar is logged in')
      cy.get('div.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('foobar')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.get('div.notification')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Foo Bar')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'foobar', password: 'password123' })
    })

    it('can log out', function() {
      cy.get('#logout').click()
      cy.get('div.notification')
        .contains('Logout successful')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
      // expect(localStorage.getItem('user')).to.be.null
    })

    it('a new blog can be created', function() {
      cy.get('#newBlogButton').click()
      cy.get('#titleInput').type('My Awesome Blog')
      cy.get('#authorInput').type('Foobar McJohnson')
      cy.get('#urlInput').type('https://www.example.net')
      cy.get('#newBlogSubmitButton').click()

      cy.get('.blogList').contains('My Awesome Blog')
      cy.get('div.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('And there are blogs', function() {
      beforeEach(function() {
        const blogs = [
          { title: 'React patterns', author: 'Michael Chan', likes: 7, url: 'https://reactpatterns.com/' },
          { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5, url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html' },
          { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12, url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html' }
        ]

        blogs.map(blog => {
          cy.createBlog(blog)
        })
        cy.visit('http://localhost:3000')
      })

      it('user can like a blog', function() {
        cy.get('div.blogList > div:nth-child(2) a').click()
        cy.get('div.blogLikes').should('contain', 'Likes 7')
        cy.get('div.blogLikes .likeButton').click()
        cy.get('div.blogLikes').should('contain', 'Likes 8')
        cy.visit('http://localhost:3000/blogs')
        cy.get('div.blogList > div:nth-child(2) a').click()
        cy.get('div.blogLikes').should('contain', 'Likes 8')
      })

      it('user can delete their own blog', function() {
        cy.get('div.blogList > div').should('have.length', 3)
        cy.get('div.blogList > div:nth-child(2) a').click()
        cy.get('div.deleteButton > button').click()
        cy.visit('http://localhost:3000/blogs')
        cy.get('div.blogList > div').should('have.length', 2)
      })

      it('user cannot delete someone else\'s blog', function() {
        cy.login({ username: 'spamham', password: 'password123' })
        cy.get('div.blogList > div').should('have.length', 3)
        cy.get('div.blogList > div:nth-child(2) a').click()
        cy.get('div.deleteButton').should('have.css', 'display', 'none')
      })

      describe('users view', function () {
        it('gets list of users and the number of blogs they created', function () {
          cy.visit('http://localhost:3000/users')
          cy.contains('Users')
          cy.get('table#userTable').should('contain', 'blogs created')
        })

        it('clicks on user name displays user details', function () {
          cy.visit('http://localhost:3000/users')
          cy.get('table#userTable tr#userRow_foobar td a').click()
          cy.contains('added blogs')
          cy.contains('Go To Statement Considered Harmful')
        })
      })

      describe('blogs view', function() {
        it('gets list of blogs', function() {
          const blogTitles = [
            'React patterns',
            'Go To Statement Considered Harmful',
            'Canonical string reduction'
          ]

          cy.visit('http://localhost:3000/blogs')
          blogTitles.map(title => cy.get('div.blogList').should('contain', title))
        })

        it('clicks on blog title displays blog details', function() {
          cy.get('div.blogList > div:nth-child(2) a').click()
          cy.get('h1').should('contain', 'React patterns Michael Chan')
          cy.get('div.blog')
            .should('contain', 'https://reactpatterns.com')
            .should('contain', 'Likes 7')
            .should('contain', 'Foo Bar')
        })
      })
    })

  })
})