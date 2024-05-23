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