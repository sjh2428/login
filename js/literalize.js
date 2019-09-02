const Classes = {
    classNames: [
        "wrap_sign_up_modal", "sign_up_form", "id", "msg_id", "pass", "msg_pass", "pass_check", "msg_pass_check", 
        "name", "msg_name", "birthday_year", "birthday_month", "birthday_day", "msg_birthday",
        "gender", "msg_gender", "email", "msg_email", "tel", "msg_tel", "interest", "ul_interests", "input_interest",
        "msg_interest", "interest_del_btn", "reset_btn", "sign_up_btn", "sign_up_modal_exit_btn", "terms_window_guide_detail",
        "terms_window", "terms_window_exit_btn", "terms_window_agree_btn", "terms_check", "terms_agree_string", "msg_terms",
        "wrap_modal", "modal_content", "modal_ok_btn", "modal_cancel_btn", "modal_string",
        "login_form_sign_up_btn", "login_form_login_btn"
    ],
    getClasses() {
        const classObjs = {}
        this.classNames.forEach(className => {
            classObjs[className] = document.querySelector(`.${className}`);
            if (className.includes("msg")) {
                classObjs[className].classList.add("err_msg");
            }
        });
        return classObjs;
    }
}

const classObjs = Classes.getClasses();

const CheckObjs = {
    msgClass: "",
    valueForCheck: "",
    checkBound(val, min, max) {
        return min <= val && val <= max;
    },
    checkPassCondition(condition, passMsg) { // 만약 성공이면 성공했다는 메세지 or 메세지를 비움 표시
        if (condition) {
            return Condition.meetAllConditions(this.msgClass, passMsg);
        }
        return false;
    },
    checkFailCondition(condition, errMsg) { // 만약 fail이면 재입력해달라 에러메세지 표시
        if (!condition) {
            return Condition.failedToCondition(this.msgClass, errMsg);
        }
        return true;
    },
    checkRegex(regex, errMsg) {
        return this.checkFailCondition(this.valueForCheck.match(regex), errMsg);
    },
    checkLength(min, max, errMsg = `${min}자 이상 ${max}자 이하로 입력해 주세요.`, val = this.valueForCheck.length) { // 범위내에 있으면 false 범위 밖이면 true
        return this.checkFailCondition(this.checkBound(val, min, max), errMsg);
    },
    checkIsEqual(a, b, errMsg) { // 같으면 true 다르면 false
        return this.checkFailCondition(a === b, errMsg);
    },
    checkMoreThan(num, errMsg) { // num 이상인 경우
        return this.checkFailCondition(this.valueForCheck >= num, num + errMsg);
    },
    checkCheckBox(errMsg) {
        return this.checkFailCondition(this.valueForCheck.checked, errMsg);
    },
    checkValueIsNotNumber(val, errMsg) {
        return this.checkFailCondition(!isNaN(val), errMsg);
    },
    checkId() {
        const idRegex = /^[a-z0-9-_]+$/;
        const idErrMsg = "영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
        const idPassMsg = "사용 가능한 아이디입니다.";
        this.valueForCheck = classObjs["id"].value;
        this.msgClass = classObjs["msg_id"];
        return this.checkPassCondition(this.checkLength(5, 20) && this.checkRegex(idRegex, idErrMsg), idPassMsg);
    },
    checkPass() {
        const [upperRegex, upperErrMsg] = [/^.*[A-Z].*$/, "영문 대문자를 최소 1자 이상 포함해주세요."];
        const [numRegex, numErrMsg] = [/^.*[0-9].*$/, "숫자를 최소 1자 이상 포함해주세요."];
        const specialCharRegex = /^.*[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<\.>/?].*$/;
        const specialCharErrMsg = "특수문자를 최소 1자 이상 포함해주세요.";
        const passwordPassMsg = "안전한 비밀번호입니다.";
        this.valueForCheck = classObjs["pass"].value;
        this.msgClass = classObjs["msg_pass"];
        const condition = this.checkLength(8, 16) && this.checkRegex(upperRegex, upperErrMsg) &&
            this.checkRegex(numRegex, numErrMsg) && this.checkRegex(specialCharRegex, specialCharErrMsg);
        return this.checkPassCondition(condition, passwordPassMsg
        );
    },
    checkPassCheck() {
        const passValue = classObjs["pass"].value;
        const passCheckErrMsg = "비밀번호가 일치하지 않습니다.";
        const passCheckPassMsg = "비밀번호가 일치합니다.";
        this.valueForCheck = classObjs["pass_check"].value;
        this.msgClass = classObjs["msg_pass_check"];
        const condition = this.checkLength(8, 16) && this.checkIsEqual(passValue, this.valueForCheck, passCheckErrMsg);
        return this.checkPassCondition(condition, passCheckPassMsg);
    },
    checkName() {
        const [min, nameErrMsg] = [2, "글자 이상 입력해주세요."];
        this.valueForCheck = classObjs["name"].value.length;
        this.msgClass = classObjs["msg_name"];
        return this.checkPassCondition(this.checkMoreThan(min, nameErrMsg), "&nbsp;");
    },
    checkBirthYear(yearValue) {
        const nowYear = new Date().getFullYear();
        const lowerBound = nowYear - 99;
        const upperBound = nowYear - 14;
        const birthYearStrCntErrMsg = "태어난 년도 4자리를 정확하게 입력하세요.";
        const ageErrMsg = "만 14세 이상 만 99세 이하만 가입 가능합니다.";
        if (!this.checkValueIsNotNumber(Number(yearValue), birthYearStrCntErrMsg)) {
            return false;
        }
        if (!this.checkIsEqual(yearValue.length, 4, birthYearStrCntErrMsg)) {
            return false;
        }
        if (!this.checkLength(lowerBound, upperBound, ageErrMsg, Number(yearValue))) {
            return false;
        }
        return this.checkPassCondition(true, "&nbsp;");
    },
    checkBirthMonth(monthValue) {
        const monthErrMsg = "태어난 월을 선택해주세요.";
        return this.checkPassCondition(this.checkValueIsNotNumber(Number(monthValue), monthErrMsg), "&nbsp;");
    },
    checkBirthDay(yearValue, monthValue, dayValue) {
        dayValue = Number(dayValue);
        const lastDay = UtilObjs.getLastDay(Number(yearValue), Number(monthValue));
        const dayErrMsg = `태어난 날짜를 다시 확인해주세요. ${yearValue}년 ${monthValue}월은 1일부터 ${lastDay}까지 존재합니다.`;
        const condition = this.checkValueIsNotNumber(dayValue, dayErrMsg) && this.checkLength(1, lastDay, dayErrMsg, dayValue);
        return this.checkPassCondition(condition, "&nbsp;");
    },
    checkBirth() {
        const yearValue = classObjs["birthday_year"].value;
        const monthValue = classObjs["birthday_month"].value;
        const dayValue = classObjs["birthday_day"].value;
        this.msgClass = classObjs["msg_birthday"];
        const condition = this.checkBirthYear(yearValue) && this.checkBirthMonth(monthValue)
                            && this.checkBirthDay(yearValue, monthValue, dayValue);
        return this.checkPassCondition(condition, "&nbsp");
    },
    checkGender() {
        const genderErrMsg = "성별을 선택해주세요";
        this.valueForCheck = classObjs["gender"].value;
        this.msgClass = classObjs["msg_gender"];
        // gender로 선택되어있지 않아야 함
        return this.checkPassCondition(!this.checkIsEqual(this.valueForCheck, "gender", genderErrMsg), "&nbsp;");
    },
    checkEmail() {
        const emailRegex = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        const emailErrMsg = "이메일 주소를 다시 확인해주세요.";
        this.valueForCheck = classObjs["email"].value;
        this.msgClass = classObjs["msg_email"];
        return this.checkPassCondition(this.checkRegex(emailRegex, emailErrMsg), "&nbsp;");
    },
    checkTel() {
        const telRegex = /^010[0-9]{7,8}$/;
        const telErrMsg = "형식에 맞지 않는 번호입니다.";
        this.valueForCheck = classObjs["tel"].value;
        this.msgClass = classObjs["msg_tel"];
        return this.checkPassCondition(this.checkRegex(telRegex, telErrMsg), "&nbsp;");
    },
    checkInterest() {
        const interestErrMsg = "개 이상의 관심사를 입력하세요.";
        this.valueForCheck = classObjs["ul_interests"].childNodes.length;
        this.msgClass = classObjs["msg_interest"];
        return this.checkPassCondition(this.checkMoreThan(3, interestErrMsg), "&nbsp;");
    },
    checkTerms() {
        const termsCheckErrMsg = "약관에 동의해주세요.";
        this.valueForCheck = classObjs["terms_check"];
        this.msgClass = classObjs["msg_terms"];
        return this.checkPassCondition(this.checkCheckBox(termsCheckErrMsg), "&nbsp;");
    },
    makeCheckList() {
        const returnMsgList = [];
        const funcs = [this.checkId, this.checkPass, this.checkPassCheck, this.checkName, this.checkBirth,
                        this.checkGender, this.checkEmail, this.checkTel, this.checkInterest, this.checkTerms];
        const msgs = ["아이디를 확인해주세요.", "비밀번호를 확인해주세요.", "비밀번호 재확인란을 확인해주세요.", "이름을 확인해주세요.",
                        "생년월일을 확인해주세요.", "성별을 선택해주세요.", "이메일을 확인해주세요.", "전화번호를 확인해주세요.",
                        "관심사를 확인해주세요.", "약관에 동의해주세요."];
        funcs.forEach((func, idx) => {
            if (!func()) {
                returnMsgList.push(msgs[idx]);
            }
        });
        return returnMsgList;
    },
    
}

const Condition = {
    meetAllConditions(msgClass, msgString) {
        MessageObjs.changeMsg(msgClass, "err_msg", "pass_msg", msgString);
        return true;
    },
    failedToCondition(msgClass, msgString) {
        MessageObjs.changeMsg(msgClass, "pass_msg", "err_msg", msgString);
        return false;
    }
}

const EventObjs = {
    injectEvents() {
        this.injectFocusEvent();
        this.injectEventListener();
    },
    interestFocusHandler() {
        classObjs["interest"].focus();
    },
    injectFocusEventToTagArray(tagArray) {
        tagArray.forEach(tag => {
            tag.addEventListener("focus", (e) => {this.focusHandler(e)});
            tag.addEventListener("focusout", (e) => {this.focusOutHandler(e)});
        });
    },
    injectFocusEvent() {
        // 약관의 체크박스를 제외한 전체 input tags
        const inputTags = document.querySelectorAll("input:not(.terms_check)");
        const selectTags = document.querySelectorAll("select");
        this.injectFocusEventToTagArray(inputTags);
        this.injectFocusEventToTagArray(selectTags);
    },
    idHandler() {
        CheckObjs.checkId();
    },
    passHandler() {
        CheckObjs.checkPass();
    },
    passCheckHandler() {
        CheckObjs.checkPassCheck();
    },
    nameHandler() {
        CheckObjs.checkName();
    },
    birthHandler() {
        CheckObjs.checkBirth();
    },
    genderHandler() {
        CheckObjs.checkGender();
    },
    emailHandler() {
        CheckObjs.checkEmail();
    },
    telHandler() {
        CheckObjs.checkTel();
    },
    termsHandler() {
        const inputWidth = document.querySelector(".input_area").offsetWidth;
        ControlObjs.setWidth("terms_window", `${inputWidth}px`);
        ControlObjs.visualize("terms_window");
    },
    termsWindowExitHandler() {
        ControlObjs.nonVisualize("terms_window");
    },
    termsWindowAgreeHandler(e) {
        e.preventDefault();
        classObjs["terms_check"].checked = true;
        CheckObjs.checkTerms();
        ControlObjs.nonVisualize("terms_window");
    },
    resetBtnHandler() {
        classObjs["modal_string"].innerHTML = "모든 내용을 새로 작성하시겠습니까?";
        ControlObjs.visualize("wrap_modal");
        classObjs["modal_ok_btn"].addEventListener("click", (e) => {this.resetOkBtnHandler(e)});
        classObjs["modal_cancel_btn"].addEventListener("click", (e) => {this.resetCancelBtnHandler(e)});
    },
    initializeAllInputData() {
        classObjs["sign_up_form"].reset();
        classObjs["ul_interests"].innerHTML = "";
    },
    initializeAllMsgClass() {
        document.querySelectorAll(".msg").forEach(msgClass => {
            MessageObjs.changeMsg(msgClass, "pass_msg", "err_msg", "&nbsp");
        });
    },
    removeResetFeaturesInModal() {
        ControlObjs.nonVisualize("wrap_modal");
        classObjs["modal_string"].innerHTML = "";
        classObjs["modal_ok_btn"].removeEventListener("click", (e) => {this.resetOkBtnHandler(e)});
        classObjs["modal_cancel_btn"].removeEventListener("click", (e) => {this.resetCancelBtnHandler(e)});
    },
    resetOkBtnHandler() {
        this.initializeAllInputData();
        this.initializeAllMsgClass();
        this.removeResetFeaturesInModal();
    },
    resetCancelBtnHandler() {
        this.removeResetFeaturesInModal();
    },
    checkModalOkBtnHandler() {
        ControlObjs.nonVisualize("wrap_modal");
        ControlObjs.setWidth("modal_ok_btn", "130px");
        ControlObjs.visualize("modal_cancel_btn");
        classObjs["modal_string"].innerHTML += "";
        ControlObjs.setHeight("modal_content", "200px");
        classObjs["modal_ok_btn"].removeEventListener("click", (e) => {this.checkModalOkBtnHandler(e)});
    },
    makeCheckMsg(checkMsgList) {
        let checkMsg = "";
        checkMsgList.forEach(msg => {
            checkMsg += msg + "<br>";
        });
        return checkMsg;
    },
    allEnteredDataIsCorrect(checkMsgList) {
        return checkMsgList.length === 0;
    },
    signUpBtnHandler() {
        const checkMsgList = CheckObjs.makeCheckList();
        if (this.allEnteredDataIsCorrect(checkMsgList)) { // 전체 입력 form이 올바르게 입력되었다면
            console.log("meet all conditions")
            // fetch등을 사용하여 회원가입 진행
            // -----------
            // code ..
            // -----------
        } else { // 전체 입력 form이 올바르게 입력되지 않았다면
            // modal을 사용하여 입력하라 알려줌
            ControlObjs.nonVisualize("modal_cancel_btn");
            ControlObjs.setWidth("modal_ok_btn", "100%");
            ControlObjs.visualize("wrap_modal");
            classObjs["modal_string"].innerHTML = this.makeCheckMsg(checkMsgList);
            ControlObjs.setHeight("modal_content", `${200 + ((checkMsgList.length - 1) * 25)}px`);
            classObjs["modal_ok_btn"].addEventListener("click", (e) => {this.CheckModalOkBtnHandler(e)});
        }
    },
    loginFormLoginHandler() {
        // fetch등을 활용하여 로그인
        // code ...
    },
    loginFormSignUpHandler() {
        ControlObjs.visualize("wrap_sign_up_modal");
    },
    signUpModalExitBtnHandler() {
        ControlObjs.nonVisualize("wrap_sign_up_modal");
    },
    injectEventListener() {
        classObjs["id"].addEventListener("keyup", (e) => {this.idHandler(e)});
        classObjs["pass"].addEventListener("keyup", (e) => {this.passHandler(e)});
        classObjs["pass_check"].addEventListener("keyup", (e) => {this.passCheckHandler(e)});
        classObjs["name"].addEventListener("keyup", (e) => {this.nameHandler(e)});
        classObjs["birthday_year"].addEventListener("keyup", (e) => {this.birthHandler(e)});
        classObjs["birthday_month"].addEventListener("change", (e) => {this.birthHandler(e)});
        classObjs["birthday_month"].addEventListener("keyup", (e) => {this.birthHandler(e)});
        classObjs["birthday_day"].addEventListener("keyup", (e) => {this.birthHandler(e)});
        classObjs["gender"].addEventListener("keyup", (e) => {this.genderHandler(e)});
        classObjs["gender"].addEventListener("change", (e) => {this.genderHandler(e)});
        classObjs["email"].addEventListener("keyup", (e) => {this.emailHandler(e)});
        classObjs["tel"].addEventListener("keyup", (e) => {this.telHandler(e)});
        classObjs["input_interest"].addEventListener("click", (e) => {this.interestFocusHandler(e)});
        classObjs["interest"].addEventListener("keyup", (e) => {this.interestHandler(e)}); // keydown은 마지막 글자가 같이 지워짐
        classObjs["terms_window_guide_detail"].addEventListener("scroll", (e) => {this.termsScrollHandler(e)});
        classObjs["terms_agree_string"].addEventListener("click", (e) => {this.termsHandler(e)});
        classObjs["terms_window_exit_btn"].addEventListener("click", (e) => {this.termsWindowExitHandler(e)});
        classObjs["reset_btn"].addEventListener("click", (e) => {this.resetBtnHandler(e)});
        classObjs["sign_up_btn"].addEventListener("click", (e) => {this.signUpBtnHandler(e)});
        classObjs["login_form_login_btn"].addEventListener("click", (e) => {this.loginFormLoginHandler(e)});
        classObjs["login_form_sign_up_btn"].addEventListener("click", (e) => {this.loginFormSignUpHandler(e)});
        classObjs["sign_up_modal_exit_btn"].addEventListener("click", (e) => {this.signUpModalExitBtnHandler(e)});
    },
    termsScrollHandler(e) {
        if (e.target.scrollTop === e.target.scrollHeight - 98) {
            classObjs["terms_window_agree_btn"].disabled = false;
            classObjs["terms_window_agree_btn"].style.opacity = 1;
            classObjs["terms_window_agree_btn"].style.cursor = "pointer";
            classObjs["terms_window_agree_btn"].addEventListener("click", (e) => {this.termsWindowAgreeHandler(e)});
            classObjs["terms_window_agree_btn"].addEventListener("mouseover", () => {
                classObjs["terms_window_agree_btn"].style.backgroundColor = "#0BA600";
            });
            classObjs["terms_window_agree_btn"].addEventListener("mouseout", () => {
                classObjs["terms_window_agree_btn"].style.backgroundColor = "#04C759";
            });
        }
    },
    lastInterestEdit(e) {
        const interestUl = classObjs["ul_interests"];
        const lastInterest = interestUl.lastElementChild;
        if (lastInterest) { // interest ul의 마지막 node가 존재한다면
            const lastInterestText = lastInterest.childNodes[0].nodeValue;
            e.target.value = lastInterestText;
            lastInterest.remove();
        }
    },
    inputKeyIsBackspace(e) {
        return e.key === "Backspace";
    },
    valueIsEmpty(e) {
        return e.target.value === "";
    },
    lastInputIsComma(e) {
        return e.key === ",";
    },
    getInterestNode(str) {
        const interestLi = document.createElement("li");
        const interestText = document.createTextNode(str);
        const delBtn = document.createElement("button");
        const delText = document.createTextNode("X");
        interestLi.classList.add("li_interest");
        delBtn.classList.add("interest_del_btn");
        delBtn.appendChild(delText);
        delBtn.addEventListener("click", (e) => {this.interestDelHandler(e)});
        interestLi.appendChild(interestText);
        interestLi.appendChild(delBtn);
        return interestLi;
    },
    appendInterest(e) {
        const inputValue = e.target.value.trim().slice(0, -1);
        if (inputValue.length > 0 && !inputValue.includes(",")) {
            const interestUl = classObjs["ul_interests"];
            interestUl.appendChild(this.getInterestNode(inputValue));
        }
        e.target.value = "";
    },
    interestHandler(e) {
        // e.key를 권장하는 mdn
        // ref. slack에서 최형준님 말씀 참조
        if (this.inputKeyIsBackspace(e) && this.valueIsEmpty(e)) {
            this.lastInterestEdit(e);
        }
        if (this.lastInputIsComma(e)) {
            this.appendInterest(e);
        }
        CheckObjs.checkInterest();
    },
    interestDelHandler(e) {
        e.target.parentNode.remove();
        CheckObjs.checkInterest();
    },
    focusHandler(e) {
        e.target.parentNode.style = "border-color: #56C151;";
    },
    focusOutHandler(e) {
        e.target.parentNode.style = "border-color: #DADADA;";
    }
}

const MessageObjs = {
    changeMsg(msgClass, from, to, msgString) {
        if (msgClass.classList.contains(from)) {
            msgClass.classList.replace(from, to);
        }
        msgClass.innerHTML = msgString;
    }
}

const ControlObjs = {
    visualize(className, displayValue = "flex") {
        classObjs[className].style.display = displayValue;
    },
    nonVisualize(className) {
        classObjs[className].style.display = "none";
    },
    setWidth(className, width) {
        classObjs[className].style.width = width;
    },
    setHeight(className, height) {
        classObjs[className].style.height = height;
    }
}

const UtilObjs = {
    getLastDay(yearValue, monthValue) {
        let dateObjForLastDay;
        if (monthValue === 12) {
            dateObjForLastDay = new Date(new Date(`${yearValue + 1}-01-01 00:00:00`).getTime() - 1);
        } else {
            dateObjForLastDay = new Date(new Date(`${yearValue}-${monthValue + 1}-01 00:00:00`).getTime() - 1);
        }
        return dateObjForLastDay.getDate();
    }
}

EventObjs.injectEvents();