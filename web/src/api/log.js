
import request from '@/utils/axios'

export function list(data) {
    return request({
        url: '/log/list',
        method: 'post',
        data
    })
}