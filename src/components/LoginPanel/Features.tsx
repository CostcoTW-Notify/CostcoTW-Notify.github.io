import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    SxProps
} from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'


const features = () => {

    const iconSxProps: SxProps = {
        color: 'darkorange'
    }

    return (
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
    )
}

export default features