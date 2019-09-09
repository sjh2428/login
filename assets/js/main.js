import "./render";
import util from "./util";
import reqApi from "./reqApi";

const init = () => {
    util.injectFocusEvent();
    util.injectEventListener();
    reqApi.isLoggedInCookie();
}

init();