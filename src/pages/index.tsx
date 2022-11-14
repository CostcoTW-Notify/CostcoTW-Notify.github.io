import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@/settings'
import { IAuthServiceDependency } from '@/interface/components/IAuthServiceDependency'
import {
    Grid,
    Stack,
    CardMedia,
    SxProps,
    Typography,
} from '@mui/material'
import logoImg from '@/assets/images/Logo.png'
import LineLoginButton from '@/components/loginPanel/LineLoginButton'
import Features from '@/components/loginPanel/Features'

interface IIndex extends IAuthServiceDependency {

}

const index: React.FC<IIndex> = (props) => {
    const navigate = useNavigate()
    const authService = props.AuthService

    useEffect(() => {
        const checkLogin = async () => {
            let user = await authService.GetUserInfo()
            if (user !== null)
                navigate(Routes.ChatRoomEndpoint)
        }

        checkLogin()
    }, [])

    const gridProps: SxProps = {
        p: '2em'
    }


    return (
        <Grid
            container
            justifyContent="center"
            sx={gridProps}>
            <Stack spacing={1}>
                <CardMedia
                    component="img"
                    image={logoImg}
                    alt="green iguana"
                />
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" >
                    台灣 Costco 線上商品 Line 推播通知，請先登入後開始使用 ( 免註冊 )
                </Typography>
                <Features />
                <LineLoginButton />
                <Typography
                    fontSize={10}
                    align='center'
                    variant='body2' >
                    與 Line 連動後將會請求取得使用者 Email 的權限，該資料僅作為後續整合其他第三方登入功能時使用
                </Typography>
            </Stack>
        </Grid>
    )
}


export default index