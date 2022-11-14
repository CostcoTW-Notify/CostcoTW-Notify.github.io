import { getRouter } from "./routes"
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container } from '@mui/material'
import AuthService from "./services/AuthService"
import { Box } from "@mui/system";
import AppBar from './components/appBar/AppBar'
import AuthServiceContext from '@/context/AuthContext'


const app: React.FC = () => {

  const authService = new AuthService()

  const router = getRouter(authService)

  const darkTheme = createTheme({
    components: {
      MuiTypography: {
        defaultProps: {
          fontWeight: 550

        }
      },
      MuiIconButton: {
        defaultProps: {
          sx: {
            color: "CadetBlue"
          }
        }
      },
      MuiButton: {
        defaultProps: {
          sx: {
            backgroundColor: "CadetBlue"
          }
        }
      },
      MuiAppBar: {
        defaultProps: {
          sx: {
            backgroundColor: '#16c464'
          }
        }
      }
    },
    typography: {
      fontFamily: [
        'Microsoft JhengHei',
        'Noto Sans TC',
        "PingFang TC"
      ].join(','),
    },
    palette: {
      // mode: 'dark',
      // primary: green
    },
  });


  return (
    <ThemeProvider theme={darkTheme}>
      <AuthServiceContext.Provider value={authService}>
        <Box>
          <Box sx={{ height: '100vh' }}>
            <RouterProvider router={router} />
          </Box>
        </Box>
      </AuthServiceContext.Provider>
    </ThemeProvider>

  )
}

export default app