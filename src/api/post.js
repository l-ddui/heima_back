import axios from '@/utils/request'
export const getpostList = (params) => {
    return axios({
        url: '/post', params
    })
}