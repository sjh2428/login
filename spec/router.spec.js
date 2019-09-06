const assert = require("assert");
const httpMocks = require("node-mocks-http");
const routerHandler = require("../routes/index");

describe("route should be work well", () => {
    it("login route should give adminkey cookie about admin", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/login",
            body: {
                login_id: "admin",
                login_password: "qwer1234@!"
            }
        });
        const res = httpMocks.createResponse();
        routerHandler(req, res);
        assert.equal(res.cookies.sessionId.value, "adminkey");
    });
    it("login route should give undefined cookie about admin", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/login",
            body: {
                login_id: "admin",
                login_password: ""
            }
        });
        const res = httpMocks.createResponse();
        routerHandler(req, res);
        assert.equal(res.cookies.sessionId, undefined);
    });
    it("login route should give undefined cookie about ad", () => {
        const req = httpMocks.createRequest({
            method: "POST",
            url: "/login",
            body: {
                login_id: "ad",
                login_password: "qwer1234@!"
            }
        });
        const res = httpMocks.createResponse();
        routerHandler(req, res);
        assert.equal(res.cookies.sessionId, undefined);
    });
    it("logout route should return status code 302", () => {
        const req = httpMocks.createRequest({
            method: "GET",
            url: "/logout"
        });
        const res = httpMocks.createResponse();
        routerHandler(req, res);
        res.statusCode.should.be.equal(302);
    });
});