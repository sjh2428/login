const classObjs = {};

const getClasses = () => {
    const idArray = ["id", "msg_id", "pass", "msg_pass", "pass_check", "msg_pass_check", 
        "name", "msg_name", "birthday_year", "birthday_month", "birthday_day", "msg_birthday",
        "gender", "msg_gender", "email", "msg_email", "tel", "msg_tel", "interest", "ul_interests", 
        "msg_interest", "li_interest", "li_del_btn", "terms_check", "terms_string", "reset_btn", "sign_in_btn"
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

const checkId = (idValue, msgClass) => {
    let regex;
    if (!checkLength(idValue, 5, 20)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "5자 이상 20자 이하로 입력해주세요.";
        return false;
    }
    regex = /^[a-z0-9-_]+$/;
    if (!idValue.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
        return false;
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    msgClass.innerHTML = "사용 가능한 아이디입니다.";
    return true;
}

const idHandler = () => {
    const idValue = classObjs["id"].value;
    const idMsg = classObjs["msg_id"];
    checkId(idValue, idMsg);
}

const checkPass = (passValue, msgClass) => {
    let regex;
    if (!checkLength(passValue, 8, 16)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "8자 이상 16자 이하로 입력해주세요.";
        return false;
    }
    regex = /^.*[A-Z].*$/;
    if (!passValue.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "영문 대문자를 최소 1자 이상 포함해주세요.";
        return false;
    }
    regex = /^.*[0-9].*$/;
    if (!passValue.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "숫자를 최소 1자 이상 포함해주세요.";
        return false;
    }
    regex = /^.*[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<.>/?].*$/;
    if (!passValue.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "특수문자를 최소 1자 이상 포함해주세요.";
        return false;
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    msgClass.innerHTML = "안전한 비밀번호입니다.";
    return true;
}

const passHandler = () => {
    const passValue = classObjs["pass"].value;
    const passMsg = classObjs["msg_pass"];
    checkPass(passValue, passMsg);
}

const checkPassCheck = (passValue, passCheckValue, msgClass) => {
    if (passValue !== passCheckValue) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "비밀번호가 일치하지 않습니다.";
        return false;
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    msgClass.innerHTML = "비밀번호가 일치합니다.";
    return true;
}

const passCheckHandler = () => {
    const passValue = classObjs["pass"].value;
    const passCheckValue = classObjs["pass_check"].value;
    const passCheckMsg = classObjs["msg_pass_check"];
    checkPassCheck(passValue, passCheckValue, passCheckMsg);
}

const checkBirth = (yearValue, monthValue, dayValue, msgClass) => {
    // year handle
    const nowYear = new Date().getFullYear();
    const lowerBound = nowYear - 14;
    const upperBound = lowerBound + 99;
    if (isNaN(Number(yearValue)) || yearValue.length !== 4) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
        return false;
    }
    yearValue = Number(yearValue);
    if (!checkBound(yearValue, lowerBound, upperBound)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "만 14세 이상 만 99세 이하만 가입 가능합니다.";
        return false;
    }
    // month handle
    if (isNaN(Number(monthValue))) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "태어난 월을 선택해주세요";
        return false;
    }
    // day handle
    dayValue = Number(dayValue);
    if (isNaN(dayValue) || !checkBound(dayValue, 1, 31)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "태어난 날짜를 다시 확인해주세요.";
        return false;
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    msgClass.innerHTML = "&nbsp;";
    return true;
}

const birthHandler = () => {
    const yearValue = classObjs["birthday_year"].value;
    const monthValue = classObjs["birthday_month"].value;
    const dayValue = classObjs["birthday_day"].value;
    const birthMsg = classObjs["msg_birthday"];
    checkBirth(yearValue, monthValue, dayValue, birthMsg);
}

const checkGender = (genderValue, msgClass) => {
    if (genderValue === "성별") {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "성별을 선택해주세요";
        return false;
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    msgClass.innerHTML = "&nbsp;";
    return true;
}

const genderHandler = () => {
    const genderValue = classObjs["gender"].value;
    const genderMsg = classObjs["msg_gender"];
    checkGender(genderValue, genderMsg);
}

const checkEmail = (emailValue, msgClass) => {
    const regex = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    if (!emailValue.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "이메일 주소를 다시 확인해주세요.";
        return false;
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    msgClass.innerHTML = "&nbsp;";
    return true;
}

const emailHandler = () => {
    const emailValue = classObjs["email"].value;
    const emailMsg = classObjs["msg_email"];
    checkEmail(emailValue, emailMsg);
}

const checkTel = (telValue, msgClass) => {
    const regex = /^010[0-9]{7,8}$/;
    if (!telValue.match(regex)) {
        changeMsgClass(msgClass, "pass_msg", "err_msg");
        msgClass.innerHTML = "형식에 맞지 않는 번호입니다.";
        return false;
    }
    changeMsgClass(msgClass, "err_msg", "pass_msg");
    msgClass.innerHTML = "&nbsp;";
    return true;
}

const telHandler = () => {
    const telValue = classObjs["tel"].value;
    const telMsg = classObjs["msg_tel"];
    checkTel(telValue, telMsg);
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
    return e.keyCode === 8;
}

const valueIsEmpty = (e) => {
    return e.target.value === "";
}

const lastInputIsComma = (e) => {
    return e.target.value[e.target.value.length - 1] === ",";
}

const appendInterest = (e) => {
    const inputValue = e.target.value.trim().slice(0, -1);
    if (inputValue.length > 0 && !inputValue.includes(",")) {
        const interestUl = classObjs["ul_interests"];
        const interestLi = document.createElement("li");
        const interestText = document.createTextNode(inputValue);
        const delBtn = document.createElement("button");
        const delText = document.createTextNode("X");
        interestLi.classList.add("li_interest");
        delBtn.classList.add("li_del_btn");
        delBtn.appendChild(delText);
        interestLi.appendChild(interestText);
        interestLi.appendChild(delBtn);
        interestUl.appendChild(interestLi);
    }
    e.target.value = "";
}

const interestHandler = (e) => {
    // e.keyCode
    // 188: ,(comma)와 <(꺽쇄?)도 또한 188이기 때문에
    //      마지막 문자열을 체크하는 방식으로 해야할 듯 함
    // 8: backspace
    if (inputKeyIsBackspace(e) && valueIsEmpty(e)) {
        lastInterestEdit(e);
    }
    if (lastInputIsComma(e)) {
        appendInterest(e);
    }
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
    classObjs["email"].addEventListener("keyup", emailHandler);
    classObjs["tel"].addEventListener("keyup", telHandler);
    classObjs["interest"].addEventListener("keyup", interestHandler); // keydown은 마지막 글자가 같이 지워짐
}

init();