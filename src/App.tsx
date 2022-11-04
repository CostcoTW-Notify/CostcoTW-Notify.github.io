import { getRouter } from "./routes"
import { RouterProvider } from 'react-router-dom'
import AuthService from "./services/AuthService"



const app: React.FC = () => {

  const authService = new AuthService()

  const router = getRouter(authService)

  return <RouterProvider router={router}></RouterProvider>
}

export default app