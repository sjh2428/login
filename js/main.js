const classObjs = {};

const getClasses = () => {
    const idArray = ["id", "msg_id", "pass", "msg_pass", "pass_check", "msg_pass_check", 
        "name", "msg_name", "birthday_year", "birthday_month", "birthday_day", "msg_birthday",
        "gender", "msg_gender", "email", "msg_email", "tel", "msg_tel", "interest", "msg_interest", 
        "terms_check", "terms_string", "reset_btn", "sign_in_btn"
    ];
    for (let i = 0; i < idArray.length; i++) {
        classObjs[idArray[i]] = document.querySelector(`.${idArray[i]}`);
        if (idArray[i].includes("msg")) {
            classObjs[idArray[i]].classList.add("err_msg");
        }
    }
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
const changeMsgClass = (msgClass, from, to) => {
    if (msgClass.classList.contains(from)) {
        msgClass.classList.replace(from, to);
    }
}

const checkId = (str, msgClass) => {
    let regex;
    if (!checkLength(str, 5, 20)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "5자 이상 20자 이하로 입력해주세요.";
    }
    regex = /^[a-z0-9-_]+$/;
    if (!str.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    return "사용 가능한 아이디입니다.";
}

const idHandler = () => {
    const idValue = classObjs["id"].value;
    const idMsg = classObjs["msg_id"];
    idMsg.innerHTML = checkId(idValue, idMsg);
}

const checkPass = (str, msgClass) => {
    let regex;
    if (!checkLength(str, 8, 16)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "8자 이상 16자 이하로 입력해주세요.";
    }
    regex = /^.*[A-Z].*$/;
    if (!str.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "영문 대문자를 최소 1자 이상 포함해주세요.";
    }
    regex = /^.*[0-9].*$/;
    if (!str.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "숫자를 최소 1자 이상 포함해주세요.";
    }
    regex = /^.*[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<.>/?].*$/;
    if (!str.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "특수문자를 최소 1자 이상 포함해주세요.";
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    return "안전한 비밀번호입니다.";
}

const passHandler = () => {
    const passValue = classObjs["pass"].value;
    const passMsg = classObjs["msg_pass"];
    passMsg.innerHTML = checkPass(passValue, passMsg);
}

const checkPassCheck = (passValue, passCheckValue, msgClass) => {
    if (passValue !== passCheckValue) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "비밀번호가 일치하지 않습니다.";
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    return "비밀번호가 일치합니다.";
}

const passCheckHandler = () => {
    const passValue = classObjs["pass"].value;
    const passCheckValue = classObjs["pass_check"].value;
    const passCheckMsg = classObjs["msg_pass_check"];
    passCheckMsg.innerHTML = checkPassCheck(passValue, passCheckValue, passCheckMsg);
}

const checkBirth = (yearValue, monthValue, dayValue, msgClass) => {
    // year handle
    const nowYear = new Date().getFullYear();
    const lowerBound = nowYear - 14;
    const upperBound = lowerBound + 99;
    if (isNaN(Number(yearValue)) || yearValue.length !== 4) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "태어난 년도 4자리를 정확하게 입력하세요.";
    }
    yearValue = Number(yearValue);
    if (!checkBound(yearValue, lowerBound, upperBound)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "만 14세 이상 만 99세 이하만 가입 가능합니다."
    }
    // month handle
    if (isNaN(Number(monthValue))) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "태어난 월을 선택해주세요";
    }
    // day handle
    dayValue = Number(dayValue);
    if (isNaN(dayValue) || !checkBound(dayValue, 1, 31)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "태어난 날짜를 다시 확인해주세요.";
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    return "&nbsp;";
}

const birthHandler = () => {
    const yearValue = classObjs["birthday_year"].value;
    const monthValue = classObjs["birthday_month"].value;
    const dayValue = classObjs["birthday_day"].value;
    const birthMsg = classObjs["msg_birthday"];
    birthMsg.innerHTML = checkBirth(yearValue, monthValue, dayValue, birthMsg);
}

const checkGender = (genderValue, msgClass) => {
    if (genderValue === "성별") {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        return "성별을 선택해주세요";
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    return "&nbsp;";
}

const genderHandler = () => {
    const genderValue = classObjs["gender"].value;
    const genderMsg = classObjs["msg_gender"];
    genderMsg.innerHTML = checkGender(genderValue, genderMsg);
}

const init = () => {
    getClasses();
    injectFocusEvent();
    classObjs["id"].addEventListener("keyup", idHandler);
    classObjs["pass"].addEventListener("keyup", passHandler);
    classObjs["pass_check"].addEventListener("keyup", passCheckHandler);
    classObjs["birthday_year"].addEventListener("keyup", birthHandler);
    classObjs["birthday_month"].addEventListener("change", birthHandler);
    classObjs["birthday_month"].addEventListener("keyup", birthHandler);
    classObjs["birthday_day"].addEventListener("keyup", birthHandler);
    classObjs["gender"].addEventListener("keyup", genderHandler);
    classObjs["gender"].addEventListener("change", genderHandler);
}

init();