
import {
    Box,
    Typography,
    Stack,
    Checkbox,
    Button,
} from '@mui/material'
import { Add, Save } from '@mui/icons-material';
import { useState } from 'react'
import { Subscriptions, ChatRoom } from '@/models/ChatRoom'
import Loading from '@/components/feedback/Loading'
import ApiService from '@/services/ApiService'


interface ISubscription {
    RoomId: string
    Subscription?: Subscriptions
    ApiService: ApiService
}

const subscription: React.FC<ISubscription> = (props) => {
    console.log("data", props.Subscription)
    const [showProcessing, setShowProcessing] = useState(false)
    const [dailyOnSale, setDailyOnSale] = useState(props.Subscription?.dailyNewOnSale || false)
    const [dailyBestBuy, setDailyBestBuy] = useState(props.Subscription?.dailyNewBestBuy || false)


    const handleSaveSubscription = async () => {
        let chatRoomInfo = new ChatRoom()
        chatRoomInfo.subscriptions = new Subscriptions()
        chatRoomInfo.subscriptions.dailyNewOnSale = dailyOnSale
        chatRoomInfo.subscriptions.dailyNewBestBuy = dailyBestBuy
        setShowProcessing(true)
        await props.ApiService.UpdateChatRoom(props.RoomId, chatRoomInfo)
        setShowProcessing(false)
        window.location.reload()
    }

    return (
        <Box sx={{ m: 1 }}>
            <Loading show={showProcessing} />
            <Typography variant='h6' align='center'>
                通知項目
            </Typography>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" alignItems="center">
                    <Checkbox checked={dailyOnSale} onChange={() => setDailyOnSale(!dailyOnSale)} />
                    <Typography> 每日新特價商品 </Typography>
                    <Checkbox checked={dailyBestBuy} onChange={() => setDailyBestBuy(!dailyBestBuy)} />
                    <Typography> 每日最優惠商品 </Typography>
                </Stack>
                <Stack direction="row-reverse">
                    <Button onClick={handleSaveSubscription}>
                        <Save />
                    </Button>
                </Stack>
            </Stack>
            <Stack direction="row" alignItems="center">
                <Typography variant='body1' >
                    庫存上架通知
                </Typography>
                <Button >
                    <Add />
                </Button>
            </Stack>

        </Box >
    )
}

export default subscription