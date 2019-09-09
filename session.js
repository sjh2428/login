const uuidv1 = require("uuid/v1");

const Session = class {
    constructor() {
        this.session = {}
        this.expireTime = 5 * 60 * 1000;
    }

    /**
     * session에 userKey와 매칭되는 세션키를 새로 생성한다
     * 
     * @param {String} userKey db에 들어있는 user key를 value로 함
     * @returns {String} return session id
     */
    makeSession(userKey) {
        const newId = uuidv1();
        this.session[newId] = userKey;
        setTimeout(() => {
            this.delSession(newId);
        }, this.expireTime);
        return newId;
    }

    delSession(key) {
        if (this.session[key]) {
            delete this.session[key];
        }
    }

    /**
     * 쿠키에 있는 key를 주면서 세션에 존재하는지 확인. 세션 객체에 존재하는 키인지 확인하는 method
     * 
     * @param {String} cookieKey session id in cookie
     * @returns {Array} [Boolean, String] 형태로 세션 내에 값이 존재하는지와 존재하는 값을 return
     */
    isSessionKey(cookieKey) { // cookieKey === sessionKey
        for(let sess in this.session) {
            if (cookieKey === sess) { // 쿠키에 들어있는 key가 session에 존재한다면
                return [true, this.session[sess]];
            }
        }
        return [false, undefined];
    }
}

module.exports = new Session();