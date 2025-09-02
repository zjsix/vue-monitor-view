
import dayjs from 'dayjs';
//全局处理表格时间
export const formatDate = (a, b, c) => {
    return c ? dayjs(c).format("YYYY-MM-DD") : '-'
}

//全局处理表格时间
export const formatTime = (a, b, c) => {
    return c ? dayjs(c).format("YYYY-MM-DD HH:mm:ss") : '-'
}

export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}