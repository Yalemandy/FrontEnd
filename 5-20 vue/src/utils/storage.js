// 对本地仓库的增删改查
const userinfo = 'userinfo'
// 搜索历史
const historyList = 'historyList'
// 往仓库里面存
export const setUserinfo = (value) => {
    localStorage.setItem(userinfo, value ? JSON.stringify(value) : {
        token: '',
        userId: ''
    })
}

// 从仓库里面取值
export const getUserinfo = () => {
    return localStorage.getItem(userinfo) ? JSON.parse(localStorage.getItem(userinfo)) : {
        token: '',
        userId: ''
    }
}

// 移除个人信息

export const removeUserInfo=()=>{
    localStorage.removeItem(userinfo)
}

// 往仓库里面存搜索历史
export const setHistoryList = (value) => {
    localStorage.setItem(historyList, value ? JSON.stringify(value) : [])
}
export const getHistoryList = () => {
    return localStorage.getItem(historyList) ? JSON.parse(localStorage.getItem(historyList)) : []
}
