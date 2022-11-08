
import { ICostcoProduct } from '@/models/ICostcoProduct'
import ApiService from '@/services/ApiService'
import {
    Box,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Typography,
    CardMedia
} from '@mui/material'
import React, { useState } from 'react'


interface ISearchProductDialog {
    CloseDialog: Function
    AddNewItem: Function
}

interface IProductInfo {
    Product: ICostcoProduct
}

const ProductInfo: React.FC<IProductInfo> = (props) => {

    return (
        <Box >
            <Box
                component="img"
                sx={{
                    height: 233,
                    width: 350,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                }}
                alt={props.Product.metaTitle}
                src={props.Product.image}
            />
            <Typography>
                {props.Product.metaTitle}
            </Typography>
        </Box>
    )
}


const searchProductDialog: React.FC<ISearchProductDialog> = (props) => {
    const apiService = new ApiService()
    const [product, setProduct] = useState<ICostcoProduct | null>(null)
    const [code, setCode] = useState<string | null>(null)
    const handleCodeChange = async (event: any) => {
        const productInfo = await apiService.FetchProductFromCode(event.target.value);
        if (productInfo === null) {
            console.log("is null!")
            setProduct(null)
            setCode(null)
        }
        else {
            setProduct(productInfo)
            setCode(event.target.value)
        }
    }

    const handleCreateNewCheckItem = async () => {
        if (code === null || product === null) return
        props.AddNewItem(code, product?.metaTitle)
        props.CloseDialog()
    }

    return (
        <Box>
            <DialogTitle>搜尋 Costco 產品</DialogTitle>
            <DialogContent>
                <DialogContentText minWidth="30vw">
                    請輸入產品編號:
                </DialogContentText>
                <TextField
                    onChange={handleCodeChange}
                    autoFocus
                    margin="dense"
                    label="產品編號"
                    fullWidth
                    variant="standard"
                />
                {product !== null ?
                    <ProductInfo Product={product} /> :
                    <></>}
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.CloseDialog()}>取消</Button>
                <Button
                    disabled={product === null || code === null}
                    onClick={() => handleCreateNewCheckItem()}>新增庫存監測</Button>
            </DialogActions>
        </Box >
    )
}

export default searchProductDialog