import Regulus from 'regulus'
import printRoutes from './index'

// Initialize Regulus App
const App = new Regulus({
  port: parseInt(process.env.PORT),
  use: [
  ],
  router: [
  ],
  errorHandler: []
})

App.start(() => {
  printRoutes(App.server).forEach((r: any) => console.log(`${r.methods} ${r.path}`))
  console.log(`Bahasa.ai Core Logic start at ${process.env.PORT}`)
})