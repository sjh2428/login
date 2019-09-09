import getClasses from "./getClasses";
import eventHandler from "./eventHandler";

const util = {
    injectFocusEventToTagArray(tagArray) {
        tagArray.forEach(tag => {
            tag.addEventListener("focus", eventHandler.focusHandler);
            tag.addEventListener("focusout", eventHandler.focusOutHandler);
        });
    },
    injectFocusEvent() {
        // 약관의 체크박스를 제외한 전체 input tags
        const inputTags = document.querySelectorAll("input:not(.terms_check)");
        const selectTags = document.querySelectorAll("select");
        util.injectFocusEventToTagArray(inputTags);
        util.injectFocusEventToTagArray(selectTags);
    },
    getLastDay(yearValue, monthValue) {
        yearValue = Number(yearValue);
        monthValue = Number(monthValue);
        let dateObjForLastDay;
        if (monthValue === 12) {
            dateObjForLastDay = new Date(new Date(`${yearValue + 1}-01-01 00:00:00`).getTime() - 1);
        } else {
            dateObjForLastDay = new Date(new Date(`${yearValue}-${monthValue + 1}-01 00:00:00`).getTime() - 1);
        }
        return dateObjForLastDay.getDate();
    },
    inputKeyIsBackspace(key) {
        return key === "Backspace";
    },
    valueIsEmpty(value) {
        return value === "";
    },
    lastInputIsComma(key) {
        return key === ",";
    },
    createFulfillMsgList() {
        const fulfillMsg = [];
        const checkMsg = [
            "아이디를 확인해주세요.", "비밀번호를 확인해주세요.", "비밀번호 재확인란을 확인해주세요.", "이름을 확인해주세요.", "생년월일을 확인해주세요.", 
            "성별을 선택해주세요.", "이메일을 확인해주세요.", "전화번호를 확인해주세요.", "관심사를 확인해주세요.", "약관에 동의해주세요."
        ]
        const msgs = document.querySelectorAll(".msg");
        msgs.forEach((msg, idx) => {
            if (msg.classList.contains("err_msg")) {
                fulfillMsg.push(checkMsg[idx]);
            }
        });
        return fulfillMsg;
    },
    allEnteredDataIsCorrect(fulfillMsgList) {
        return fulfillMsgList.length === 0;
    },
    makeFulfillMsg(fulfillMsgList) {
        let fulfillMsg = "";
        fulfillMsgList.forEach(msg => {
            fulfillMsg += msg + "<br>";
        });
        return fulfillMsg;
    },
    getInterests(interestsLi) {
        let interests = "";
        interestsLi.forEach(li => {
            interests += li.childNodes[0].nodeValue + ",";
        });
        interests = interests.slice(0, -1);
        return interests;
    },
    injectEventListener() {
        const classObjs = getClasses.getAllData();
        console.log(classObjs);
        console.log(eventHandler.loginFormLoginHandler);
        classObjs["id"].addEventListener("keyup", eventHandler.idHandler);
        classObjs["pass"].addEventListener("keyup", eventHandler.passHandler);
        classObjs["pass_check"].addEventListener("keyup", eventHandler.passCheckHandler);
        classObjs["name"].addEventListener("keyup", eventHandler.nameHandler);
        classObjs["birthday_year"].addEventListener("keyup", eventHandler.birthHandler);
        classObjs["birthday_month"].addEventListener("change", eventHandler.birthHandler);
        classObjs["birthday_month"].addEventListener("keyup", eventHandler.birthHandler);
        classObjs["birthday_day"].addEventListener("keyup", eventHandler.birthHandler);
        classObjs["gender"].addEventListener("keyup", eventHandler.genderHandler);
        classObjs["gender"].addEventListener("change", eventHandler.genderHandler);
        classObjs["email"].addEventListener("keyup", eventHandler.emailHandler);
        classObjs["tel"].addEventListener("keyup", eventHandler.telHandler);
        classObjs["input_interest"].addEventListener("click", eventHandler.interestFocusHandler);
        classObjs["interest"].addEventListener("keyup", eventHandler.interestHandler); // keydown은 마지막 글자가 같이 지워짐
        classObjs["terms_window_guide_detail"].addEventListener("scroll", eventHandler.termsScrollHandler);
        classObjs["terms_agree_string"].addEventListener("click", eventHandler.termsHandler);
        classObjs["terms_window_exit_btn"].addEventListener("click", eventHandler.termsWindowExitHandler);
        classObjs["reset_btn"].addEventListener("click", eventHandler.resetBtnHandler);
        classObjs["sign_up_btn"].addEventListener("click", eventHandler.signUpBtnHandler);
        classObjs["login_form_login_btn"].addEventListener("click", eventHandler.loginFormLoginHandler);
        classObjs["login_form_sign_up_btn"].addEventListener("click", eventHandler.loginFormSignUpHandler);
        classObjs["sign_up_modal_exit_btn"].addEventListener("click", eventHandler.signUpModalExitBtnHandler);
    }
}

export default util