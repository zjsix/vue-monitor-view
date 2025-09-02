import request from '@/utils/axios'

//登陆
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

//获取用户信息
export function getUserInfo(data) {
  return request({
    url: '/getUserInfo',
    method: 'post',
    data
  })
}

//========================会员==============================
//获取会员列表
export function getMemberList(data) {
  return request({
    url: '/getMemberList',
    method: 'post',
    data
  })
}

//编辑会员
export function editMember(data) {
  return request({
    url: '/editMember',
    method: 'post',
    data
  })
}
//会员出营
export function memberOut(data) {
  return request({
    url: '/memberOut',
    method: 'post',
    data
  })
}

//删除会员
export function delMember(data) {
  return request({
    url: '/delMember',
    method: 'post',
    data
  })
}

//获取会员下拉框
export function getMemberSelect(data) {
  return request({
    url: '/getMemberSelect',
    method: 'post',
    data
  })
}



//======================注册审核==========================

//获取注册列表
export function getPeddingList(data) {
  return request({
    url: '/getPeddingList',
    method: 'post',
    data
  })
}

//编辑待审核会员
export function editPedding(data) {
  return request({
    url: '/editPedding',
    method: 'post',
    data
  })
}

//通过审核
export function passPedding(data) {
  return request({
    url: '/passPedding',
    method: 'post',
    data
  })
}

//拒绝审核
export function refusePedding(data) {
  return request({
    url: '/refusePedding',
    method: 'post',
    data
  })
}

//====================体重记录============================
//体重列表
export function getWeightList(data) {
  return request({
    url: '/getWeightList',
    method: 'post',
    data
  })
}

//新增体重
export function addWeight(data) {
  return request({
    url: '/addWeight',
    method: 'post',
    data
  })
}

//修改体重
export function editWeight(data) {
  return request({
    url: '/editWeight',
    method: 'post',
    data
  })
}

//====================会员体重列表========================
//会员体重列表
export function weightTable(data) {
  return request({
    url: '/weightTable',
    method: 'post',
    data
  })
}

//减重排行榜
export function weightRank(data) {
  return request({
    url: '/weightRank',
    method: 'post',
    data
  })
}

//====================班主任============================
//获取班主任列表
export function getMasterList(data) {
  return request({
    url: '/getMasterList',
    method: 'post',
    data
  })
}

//新增班主任
export function addMaster(data) {
  return request({
    url: '/addMaster',
    method: 'post',
    data
  })
}

//编辑班主任
export function editMaster(data) {
  return request({
    url: '/editMaster',
    method: 'post',
    data
  })
}

//删除班主任
export function delMaster(data) {
  return request({
    url: '/delMaster',
    method: 'post',
    data
  })
}

//====================房间============================
//获取房间列表
export function getRoomList(data) {
  return request({
    url: '/getRoomList',
    method: 'post',
    data
  })
}

//新增房间
export function addRoom(data) {
  return request({
    url: '/addRoom',
    method: 'post',
    data
  })
}

//编辑房间
export function editRoom(data) {
  return request({
    url: '/editRoom',
    method: 'post',
    data
  })
}

//删除房间
export function delRoom(data) {
  return request({
    url: '/delRoom',
    method: 'post',
    data
  })
}


//====================新闻=======================
//获取新闻列表
export function getNewsList(data) {
  return request({
    url: '/getNewsList',
    method: 'post',
    data
  })
}
//新增新闻
export function addNews(data) {
  return request({
    url: '/addNews',
    method: 'post',
    data
  })
}
//删除新闻
export function delNews(data) {
  return request({
    url: '/delNews',
    method: 'post',
    data
  })
}
//编辑新闻
export function editNews(data) {
  return request({
    url: '/editNews',
    method: 'post',
    data
  })
}


//====================修改信息=======================
//获取信息
export function getInfo(data) {
  return request({
    url: '/getInfo',
    method: 'post',
    data
  })
}

//编辑信息
export function editInfo(data) {
  return request({
    url: '/editInfo',
    method: 'post',
    data
  })
}

//==================公共接口===========================
//上传文件
export function addOrder(data) {
  return request({
    url: '/addOrder',
    method: 'post',
    data
  })
}


//=========================改密码=========================
export function changePassword(data) {
  return request({
    url: '/changePassword',
    method: 'post',
    data
  })
}
