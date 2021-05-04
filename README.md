# Blog API

A RestFull Blog Api made using Node.js / Express.

Look at Blog client [here](https://github.com/ZASUO01/Blog-Client)
## Development
- Application made with Node.js / Express.
- MongoDB database and mongoose ODM
- Data encryption with bcrypt.js
- Token authentication with jsonwebtoken and passport.js

## Usage
### Posts
- Get all posts: GET - /posts 
- Get a single post: GET - /posts/:id
- Publish a post: POST - /posts/:id/publish
- Unpublish a post: POST - /posts/:id/unpublish
- Create a post: POST - /posts/create
- Edit a post: PUT - /posts/:id/update
- Delete a post: DELETE - /posts/:id/delete
### Comments
- Create a comment: POST - /comments/:post_id/create
- Edit a comment: PUT - /comments/:id/update
- Delete a comment: DELETE - /comments/:id/delete
### Users
- Get all users: GET - /users
- Get single user: GET - /users/:id
- Sign-Up: POST - /users/sign-up
- Log-in: POST - /users/log-in
- Delete user: DELETE - /users/:id/delete





## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
