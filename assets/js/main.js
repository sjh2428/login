import "./render";
import util from "./util";

const init = async() => {
    util.injectFocusEvent();
    util.injectEventListener();
}

init();