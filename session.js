const uuidv1 = require("uuid/v1");

const Session = class {
    constructor() {
        this.session = {}
        this.expireTime = 10 * 1000;
    }

    // session에 userKey와 매칭되는 세션키를 새로 생성한다
    makeSession(userKey) {
        const newId = uuidv1();
        this.session[newId] = userKey;
        setTimeout(() => {
            console.log("delete session", newId, this.session[newId]);
            delete this.session[newId];
        }, this.expireTime);
        return newId;
    }

    // 쿠키에 있는 key를 주면서 세션에 존재하는지 확인. 세션 객체에 존재하는 키인지 확인
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