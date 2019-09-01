const classObjs = {};

const getClasses = () => {
    const classNames = ["sign_up_form", "id", "msg_id", "pass", "msg_pass", "pass_check", "msg_pass_check", 
        "name", "msg_name", "birthday_year", "birthday_month", "birthday_day", "msg_birthday",
        "gender", "msg_gender", "email", "msg_email", "tel", "msg_tel", "interest", "ul_interests", "input_interest",
        "msg_interest", "interest_del_btn", "reset_btn", "sign_in_btn",
        "terms_window", "terms_window_exit_btn", "terms_window_agree_btn", "terms_check", "terms_agree_string", "msg_terms",
        "wrap_modal", "modal_content", "modal_ok_btn", "modal_cancel_btn", "modal_string"
    ];
    classNames.forEach(className => {
        classObjs[className] = document.querySelector(`.${className}`);
        if (className.includes("msg")) {
            classObjs[className].classList.add("err_msg");
        }
    });
}

const interestFocusHandler = () => {
    classObjs["interest"].focus();
}

const focusHandler = (e) => {
    e.target.parentNode.style = "border-color: #56C151;";
}

const focusOutHandler = (e) => {
    e.target.parentNode.style = "border-color: #DADADA;";
}

const injectFocusEventToTagArray = (tagArray) => {
    tagArray.forEach(tag => {
        tag.addEventListener("focus", focusHandler);
        tag.addEventListener("focusout", focusOutHandler);
    });
}

const injectFocusEvent = () => {
    // 약관의 체크박스를 제외한 전체 input tags
    const inputTags = document.querySelectorAll("input:not(.terms_check)");
    const selectTags = document.querySelectorAll("select");
    injectFocusEventToTagArray(inputTags);
    injectFocusEventToTagArray(selectTags);
}

const checkLength = (str, min, max) => {
    return min <= str.length && str.length <= max;
}

const checkBound = (val, lower, upper) => {
    return lower <= val && val <= upper;
}

// from_msg가 있다면 to_msg로 바꿔줌
const changeMsg = (msgClass, from, to, msgString) => {
    if (msgClass.classList.contains(from)) {
        msgClass.classList.replace(from, to);
    }
    msgClass.innerHTML = msgString;
}

const passedAllCondition = (msgClass, msgString) => {
    changeMsg(msgClass, "err_msg", "pass_msg", msgString);
    return true;
}

const failedCondition = (msgClass, msgString) => {
    changeMsg(msgClass, "pass_msg", "err_msg", msgString);
    return false;
}

const checkId = () => {
    let regex;
    let msgString = "";
    const idValue = classObjs["id"].value;
    const msgClass = classObjs["msg_id"];
    if (!checkLength(idValue, 5, 20)) {
        msgString = "5자 이상 20자 이하로 입력해주세요.";
        return failedCondition(msgClass, msgString);
    }
    regex = /^[a-z0-9-_]+$/;
    if (!idValue.match(regex)) {
        msgString = "영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "사용 가능한 아이디입니다.";
    return passedAllCondition(msgClass, msgString);
}

const idHandler = () => {
    checkId();
}

const checkPass = () => {
    let regex;
    let msgString = "";
    const passValue = classObjs["pass"].value;
    const msgClass = classObjs["msg_pass"];
    if (!checkLength(passValue, 8, 16)) {
        msgString = "8자 이상 16자 이하로 입력해주세요.";
        return failedCondition(msgClass, msgString);
    }
    regex = /^.*[A-Z].*$/;
    if (!passValue.match(regex)) {
        msgString = "영문 대문자를 최소 1자 이상 포함해주세요.";
        return failedCondition(msgClass, msgString);
    }
    regex = /^.*[0-9].*$/;
    if (!passValue.match(regex)) {
        msgString = "숫자를 최소 1자 이상 포함해주세요.";
        return failedCondition(msgClass, msgString);
    }
    regex = /^.*[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<.>/?].*$/;
    if (!passValue.match(regex)) {
        msgString = "특수문자를 최소 1자 이상 포함해주세요.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "안전한 비밀번호입니다.";
    return passedAllCondition(msgClass, msgString);
}

const passHandler = () => {
    checkPass();
}

const checkPassCheck = () => {
    let msgString = "";
    const passValue = classObjs["pass"].value;
    const passCheckValue = classObjs["pass_check"].value;
    const msgClass = classObjs["msg_pass_check"];
    if (passValue !== passCheckValue) {
        msgString = "비밀번호가 일치하지 않습니다.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "비밀번호가 일치합니다.";
    return passedAllCondition(msgClass, msgString);
}

const passCheckHandler = () => {
    checkPassCheck();
}

const getLastDay = (yearValue, monthValue) => {
    let dateObjForLastDay;
    if (monthValue === 12) {
        dateObjForLastDay = new Date(new Date(`${yearValue + 1}-01-01 00:00:00`).getTime() - 1);
    } else {
        dateObjForLastDay = new Date(new Date(`${yearValue}-${monthValue + 1}-01 00:00:00`).getTime() - 1);
    }
    return dateObjForLastDay.getDate();
}

const checkName = () => {
    let msgString = "";
    const nameValue = classObjs["name"].value;
    const msgClass = classObjs["msg_name"];
    if (nameValue.length < 2) {
        msgString = "2글자 이상의 이름을 입력해주세요.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return passedAllCondition(msgClass, msgString);
}

const nameHandler = () => {
    checkName();
}

const checkBirth = () => {
    let msgString = "";
    let yearValue = classObjs["birthday_year"].value;
    let monthValue = classObjs["birthday_month"].value;
    let dayValue = classObjs["birthday_day"].value;
    const msgClass = classObjs["msg_birthday"];
    // year handle
    const nowYear = new Date().getFullYear();
    const lowerBound = nowYear - 14;
    const upperBound = lowerBound + 99;
    if (isNaN(Number(yearValue)) || yearValue.length !== 4) {
        msgString = "태어난 년도 4자리를 정확하게 입력하세요.";
        return failedCondition(msgClass, msgString);
    }
    yearValue = Number(yearValue);
    if (checkBound(yearValue, lowerBound, upperBound)) {
        msgString = "만 14세 이상 만 99세 이하만 가입 가능합니다.";
        return failedCondition(msgClass, msgString);
    }
    // month handle
    monthValue = Number(monthValue);
    if (isNaN(monthValue)) {
        msgString = "태어난 월을 선택해주세요";
        return failedCondition(msgClass, msgString);
    }
    // day handle
    dayValue = Number(dayValue);
    lastDay = getLastDay(yearValue, monthValue);
    if (isNaN(dayValue) || !checkBound(dayValue, 1, lastDay)) {
        msgString = `태어난 날짜를 다시 확인해주세요. ${yearValue}년 ${monthValue}월은 1일부터 ${lastDay}까지 존재합니다.`;
        return failedCondition(msgClass, msgString);
    }
    msgString = "&nbsp;"
    return passedAllCondition(msgClass, msgString);
}

const birthHandler = () => {
    checkBirth();
}

const checkGender = () => {
    let msgString = "";
    const genderValue = classObjs["gender"].value;
    const msgClass = classObjs["msg_gender"];
    if (genderValue === "성별") {
        msgString = "성별을 선택해주세요";
        return failedCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return passedAllCondition(msgClass, msgString);
}

const genderHandler = () => {
    checkGender();
}

const checkEmail = () => {
    let msgString = "";
    const emailValue = classObjs["email"].value;
    const msgClass = classObjs["msg_email"];
    const regex = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailValue.match(regex)) {
        msgString = "이메일 주소를 다시 확인해주세요.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return passedAllCondition(msgClass, msgString);
}

const emailHandler = () => {
    checkEmail();
}

const checkTel = () => {
    let msgString = "";
    const regex = /^010[0-9]{7,8}$/;
    const telValue = classObjs["tel"].value;
    const msgClass = classObjs["msg_tel"];
    if (!telValue.match(regex)) {
        msgString = "형식에 맞지 않는 번호입니다.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return passedAllCondition(msgClass, msgString);
}

const telHandler = () => {
    checkTel();
}

const lastInterestEdit = (e) => {
    const interestUl = classObjs["ul_interests"];
    const lastInterest = interestUl.lastElementChild;
    if (lastInterest) { // interest ul의 마지막 node가 존재한다면
        const lastInterestText = lastInterest.childNodes[0].nodeValue;
        e.target.value = lastInterestText;
        lastInterest.remove();
    }
}

const inputKeyIsBackspace = (e) => {
    return e.key === "Backspace";
}

const valueIsEmpty = (e) => {
    return e.target.value === "";
}

const lastInputIsComma = (e) => {
    return e.key === ",";
}

const getInterestNode = (str) => {
    const interestLi = document.createElement("li");
    const interestText = document.createTextNode(str);
    const delBtn = document.createElement("button");
    const delText = document.createTextNode("X");
    interestLi.classList.add("li_interest");
    delBtn.classList.add("interest_del_btn");
    delBtn.appendChild(delText);
    delBtn.addEventListener("click", interestDelHandler);
    interestLi.appendChild(interestText);
    interestLi.appendChild(delBtn);
    return interestLi;
}

const appendInterest = (e) => {
    const inputValue = e.target.value.trim().slice(0, -1);
    if (inputValue.length > 0 && !inputValue.includes(",")) {
        const interestUl = classObjs["ul_interests"];
        interestUl.appendChild(getInterestNode(inputValue));
    }
    e.target.value = "";
}

const checkInterest = () => {
    let msgString = "";
    const interestsCnt = classObjs["ul_interests"].childNodes.length;
    const msgClass = classObjs["msg_interest"];
    if (interestsCnt < 3) {
        msgString = "3개 이상의 관심사를 입력하세요.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return passedAllCondition(msgClass, msgString);
}

const interestHandler = (e) => {
    // e.key를 권장하는 mdn
    // ref. slack에서 최형준님 말씀 참조
    if (inputKeyIsBackspace(e) && valueIsEmpty(e)) {
        lastInterestEdit(e);
    }
    if (lastInputIsComma(e)) {
        appendInterest(e);
    }
    checkInterest();
}

const interestDelHandler = (e) => {
    e.target.parentNode.remove();
    checkInterest();
}

const notAgreedTerms = () => {
    return !classObjs["terms_check"].checked;
}

const checkTerms = () => {
    let msgString = "";
    const msgClass = classObjs["msg_terms"];
    if (notAgreedTerms()) {
        msgString = "약관에 동의해주세요.";
        return failedCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return passedAllCondition(msgClass, msgString);
}

const termsHandler = () => {
    classObjs["terms_window"].style.display = "block";
}

const termsModalExitHandler = () => {
    classObjs["terms_window"].style.display = "none";
}

const termsModalAgreeHandler = () => {
    classObjs["terms_check"].checked = true;
    classObjs["terms_window"].style.display = "none";
}

const resetBtnHandler = () => {
    classObjs["modal_string"].innerHTML = "모든 내용을 새로 작성하시겠습니까?";
    classObjs["wrap_modal"].style.display = "flex";
    classObjs["modal_ok_btn"].addEventListener("click", resetOkBtnHandler);
    classObjs["modal_cancel_btn"].addEventListener("click", resetCancelBtnHandler);
}

const initializeAllInputData = () => {
    classObjs["sign_up_form"].reset();
    classObjs["ul_interests"].innerHTML = "";
}

const initializeAllMsgClass = () => {
    document.querySelectorAll(".msg").forEach(msgClass => {
        changeMsg(msgClass, "pass_msg", "err_msg", "&nbsp");
    });
}

const removeResetFeaturesInModal = () => {
    classObjs["wrap_modal"].style.display = "none";
    classObjs["modal_string"].innerHTML = "";
    classObjs["modal_ok_btn"].removeEventListener("click", resetOkBtnHandler);
    classObjs["modal_cancel_btn"].removeEventListener("click", resetCancelBtnHandler);
}

const resetOkBtnHandler = () => {
    removeAllInputData();
    initializeAllMsgClass();
    removeResetFeaturesInModal();
}

const resetCancelBtnHandler = () => {
    removeResetFeaturesInModal();
}

const createFulfillMsgList = () => {
    const fulfillMsg = [];
    checkList.forEach(list => {
        if (!list.func()) {
            fulfillMsg.push(list.msg);
        }
    });
    return fulfillMsg;
}

const fulfillModalOkBtnHandler = () => {
    classObjs["wrap_modal"].style.display = "none";
    classObjs["modal_ok_btn"].style.width = "130px";
    classObjs["modal_cancel_btn"].style.display = "flex";
    classObjs["modal_string"].innerHTML += "";
    classObjs["modal_content"].style.height = "200px";
    classObjs["modal_ok_btn"].removeEventListener("click", fulfillModalOkBtnHandler);
}

const removeCancelBtnInModal = () => {
    classObjs["modal_cancel_btn"].style.display = "none";
}

const expandOkBtnInModal = () => {
    classObjs["modal_ok_btn"].style.width = "100%";
}

const makeFulfillMsg = (fulfillMsgList) => {
    let fulfillMsg = "";
    fulfillMsgList.forEach(msg => {
        fulfillMsg += msg + "<br>";
    });
    return fulfillMsg;
}

const signInBtnHandler = () => {
    const fulfillMsgList = createFulfillMsgList();
    if (fulfillMsg.length === 0) { // 전체 입력 form이 올바르게 입력되었다면
        // fetch등을 사용하여 회원가입 진행
        // -----------
        // code ..
        // -----------
    } else { // 전체 입력 form이 올바르게 입력되지 않았다면
        // modal을 사용하여 입력하라 알려줌
        removeCancelBtnInModal();
        expandOkBtnInModal();
        classObjs["modal_string"].innerHTML = makeFulfillMsg(fulfillMsgList);
        classObjs["wrap_modal"].style.display = "flex";
        classObjs["modal_content"].style.height = `${200 + ((fulfillMsgList.length - 1) * 20)}px`;
        classObjs["modal_ok_btn"].addEventListener("click", fulfillModalOkBtnHandler);
    }
}

const injectEventListener = () => {
    classObjs["id"].addEventListener("keyup", idHandler);
    classObjs["pass"].addEventListener("keyup", passHandler);
    classObjs["pass_check"].addEventListener("keyup", passCheckHandler);
    classObjs["name"].addEventListener("keyup", nameHandler);
    classObjs["birthday_year"].addEventListener("keyup", birthHandler);
    classObjs["birthday_month"].addEventListener("change", birthHandler);
    classObjs["birthday_month"].addEventListener("keyup", birthHandler);
    classObjs["birthday_day"].addEventListener("keyup", birthHandler);
    classObjs["gender"].addEventListener("keyup", genderHandler);
    classObjs["gender"].addEventListener("change", genderHandler);
    classObjs["email"].addEventListener("keyup", emailHandler);
    classObjs["tel"].addEventListener("keyup", telHandler);
    classObjs["input_interest"].addEventListener("click", interestFocusHandler);
    classObjs["interest"].addEventListener("keyup", interestHandler); // keydown은 마지막 글자가 같이 지워짐
    classObjs["terms_agree_string"].addEventListener("click", termsHandler);
    classObjs["terms_window_exit_btn"].addEventListener("click", termsModalExitHandler);
    classObjs["terms_window_agree_btn"].addEventListener("click", termsModalAgreeHandler);
    classObjs["reset_btn"].addEventListener("click", resetBtnHandler);
    classObjs["sign_in_btn"].addEventListener("click", signInBtnHandler);
}

const init = () => {
    getClasses();
    injectFocusEvent();
    injectEventListener();
}

const checkList = [
    {
        func: checkId,
        msg: "아이디를 확인해주세요."
    }, {
        func: checkPass,
        msg: "비밀번호를 확인해주세요."
    }, {
        func: checkPassCheck,
        msg: "비밀번호 재확인란을 확인해주세요."
    }, {
        func: checkName,
        msg: "이름을 확인해주세요."
    }, {
        func: checkBirth,
        msg: "생년월일을 확인해주세요."
    }, {
        func: checkGender,
        msg: "성별을 선택해주세요."
    }, {
        func: checkEmail,
        msg: "이메일을 확인해주세요."
    }, {
        func: checkTel,
        msg: "전화번호를 확인해주세요."
    }, {
        func: checkInterest,
        msg: "관심사를 확인해주세요."
    }, {
        func: checkTerms,
        msg: "약관에 동의해주세요."
    }
]

init();