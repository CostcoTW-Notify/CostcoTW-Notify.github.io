import { getRouter } from "./routes"
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AuthService from "./services/AuthService"
import { Box } from "@mui/system";
import AuthServiceContext from '@/context/AuthContext'
import GlobalUIContext from '@/context/GlobalUIContext'
import Loading from '@/components/feedback/Loading'
import { useState } from 'react'


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

const app: React.FC = () => {

  const authService = new AuthService()

  const router = getRouter(authService)

  const [loadingFlag, updateFlag] = useState(false);

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalUIContext.Provider value={{
        showLoading: updateFlag
      }}>
        <AuthServiceContext.Provider value={authService}>
          <Loading show={loadingFlag} />
          <Box sx={{ height: '100vh' }}>
            <RouterProvider router={router} />
          </Box>
        </AuthServiceContext.Provider>
      </GlobalUIContext.Provider>
    </ThemeProvider>

  )
}

export default app