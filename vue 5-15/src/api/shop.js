import request from '@/utils/request'

// 商品列表的请求
export const getShopList = (categoryId,goodsName,page) => {
   return request.get('/goods/list',{
        params:{
            sortType:'all',
            goodsName,
            categoryId,
            page
        }
    })
}

export const getShopDetail = () => {
    return request.get('/category/list')
}


// 商品详情的请求
export const getGoodsDetail = (goodsId) => {
    return request.get('/goods/detail',{
        params:{
            goodsId,
        }
    })
}


// 商品评论的请求
export const getGoodsComment = (goodsId,limit) => {
    return request.get('/comment/listRows',{
        params:{
            goodsId,
            limit
        }
    })
}