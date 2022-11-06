import { getRouter } from "./routes"
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material'
import AuthService from "./services/AuthService"
import { Box, SxProps } from "@mui/system";
import AppBar from './components/AppBar/AppBar'
import AuthServiceContext from '@/context/AuthContext'

const app: React.FC = () => {

  const authService = new AuthService()

  const router = getRouter(authService)

  const darkTheme = createTheme({
    palette: {
      // mode: 'dark',
    },
  });

  const props: SxProps = {
    // backgroundColor: "primary.main",
    height: '100vh',
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthServiceContext.Provider value={authService}>
        <Box sx={props}>
          <AppBar AuthService={authService} />
          <Container>
            <RouterProvider router={router} />
          </Container>
        </Box>
      </AuthServiceContext.Provider>
    </ThemeProvider>

  )
}

export default app