import {
    Grid,
    Stack,
    CardMedia,
    SxProps,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
} from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt';
import logoImg from '@/assets/images/Logo.png'
import LineLoginButton from './LineLoginButton'



const loginPanel: React.FC = () => {

    const gridProps: SxProps = {
        p: '2em'
    }

    const iconSxProps: SxProps = {
        color: 'darkorange'
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

                <List >
                    <ListItem>
                        <ListItemText primary="目前支援功能 : " />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BoltIcon sx={iconSxProps} />
                        </ListItemIcon>
                        <ListItemText primary="每日新上架特價商品通知" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BoltIcon sx={iconSxProps} />
                        </ListItemIcon>
                        <ListItemText primary="每日新上架最優惠商品通知" secondary="(價格尾數為 7 的商品)" />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <BoltIcon sx={iconSxProps} />
                        </ListItemIcon>
                        <ListItemText primary="缺貨商品補貨通知" />
                    </ListItem>
                </List>
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

export default loginPanel