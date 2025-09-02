import request from '@/utils/axios'

export function list(data) {
    return request({
        url: '/ip/list',
        method: 'post',
        data
    })
}

export function add(data) {
    return request({
        url: '/ip/add',
        method: 'post',
        data
    })
}

export function del(data) {
    return request({
        url: '/ip/del',
        method: 'post',
        data
    })
}
