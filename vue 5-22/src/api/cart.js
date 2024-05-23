import request from '@/utils/request.js'

export const addCart = (goodsId,goodsNum,goodsSkuId) =>{
    return request.post('/cart/add',{
        goodsId,
        goodsNum,
        goodsSkuId
    })
}

export const getCartList = () => {
    return request.get('/cart/list')
}

export const AddDelgoodsNum =(goodsId,goodsNum,goodsSkuId)=>{
    return request.post('/cart/update',{
        goodsId,
        goodsNum,
        goodsSkuId
    })
}