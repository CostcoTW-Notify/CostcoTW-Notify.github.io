
import {
    Box,
    Typography,
    Stack,
    Checkbox,
    Dialog,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    IconButton,
    Tooltip
} from '@mui/material'
import { Add, Save, Clear } from '@mui/icons-material';
import { useState } from 'react'
import { Subscriptions, ChatRoom, Dictionary } from '@/models/ChatRoom'
import Loading from '@/components/feedback/Loading'
import ApiService from '@/services/ApiService'
import SearchProductDialog from './SearchProductDialog'

interface IInventoryCheckItem {
    code: string
    name: string
}

interface IInventoryCheckTable {
    checkItems: IInventoryCheckItem[]
    updateCheckItem: Function
}

const InventoryCheckTable: React.FC<IInventoryCheckTable> = (props) => {
    const [showSearchDialog, setShowSearchDialog] = useState(false)

    const handleRemoveItem = (code: string) => {
        const newItems = props.checkItems.filter(x => x.code !== code)
        props.updateCheckItem(newItems)
    }

    const AddedNewItem = (code: string, name: string) => {
        const newItems = Object.assign([], props.checkItems);
        newItems.push({ code: code, name: name })
        props.updateCheckItem(newItems)
    }


    return (
        <Box>
            <Dialog open={showSearchDialog} onClose={() => setShowSearchDialog(false)}>
                <SearchProductDialog
                    AddNewItem={AddedNewItem}
                    CloseDialog={() => setShowSearchDialog(false)}
                />
            </Dialog>
            <Stack direction="row" alignItems="center">
                <Typography >
                    庫存上架通知
                </Typography>
                <Tooltip title="新增庫存監控商品">
                    <IconButton onClick={() => setShowSearchDialog(true)}>
                        <Add />
                    </IconButton>
                </Tooltip>
            </Stack>
            <Table size="small" >
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography >
                                編號
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography >
                                名稱
                            </Typography>
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.checkItems.map(item =>
                        <TableRow key={item.code} >
                            <TableCell><Typography>{item.code}</Typography></TableCell>
                            <TableCell><Typography>{item.name}</Typography></TableCell>
                            <TableCell>
                                <Tooltip title="移除監控">
                                    <IconButton onClick={() => handleRemoveItem(item.code)}>
                                        <Clear />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Box>
    )
}


interface ISubscription {
    RoomId: string
    Subscription?: Subscriptions
    ApiService: ApiService
}

const subscription: React.FC<ISubscription> = (props) => {
    const [showProcessing, setShowProcessing] = useState(false)
    const [subscription, setSubscription] = useState(props.Subscription)

    let checkItems: IInventoryCheckItem[] = []
    if (props.Subscription !== undefined && props.Subscription?.inventoryCheckList !== undefined)
        checkItems = Object.keys(props.Subscription.inventoryCheckList)
            .map(x => ({
                code: x,
                name: props.Subscription?.inventoryCheckList![x]
            } as IInventoryCheckItem))
    else
        checkItems = []

    const [inventoryCheckItems, setInventoryCheckItems] = useState(checkItems)

    const handleDailyOnSaleChange = () => {
        const newState = Object.assign({}, subscription)
        newState.dailyNewOnSale = !newState.dailyNewOnSale
        setSubscription(newState)
    }

    const handleDailyBestBuyChange = () => {
        const newState = Object.assign({}, subscription)
        newState.dailyNewBestBuy = !newState.dailyNewBestBuy
        setSubscription(newState)
    }

    const handleSaveSubscription = async () => {
        let chatRoomInfo = {} as ChatRoom
        chatRoomInfo.subscriptions = {} as Subscriptions
        chatRoomInfo.subscriptions.dailyNewBestBuy = subscription!.dailyNewBestBuy
        chatRoomInfo.subscriptions.dailyNewOnSale = subscription!.dailyNewOnSale
        chatRoomInfo.subscriptions.inventoryCheckList = {} as Dictionary

        inventoryCheckItems.forEach(x => {
            chatRoomInfo.subscriptions.inventoryCheckList[x.code] = x.name
        })

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
                    <Checkbox checked={subscription?.dailyNewOnSale} onChange={handleDailyOnSaleChange} />
                    <Typography> 每日新特價商品 </Typography>
                    <Checkbox checked={subscription?.dailyNewBestBuy} onChange={handleDailyBestBuyChange} />
                    <Typography> 每日最優惠商品 </Typography>
                </Stack>
                <Stack direction="row-reverse">
                    <Tooltip title="儲存訂閱設定">
                        <IconButton onClick={handleSaveSubscription}>
                            <Save />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </Stack>
            <InventoryCheckTable checkItems={inventoryCheckItems} updateCheckItem={setInventoryCheckItems} />
        </Box >
    )
}

export default subscription