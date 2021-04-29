import axios from '@/utils/request'
export const userLogin = (data) => {
    return axios({
        method: 'post',
        url: '/login', data
    })
}