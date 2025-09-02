const md5 = require('md5')
const resJson = require('@/common/json')
const cons = require('crypto');
const nodemailer = require('nodemailer')
const dayjs = require('dayjs')
const { emailConfig } = require('@/config/config')

exports.md5 = (data) => {
    return md5(data)
}
//单向加密
exports.md2 = (data = '') => {
    return md5(md5(data).toUpperCase().slice(2)).toUpperCase().slice(2)
}

//全局错误处理
exports.handleError = (err = new Error, ctx) => {
    switch (err.name) {
        case 'UnauthorizedError':
            ctx.body = resJson.tokenError;
            break;
        case 'TokenExpiredError':
            ctx.body = resJson.tokenError;
            break;
        case 'JsonWebTokenError':
            ctx.body = resJson.tokenError;
            break;
        case 'ValidationError':
            ctx.body = resJson.paramError(err.message);
            break;
        default:
            ctx.body = resJson.unknowError('未知错误');
            break;
    }
}

const jwt = require('jsonwebtoken');
const tokenConfig = require('@/config/config');

//token生成
exports.setToken = (username, id, isAdmin = false) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({
            username,
            id,
            isAdmin
        }, tokenConfig.tokenSecret, { expiresIn: tokenConfig.tokenTime })
        resolve(token);
    })
}


//token验证
exports.verToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, tokenConfig.tokenSecret, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        })
    })
}


//对称加密
const aesCrypto = (data, key) => {
    key = Buffer.from(md5(key).substring(0, 16), 'utf-8');
    const iv = Buffer.from(md5(key).substring(10, 26), 'utf-8');
    const cipher = cons.createCipheriv('aes-128-cbc', key, iv);
    var aes = cipher.update(data, 'utf-8', 'hex');
    aes += cipher.final('hex');
    return aes;
}
//解密 
const aesDecrypto = (data, key) => {
    key = Buffer.from(md5(key).substring(0, 16), 'utf-8');
    const iv = Buffer.from(md5(key).substring(10, 26), 'utf-8');
    const dcipher = cons.createDecipheriv('aes-128-cbc', key, iv);
    var daes = dcipher.update(data, 'hex', 'utf-8');
    daes += dcipher.final('utf-8');
    return daes;
}

//加密 
exports.cryCode = (obj, user) => {
    let newObj = {}
    for (let key in obj) {
        newObj[key] = aesCrypto(obj[key], user)
    }
    return newObj
}
//解密 
exports.deCode = (obj, user) => {
    let newObj = {}
    for (let key in obj) {
        newObj[key] = aesDecrypto(obj[key], user)
    }
    return newObj
}


//生成随机字母
const randomString = (len) => {
    len = len || 32;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    var maxPos = chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

const getUid = () => {
    return new Date().getTime() + "-" + randomString(15)
}
exports.getUid = getUid;



//发送邮件
exports.sendMail = (data, mail) => {
    let transporter = nodemailer.createTransport({
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: emailConfig.user,
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: emailConfig.pass,
        }
    });
    let mailOptions = {
        from: emailConfig.from, // sender address
        to: mail, // list of receivers
        subject: '报错提醒', // Subject line
        html: data// html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("邮件发送失败", error);
        }
        console.log('Message sent: %s', info.messageId);
    });
}


//日志格式
exports.logFormat = (ctx, type, content, sign = false) => {
    return {
        userId: ctx.state.id,
        username: ctx.state.username,
        ip: ctx.state.ip,
        body: sign ? JSON.stringify(ctx.request.body) : '',
        type,
        content,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
}
