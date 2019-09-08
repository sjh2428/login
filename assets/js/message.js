const message = {
    // pass class name
    PASS_MSG: "pass_msg",
    // fail class name
    FAIL_MSG: "err_msg",
    /**
     * change message color and string
     * 
     * @param {Object} msgClass 
     * @param {String} from 
     * @param {String} to 
     * @param {String} msgString 
     */
    changeMsg(msgClass, from, to, msgString) {
        if (msgClass.classList.contains(from)) {
            msgClass.classList.replace(from, to);
        }
        msgClass.innerHTML = msgString;
    }
}

export default message