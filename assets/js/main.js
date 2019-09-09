import "./render";
import reqApi from "./reqApi";
import eventHandler from "./eventHandler";

const init = () => {
    eventHandler.injectFocusEvent();
    eventHandler.injectEventListener();
    reqApi.isLoggedInCookie();
}

init();