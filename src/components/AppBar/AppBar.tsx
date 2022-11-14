import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
} from '@mui/material'
import Avater from './Avater'
import { useContext } from 'react'
import AuthContext from '@/context/AuthContext'

const appBar: React.FC = () => {

    const authService = useContext(AuthContext)!

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            align='center'
                            variant="h6"
                            noWrap
                            sx={{
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            台灣 Costco 線上商品情報站
                        </Typography>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Avater AuthService={authService} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default appBar