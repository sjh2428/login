import message from "./message";

const condition = {
    /**
     * is data in min and max?
     * 
     * @param {Number} data 
     * @param {Number} min 
     * @param {Number} max 
     */
    checkBound(data, min, max) {
        return min <= data && data <= max;
    },
    /**
     * is match with regex?
     * 
     * @param {String} testValue 
     * @param {RegExp} regex 
     * @returns {Boolean} 
     */
    checkRegex(testValue, regex) {
        return testValue.match(regex);
    },
    /**
     * is equal a and b?
     * 
     * @param {*} a 
     * @param {*} b 
     * @returns {Boolean} 
     */
    checkIsEqual(a, b) {
        return a === b;
    },
    /**
     * is not value number?
     * 
     * @param {*} val 
     * @returns {Boolean} 
     */
    checkIsNaN(val) {
        return isNaN(val);
    },
    /**
     * is a bigger than b?
     * 
     * @param {Number} a 
     * @param {Number} b 
     * @returns {Boolean}
     */
    checkIsMore(a, b) {
        return a > b;
    },
    /**
     * use if all condition is passed
     * 
     * @param {Object} msgClass 
     * @param {String} msgString 
     * @returns {Boolean}
     */
    meetAllConditions(msgClass, msgString) {
        message.changeMsg(msgClass, message.FAIL_MSG, message.PASS_MSG, msgString);
        return true;
    },
    /**
     * use if condition is failed
     * 
     * @param {Object} msgClass 
     * @param {String} msgString 
     * @returns {Boolean}
     */
    failedToCondition(msgClass, msgString) {
        message.changeMsg(msgClass, message.PASS_MSG, message.FAIL_MSG, msgString);
        return false;
    }
}

export default condition