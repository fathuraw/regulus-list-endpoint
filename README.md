# Regulus List Endpoints

Regulus endpoint parser to retrieve all the registered router in Regulus

## Example of Use

```typescript
import Regulus from 'regulus'
import printRoutes from 'regulus-list-endpoint'

// Initialize Regulus App
const App = new Regulus({
  port: 8888, // default 8888
  use: [], // array of express.Requesthandler/express.ErrorRequestHandler
  router: [], // array of class whosewhich extends Regulus.Router class
  errorHandler: [] // array of express.Requesthandler/express.ErrorRequestHandler
})

// start argument: express listen callback
App.start(() => {
  printRoutes(App.server).forEach((route) => console.log(`${route.methods} ${route.path}`))
  console.log('Listen: 8888')
})

console.log(listEndpoints(app));
/* It will print this:
GET /v1/ping
POST /v1/train
POST /v1/trainingStatus
POST /v1/query
POST /v1/trigger
*/
```

## LICENSE
WTFPL - You just DO WHAT THE FUCK YOU WANT TO