import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Container,
    SxProps
} from '@mui/material'
import { IAuthServiceDependency } from '@/interface/components/IAuthServiceDependency'
import Avater from './Avater'

interface IAppBarDependency extends IAuthServiceDependency { }


const appBar: React.FC<IAppBarDependency> = (props) => {

    return (
        <AppBar position="static" >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            align='center'
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="/"
                            sx={{
                                // mr: 2,
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
                        <Avater AuthService={props.AuthService} />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default appBar