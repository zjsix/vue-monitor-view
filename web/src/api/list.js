
import request from '@/utils/axios'

export function list(data) {
    return request({
        url: '/record/list',
        method: 'post',
        data
    })
}

export function getOne(data) {
    return request({
        url: '/record/getOne',
        method: 'post',
        data
    })
}

export function add(data) {
    return request({
        url: '/record/add',
        method: 'post',
        data
    })
}

export function edit(data) {
    return request({
        url: '/record/edit',
        method: 'post',
        data
    })
}


export function del(data) {
    return request({
        url: '/record/del',
        method: 'post',
        data
    })
}