import axios from '@/utils/request'

// 文章列表
export const getpostList = (params) => {
    return axios({
        url: '/post', params
    })
}
// 栏目列表
export const getCategory = () => {
    return axios({
        url: '/category'
    })
}

// 发布文章
export const postArticle = (data) => {
    return axios({
        url: '/post',
        method: 'post', data
    })
}
