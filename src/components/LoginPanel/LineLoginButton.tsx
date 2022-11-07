import {
    CardMedia,
    Grid,
} from '@mui/material'
import { useContext } from 'react'
import btn_base from '@/assets/line/btn_base.png'
import lineLogin from '@/assets/line/btn_login_base.png'
import AuthContext from '@/context/AuthContext'

const lineLoginButton: React.FC = () => {

    const authService = useContext(AuthContext)!

    const handleLogin = async () => {
        console.log('authService', authService)
        await authService.Login();
    }

    return (
        <Grid
            container
            justifyContent="center">
            <CardMedia
                onClick={handleLogin}
                component="img"
                image={lineLogin}
                alt="Line Login"
                sx={{
                    maxWidth: '200px'
                }}
            />
        </Grid>


    )
}

export default lineLoginButton