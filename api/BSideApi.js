import request from '@/utils/BSideRequest'

/**
 *    分页获取模型数据
 */
export function GetSdModelPage(a, b) {
    return request({
        url: '/admin/sd/page/model?pageNum=' + a + '&prompt=' + b,
        method: 'GET'
    })
}

/**
 *    新增模型
 */
export function PutSdModel(data) {
    return request({
        url: '/admin/sd/put/data',
        method: 'POST',
        data
    })
}

/**
 *    删除模型
 */
export function DeleteSdModel(data) {
    return request({
        url: '/admin/sd/delete/'+data,
        method: 'POST'
    })
}


export function SdConnectivity() {
    return request({
        url: '/drawing/sd/connectivity',
        method: 'GET'
    })
}


export function GetDrawingDataResult(data) {
    return request({
        url: '/drawing/image/data/'+data,
        method: 'GET'
    })
}

export function GetDrawingResult(data) {
    return request({
        url: '/drawing/status/'+data,
        method: 'GET'
    })
}

export function DrawingSdTask(data) {
    return request({
        url: '/drawing/sd/drawing/image',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

/**
 *    设置个性参数GPT
 */
export function PutPersonalityConfig(data) {
    return request({
        url: '/user/personality/put/config',
        method: 'POST',
        data
    })
}

/**
 *    设置个性参数GPT
 */
export function GetPersonalityConfig() {
    return request({
        url: '/user/personality/get/config',
        method: 'GET'
    })
}


/**
 *    获取终端数据
 */
export function GetTerminal() {
    return request({
        url: '/admin/server/terminal',
        method: 'GET'
    })
}

/**
 *    获取发送邮箱
 */
export function GetMail() {
    return request({
        url: '/admin/server/mail',
        method: 'GET'
    })
}

/**
 *   更新终端数据
 */
export function PutTerminal(data) {
    return request({
        url: '/admin/server/terminal',
        method: 'PUT',
        data
    })
}

/**
 *   更新发送邮箱
 */
export function PutMail(data) {
    return request({
        url: '/admin/server/mail',
        method: 'PUT',
        data
    })
}

/**
 *   更新公告
 */
export function PutAnnouncement(data) {
    return request({
        url: '/admin/announcement',
        method: 'PUT',
        data
    })
}

/**
 *    获取分页用户数据
 */
export function GetUserPage(params) {
    return request({
        url: '/admin/user/page',
        method: 'GET',
        params
    })
}


export function GetPublicRandomOps() {
    return request({
        url: '/drawing/random/get/ops',
        method: 'GET'
    })
}

export function GetSdModelList() {
    return request({
        url: '/drawing/sd/get/model',
        method: 'GET'
    })
}


/**
 *    获取订单分页数据
 */
export function getOrdersPage(a, b) {
    return request({
        url: '/admin/orders/page?pageNum=' + a + '&prompt=' + b + '&status=',
        method: 'GET'
    })
}

/**
 *   找回密码
 */
export function RetrieveEmailPassword(data) {
    return request({
        url: '/auth/email/password/back',
        method: 'POST',
        data
    })
}

/**
 *   重载服务器配置
 */
export function GetServerConfig() {
    return request({
        url: '/admin/server/config',
        method: 'GET'
    })
}


/**
 * Production exchange code
 * @returns {*}
 */
export function AddRedemptionCode(data) {
    return request({
        url: '/admin/exchange/build',
        method: 'POST',
        data
    })
}

/**
 * Production exchange code
 * @returns {*}
 */
export function DeleteRedemptionCode(data) {
    return request({
        url: '/admin/exchange/delete/' + data,
        method: 'POST'
    })
}


/**
 *   分页获取兑换码
 */
export function GetRedemptionCodePage(a, b) {
    return request({
        url: '/admin/exchange/get/page?pageNum=' + a + '&prompt=' + b,
        method: 'GET'
    })
}

/**
 * Production exchange code
 * @returns {*}
 */
export function DeleteProduct(data) {
    return request({
        url: '/admin/product/' + data,
        method: 'DELETE'
    })
}

/**
 * Production exchange code
 * @returns {*}
 */
export function AddProduct(data) {
    return request({
        url: '/admin/product',
        method: 'POST',
        data
    })
}

/**
 *   分页获取商品
 */
export function GetProductPage(params) {
    return request({
        url: '/admin/product/page',
        method: 'GET',
        params
    })
}


/**
 *   重载服务器配置
 */
export function PutServerConfig(data) {
    return request({
        url: '/admin/server/config',
        method: 'PUT',
        data
    })
}


/**
 *    修改用户Ai币
 */
export function UpdateUserInfo(data) {
    return request({
        url: '/admin/user/' + data.userId,
        method: 'PUT',
        data
    })
}

/**
 *    退出
 */
export function Logout() {
    return request({
        url: '/auth/wechat/logout',
        method: 'POST'
    })
}

/**
 *    获取公告
 */
export function GetAnnouncement() {
    return request({
        url: '/public/announcement',
        method: 'GET'
    })
}

/**
 *    获取验证码
 */
export function getEmailCode(data) {
    return request({
        url: '/auth/email/code/' + data,
        method: 'GET'
    })
}

/**
 *    注册
 */
export function EmailEnroll(data) {
    return request({
        url: '/auth/email/enroll',
        method: 'POST',
        data
    })
}

/**
 *   邮箱登录
 */
export function EmailLogin(data) {
    return request({
        url: '/auth/email/login',
        method: 'POST',
        data
    })
}

/**
 *    获取用户信息
 */
export function GetUserInfo() {
    return request({
        url: '/user/current/info',
        method: 'POST'
    })
}

/**
 *    发送消息
 */
export function SendAMessage(data) {
    return request({
        url: '/gpt/ask',
        method: 'POST',
        data
    })
}


/**
 *    获取收藏列表
 */
export function Favorites(data) {
    return request({
        url: '/star/page',
        method: 'GET',
        data
    })
}

/**
 *    获取商品列表
 */
export function GetProducts(params) {
    return request({
        url: '/pay/product/page',
        method: 'GET',
        params
    })
}

/**
 *    构建支付宝订单
 */
export function alipayPayQrCode(data) {
    return request({
        url: '/pay/alipay/pay/' + data,
        method: 'POST'
    })
}

/**
 *    支付宝支付状态查询
 */
export function alipayIsSucceed(data) {
    return request({
        url: '/pay/alipay/status/' + data,
        method: 'POST'
    })
}

/**
 *    用户订单PAGE
 */
export function UsersOrdersPage(data) {
    return request({
        url: '/pay/orders/page?pageNum=' + data,
        method: 'GET'
    })
}

/**
 *    使用兑换码
 */
export function UseExchangeCode(data) {
    return request({
        url: '/inspirit/exchange/' + data,
        method: 'POST'
    })
}

/**
 *    添加收藏
 */
export function FavoritesAdd(data) {
    return request({
        url: '/star',
        method: 'POST',
        data
    })
}

/**
 *    删除收藏
 */
export function FavoritesDel(data) {
    return request({
        url: '/star/delete/' + data,
        method: 'POST'
    })
}

/**
 * 获取授权登录二维码
 */
export function GetWechatCode() {
    return request({
        url: '/auth/wechat/get/code',
        method: 'POST'
    })
}

/**
 * 是否登录成功
 */
export function isQrCodeLoginSucceed(data) {
    return request({
        url: '/auth/wechat/code/result?verifyCode=' + data,
        method: 'GET'
    })
}

/**
 * 获取对话凭证
 */
export function GetChatSessionId() {
    return request({
        url: '/gpt/session-id',
        method: 'GET'
    })
}

/**
 * 获取会话历史记录
 */
export function GetSessionPage(params) {
    return request({
        url: '/dialogue/session',
        method: 'GET',
        params
    })
}

/**
 * 获取某次会话的所有对话记录
 */
export function GetDialogueList(params) {
    return request({
        url: '/dialogue',
        method: 'GET',
        params
    });
}

/**
 * 删除某个会话
 */
export function DeleteSession(data) {
    return request({
        url: '/dialogue/session',
        method: 'DELETE',
        data
    })
}