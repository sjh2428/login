import getClasses from "./getClasses";
import reqApi from "./reqApi";
import check from "./check";
import util from "./util";
import view from "./view";
import uuidv1 from "uuid/v1";
import render from "./render";

const classObjs = getClasses.getAllData();

const eventHandler = {
    idHandler() {
        const idValue = classObjs["id"].value;
        const msgClass = classObjs["msg_id"];
        check.checkId(idValue, msgClass);
    },
    passHandler() {
        const passValue = classObjs["pass"].value;
        const msgClass = classObjs["msg_pass"];
        check.checkPass(passValue, msgClass);
    },
    passCheckHandler() {
        const passValue = classObjs["pass"].value;
        const passCheckValue = classObjs["pass_check"].value;
        const msgClass = classObjs["msg_pass_check"];
        check.checkPassCheck(passValue, passCheckValue, msgClass);
    },
    nameHandler() {
        const nameValue = classObjs["name"].value;
        const msgClass = classObjs["msg_name"];
        check.checkName(nameValue, msgClass);
    },
    birthHandler() {
        const yearValue = classObjs["birthday_year"].value;
        const monthValue = classObjs["birthday_month"].value;
        const dayValue = classObjs["birthday_day"].value;
        const msgClass = classObjs["msg_birthday"];
        check.checkBirth(yearValue, monthValue, dayValue, msgClass);
    },
    genderHandler() {
        const genderValue = classObjs["gender"].value;
        const msgClass = classObjs["msg_gender"];
        check.checkGender(genderValue, msgClass);
    },
    emailHandler() {
        const emailValue = classObjs["email"].value;
        const msgClass = classObjs["msg_email"];
        check.checkEmail(emailValue, msgClass);
    },
    telHandler() {
        const telValue = classObjs["tel"].value;
        const msgClass = classObjs["msg_tel"];
        check.checkTel(telValue, msgClass);
    },
    interestHandler(e) {
        // e.key를 권장하는 mdn
        // ref. slack에서 최형준님 말씀 참조
        if (util.inputKeyIsBackspace(e.key) && util.valueIsEmpty(e.target.value)) {
            view.lastInterestEdit(e);
        }
        if (util.lastInputIsComma(e.key)) {
            view.appendInterest(e);
        }
        const interestsCnt = classObjs["ul_interests"].childNodes.length;
        const msgClass = classObjs["msg_interest"];
        check.checkInterest(interestsCnt, msgClass);
    },
    interestFocusHandler() {
        classObjs["interest"].focus();
    },
    focusHandler(e) {
        e.target.parentNode.style = "border-color: #56C151;";
    },
    focusOutHandler(e) {
        e.target.parentNode.style = "border-color: #DADADA;";
    },
    interestDelHandler(e) {
        e.target.parentNode.remove();
        const interestsCnt = classObjs["ul_interests"].childNodes.length;
        const msgClass = classObjs["msg_interest"];
        check.checkInterest(interestsCnt, msgClass);
    },
    termsHandler() {
        const inputWidth = document.querySelector(".input_area").offsetWidth;
        classObjs["terms_window"].style.width = `${inputWidth}px`;
        view.visualize("terms_window");
    },
    termsWindowAgreeHandler(e) {
        e.preventDefault();
        const msgClass = classObjs["msg_terms"];
        classObjs["terms_check"].checked = true;
        check.checkTerms(msgClass, classObjs["terms_check"].checked);
        view.nonVisualize("terms_window");
    },
    termsScrollHandler: function(e) {
        if (e.target.scrollTop === e.target.scrollHeight - 98) {
            classObjs["terms_window_agree_btn"].disabled = false;
            classObjs["terms_window_agree_btn"].style.opacity = 1;
            classObjs["terms_window_agree_btn"].style.cursor = "pointer";
            classObjs["terms_window_agree_btn"].addEventListener("click", eventHandler.termsWindowAgreeHandler);
            classObjs["terms_window_agree_btn"].addEventListener("mouseover", () => {
                view.changeBackgroundColor("terms_window_agree_btn", "#0BA600");
            });
            classObjs["terms_window_agree_btn"].addEventListener("mouseout", () => {
                view.changeBackgroundColor("terms_window_agree_btn", "#04C759");
            });
        }
    },
    termsWindowExitHandler() {
        view.nonVisualize("terms_window");
    },
    resetBtnHandler() {
        classObjs["modal_string"].innerHTML = "모든 내용을 새로 작성하시겠습니까?";
        view.visualize("wrap_modal");
        classObjs["modal_ok_btn"].addEventListener("click", eventHandler.resetOkBtnHandler);
        classObjs["modal_cancel_btn"].addEventListener("click", eventHandler.resetCancelBtnHandler);
    },
    resetOkBtnHandler() {
        view.initializeAllInputData();
        view.initializeAllMsgClass();
        view.removeResetFeaturesInModal();
    },
    resetCancelBtnHandler() {
        view.removeResetFeaturesInModal();
    },
    fulfillModalOkBtnHandler() {
        view.nonVisualize("wrap_modal");
        view.resizeWidth("modal_ok_btn", "130px");
        view.visualize("modal_cancel_btn");
        view.resizeHeight("modal_content", "200px");
        classObjs["modal_string"].innerHTML += "";
        classObjs["modal_ok_btn"].removeEventListener("click", eventHandler.fulfillModalOkBtnHandler);
    },
    loginFormLoginHandler(e) {
        e.preventDefault();
        reqApi.processLogin();
    },
    loginFormSignUpHandler() {
        view.visualize("wrap_sign_up_modal");
    },
    signUpModalExitBtnHandler() {
        view.nonVisualize("wrap_sign_up_modal");
    },
    signUpBtnHandler(e) {
        const fulfillMsgList = util.createFulfillMsgList();
        if (util.allEnteredDataIsCorrect(fulfillMsgList)) { // 전체 입력 form이 올바르게 입력되었다면
            // 회원가입 진행
            e.preventDefault();
            reqApi.processSignUp();
        } else { // 전체 입력 form이 올바르게 입력되지 않았다면
            // modal을 사용하여 입력하라 알려줌
            view.alertInputCorrectly(fulfillMsgList);
        }
    },
    injectEventListener() {
        const classObjs = getClasses.getAllData();
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
    },
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
        eventHandler.injectFocusEventToTagArray(inputTags);
        eventHandler.injectFocusEventToTagArray(selectTags);
    },
    logoutHandler() {
        render.renderLoginPage();
        document.cookie = `sessionId=${uuidv1()}`;
        location.reload();
    }
}

export default eventHandler