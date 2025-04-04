# KnowvioFit
Fitness tracking app with ai suggestions and activity tracking.

## Routes
### server default routes
- /healthCheck  --> health check route
- / 

### User Routes
- /api/v1/user/register           --> Register user with (name, email, password)
- /api/v1/user/verifyemail/:id    --> Email will sent to user mail box (can be in spam box)
- /api/v1/user/login              --> Login user with (email, password)
- /api/v1/user/logout             --> Logout user

### Profile Routes


### Enviroment Variables
```
PORT=8000
DB_URI=*********
CLIENT_URL=""
COOKIE_SECRET=*********
NODE_ENV=*********
MAIL_PASS=********
MAIL_ID=********
```