import { v4 as uuidv4 } from 'uuid'
export const getUUID = () => {
    // 先从本地存储获取uuid
    let uuid_token = localStorage.getItem('UUIDTOKEN');
    // 如果没有
    if (!uuid_token) {
        // 我生成
        uuid_token = uuidv4();
        // 本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token);
    }
    // 切记要有返回值 否则就是undefined
    return uuid_token
}