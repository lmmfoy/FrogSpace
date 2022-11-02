# Facespace: the API doc

The Facespace server hosts the data and can provide your FE with the data it needs to render.

## Setup

1. Install the dependencies: `yarn install`. _only needs to be done once._
1. Start the server: `yarn dev:backend`.

Once the server is running it will be able to `res`pond to `req`uests. The data on the server can be modified, but only until a server restart. Once the server restarts all modifed data is wiped and data is reset to what is in `backend/data/users.js`

## API Endpoints

| Endpoint         | Method | Description                                                                    |
| ---------------- | ------ | ------------------------------------------------------------------------------ |
| `/api/users`     | GET    | This endpoint returns an array of all of the users                             |
| `/api/users/:id` | GET    | This endpoint returns the user object based on provided `id`                   |
| `/api/users/`    | PUT    | This enpoint accepts data in the `body` and updates the user                   |
| `/api/users/:id` | DELETE | This endpoint deletes a user from `users` (not needed for the project)         |
| `/api/friends`   | PATCH  | This endpoint accepts the `id`s of 2 people and will friend, or unfriend, them |

In order to make 2 users friends, provide the following to the `/api/friends` endpoint in the `body`. The server will look at both users. If they are NOT already friends, it will add them from each other's friends array. If they are already friends , it will remove them from each other's array.

```js
{
  newFriends: [<logged_in_user_id>, <other_user_id>]
}
```

### Dig into the BE code

You may need to dig into the code to understand how it works and how it will `res`pond to your requests. The server is not as well-written as you might expect and could have some weird quirks.

## 😎 How we did it

This section is not required reading, but if you're curious about how/why we implemented some of the server features, the answer might be in here.

### How we load the data

Assigning the array to a variable, places it in server memory. We can then make changes to the data and keep it "alive" as long as the server is not restarted/reset .

```js
// placing the users in memory | a poor man's database ;)
// any changes to the this data will persist only until the server restarts.
const users = require("./data/users.json");
```

The data is loaded when `server.js` is read/loaded into memory. There is a function that is used to "pass" the data to the handlers.

```js
// this function add the users array to the res object so that subsequent
// functions can access it via res.locals.users.
// We need to do this because the handlers are in a different file
// and don't have access to the users variable that was declared in server.js.
const passUsersAlong = (req, res, next) => {
  res.locals.users = users; // adds users to the res
  next(); // this passes the req, and res to the next handler in chain
};
```
