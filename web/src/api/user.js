import request from '@/utils/axios'

export function list(data) {
    return request({
        url: '/user/list',
        method: 'post',
        data
    })
}

export function add(data) {
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}

export function del(data) {
    return request({
        url: '/user/del',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: '/user/edit',
        method: 'post',
        data
    })
}

export function resetPassword(data) {
    return request({
        url: '/user/resetPassword',
        method: 'post',
        data
    })
}
