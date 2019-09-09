import render from "./render";
import getClasses from "./getClasses";
import uuidv1 from "uuid/v1";

const isLoggedInCookie = async() => {
    return await fetch("/isAliveSession", {
        'Content-Type': 'application/x-www-form-urlencoded',
        method: "GET"
    }).then(res => res.json().then(res => {
        if (res.login) {
            renderHomePage(res.userData);
            return [res.login, undefined];
        } else {
            render.renderLoginPage();
            return [res.login, getClasses.getAllData()];
        }
    }));
}

const processLogin = () => {
    const login_id = document.querySelector("input[name='login_id']").value;
    const login_password = document.querySelector("input[name='login_password']").value;
    fetch("/login", {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        body: `login_id=${login_id}&login_password=${login_password}`
    }).then(res => res.json().then(res => {
        if (res.login) {
            renderHomePage(res.userData);
        }
    }));
}

const alertInputCorrectly = (fulfillMsgList) => {
    nonVisualize("modal_cancel_btn")
    resizeWidth("modal_ok_btn", "100%");
    visualize("wrap_modal");
    classObjs["modal_string"].innerHTML = makeFulfillMsg(fulfillMsgList);
    resizeHeight("modal_content", `${200 + ((fulfillMsgList.length - 1) * 25)}px`);
    classObjs["modal_ok_btn"].addEventListener("click", fulfillModalOkBtnHandler);
}

const getInterests = (interestsLi) => {
    let interests = "";
    interestsLi.forEach(li => {
        interests += li.childNodes[0].nodeValue + ",";
    });
    interests = interests.slice(0, -1);
    return interests;
}

const processSignUp = () => {
    const id = document.querySelector("input[name='id']").value;
    const pass = document.querySelector("input[name='pass']").value;
    const name = document.querySelector("input[name='name']").value;
    const birthday_year = document.querySelector("input[name='birthday_year']").value;
    const birthday_month = document.querySelector("select[name='birthday_month']").value;
    const birthday_day = document.querySelector("input[name='birthday_day']").value;
    const gender = document.querySelector("select[name='gender']").value;
    const email = document.querySelector("input[name='email']").value;
    const tel = document.querySelector("input[name='tel']").value;
    const interestsLi = document.querySelectorAll("li.li_interest");
    const interests = getInterests(interestsLi);

    fetch("/sign-up", {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        body: `id=${id}&pwd=${pass}&name=${name}&birthYear=${birthday_year}
                &birthMonth=${birthday_month}&birthDay=${birthday_day}&gender=${gender}
                &email=${email}&tel=${tel}&interests=${interests}`
    }).then(_ => init());
}

const renderHomePage = (info) => {
    render.renderHomePage(info);
    document.querySelector(".wrap_home_logout_btn").addEventListener("click", logoutHandler);
}

const logoutHandler = () => {
    document.cookie = `sessionId=${uuidv1()}`;
    // location.reload();
    init();
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

const meetAllConditions = (msgClass, msgString) => {
    changeMsg(msgClass, "err_msg", "pass_msg", msgString);
    return true;
}

const failedToCondition = (msgClass, msgString) => {
    changeMsg(msgClass, "pass_msg", "err_msg", msgString);
    return false;
}

const checkIdDuplicate = (id) => {
    return fetch(`/duplicate?id=${id}`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "GET"
    })
    .then(res => res.json())
    .then(json => {
        return json.duplicated;
    });
}

const checkId = async() => {
    let regex;
    let msgString = "";
    const idValue = classObjs["id"].value;
    const msgClass = classObjs["msg_id"];
    if (!checkLength(idValue, 5, 20)) {
        msgString = "5자 이상 20자 이하로 입력해주세요.";
        return failedToCondition(msgClass, msgString);
    }
    regex = /^[a-z0-9-_]+$/;
    if (!idValue.match(regex)) {
        msgString = "영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
        return failedToCondition(msgClass, msgString);
    }
    if (await checkIdDuplicate(idValue)) {
        msgString = "중복된 아이디입니다.";
        return failedToCondition(msgClass, msgString);
    }
    msgString = "사용 가능한 아이디입니다.";
    return meetAllConditions(msgClass, msgString);
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
        return failedToCondition(msgClass, msgString);
    }
    regex = /^.*[A-Z].*$/;
    if (!passValue.match(regex)) {
        msgString = "영문 대문자를 최소 1자 이상 포함해주세요.";
        return failedToCondition(msgClass, msgString);
    }
    regex = /^.*[0-9].*$/;
    if (!passValue.match(regex)) {
        msgString = "숫자를 최소 1자 이상 포함해주세요.";
        return failedToCondition(msgClass, msgString);
    }
    regex = /^.*[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<\.>/?].*$/;
    if (!passValue.match(regex)) {
        msgString = "특수문자를 최소 1자 이상 포함해주세요.";
        return failedToCondition(msgClass, msgString);
    }
    msgString = "안전한 비밀번호입니다.";
    return meetAllConditions(msgClass, msgString);
}

const passHandler = () => {
    checkPass();
}

const checkPassCheck = () => {
    let msgString = "";
    const passValue = classObjs["pass"].value;
    const passCheckValue = classObjs["pass_check"].value;
    const msgClass = classObjs["msg_pass_check"];
    if (!checkLength(passCheckValue, 8, 16)) {
        msgString = "8자 이상 16자 이하로 입력해주세요.";
        return failedToCondition(msgClass, msgString);
    }
    if (passValue !== passCheckValue) {
        msgString = "비밀번호가 일치하지 않습니다.";
        return failedToCondition(msgClass, msgString);
    }
    msgString = "비밀번호가 일치합니다.";
    return meetAllConditions(msgClass, msgString);
}

const passCheckHandler = () => {
    checkPassCheck();
}

const getLastDay = (yearValue, monthValue) => {
    yearValue = Number(yearValue);
    monthValue = Number(monthValue);
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
        return failedToCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return meetAllConditions(msgClass, msgString);
}

const nameHandler = () => {
    checkName();
}

const checkBirthYear = (yearValue, msgClass) => {
    let msgString = "";
    const nowYear = new Date().getFullYear();
    const lowerBound = nowYear - 99;
    const upperBound = nowYear - 14;
    if (isNaN(Number(yearValue)) || yearValue.length !== 4) {
        msgString = "태어난 년도 4자리를 정확하게 입력하세요.";
        return failedToCondition(msgClass, msgString);
    }
    yearValue = Number(yearValue);
    if (!checkBound(yearValue, lowerBound, upperBound)) {
        msgString = "만 14세 이상 만 99세 이하만 가입 가능합니다.";
        return failedToCondition(msgClass, msgString);
    }
    return true;
}

const checkBirthMonth = (monthValue, msgClass) => {
    monthValue = Number(monthValue);
    if (isNaN(monthValue)) {
        const msgString = "태어난 월을 선택해주세요";
        return failedToCondition(msgClass, msgString);
    }
    return true;
}

const checkBirthDay = (yearValue, monthValue, dayValue, msgClass) => {
    dayValue = Number(dayValue);
    const lastDay = getLastDay(yearValue, monthValue);
    if (isNaN(dayValue) || !checkBound(dayValue, 1, lastDay)) {
        const msgString = `태어난 날짜를 다시 확인해주세요. ${yearValue}년 ${monthValue}월은 1일부터 ${lastDay}까지 존재합니다.`;
        return failedToCondition(msgClass, msgString);
    }
    return true;
}

const checkBirth = () => {
    const yearValue = classObjs["birthday_year"].value;
    const monthValue = classObjs["birthday_month"].value;
    const dayValue = classObjs["birthday_day"].value;
    const msgClass = classObjs["msg_birthday"];
    if (checkBirthYear(yearValue, msgClass) && checkBirthMonth(monthValue, msgClass)
            && checkBirthDay(yearValue, monthValue, dayValue, msgClass)) {
        const msgString = "&nbsp;"
        return meetAllConditions(msgClass, msgString);
    }
    return false;
}

const birthHandler = () => {
    checkBirth();
}

const checkGender = () => {
    let msgString = "";
    const genderValue = classObjs["gender"].value;
    const msgClass = classObjs["msg_gender"];
    if (genderValue === "gender") {
        msgString = "성별을 선택해주세요";
        return failedToCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return meetAllConditions(msgClass, msgString);
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
        return failedToCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return meetAllConditions(msgClass, msgString);
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
        return failedToCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return meetAllConditions(msgClass, msgString);
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
        return failedToCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return meetAllConditions(msgClass, msgString);
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
    return classObjs["terms_check"].checked === false;
}

const checkTerms = () => {
    let msgString = "";
    const msgClass = classObjs["msg_terms"];
    if (notAgreedTerms()) {
        msgString = "약관에 동의해주세요.";
        return failedToCondition(msgClass, msgString);
    }
    msgString = "&nbsp;";
    return meetAllConditions(msgClass, msgString);
}

const visualize = (className, displayValue = "flex") => {
    classObjs[className].style.display = displayValue;
}

const nonVisualize = (className) => {
    classObjs[className].style.display = "none";
}

const resizeWidth = (className, size) => {
    classObjs[className].style.width = size;
}

const resizeHeight = (className, size) => {
    classObjs[className].style.height = size;
}

const changeBackgroundColor = (className, color) => {
    classObjs[className].style.backgroundColor = color;
}

const termsScrollHandler = (e) => {
    if (e.target.scrollTop === e.target.scrollHeight - 98) {
        classObjs["terms_window_agree_btn"].disabled = false;
        classObjs["terms_window_agree_btn"].style.opacity = 1;
        classObjs["terms_window_agree_btn"].style.cursor = "pointer";
        classObjs["terms_window_agree_btn"].addEventListener("click", termsWindowAgreeHandler);
        classObjs["terms_window_agree_btn"].addEventListener("mouseover", function() {
            changeBackgroundColor("terms_window_agree_btn", "#0BA600");
        });
        classObjs["terms_window_agree_btn"].addEventListener("mouseout", function() {
            changeBackgroundColor("terms_window_agree_btn", "#04C759");
        });
    }
}

const termsHandler = () => {
    const inputWidth = document.querySelector(".input_area").offsetWidth;
    resizeWidth("terms_window", `${inputWidth}px`);
    visualize("terms_window");
}

const termsWindowExitHandler = () => {
    nonVisualize("terms_window");
}

const termsWindowAgreeHandler = (e) => {
    e.preventDefault();
    classObjs["terms_check"].checked = true;
    checkTerms();
    nonVisualize("terms_window");
}

const resetBtnHandler = () => {
    classObjs["modal_string"].innerHTML = "모든 내용을 새로 작성하시겠습니까?";
    visualize("wrap_modal");
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
    nonVisualize("wrap_modal");
    classObjs["modal_string"].innerHTML = "";
    classObjs["modal_ok_btn"].removeEventListener("click", resetOkBtnHandler);
    classObjs["modal_cancel_btn"].removeEventListener("click", resetCancelBtnHandler);
}

const resetOkBtnHandler = () => {
    initializeAllInputData();
    initializeAllMsgClass();
    removeResetFeaturesInModal();
}

const resetCancelBtnHandler = () => {
    removeResetFeaturesInModal();
}

const createFulfillMsgList = () => {
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
}

const fulfillModalOkBtnHandler = () => {
    nonVisualize("wrap_modal");
    resizeWidth("modal_ok_btn", "130px");
    visualize("modal_cancel_btn");
    classObjs["modal_string"].innerHTML += "";
    resizeHeight("modal_content", "200px");
    classObjs["modal_ok_btn"].removeEventListener("click", fulfillModalOkBtnHandler);
}

const makeFulfillMsg = (fulfillMsgList) => {
    let fulfillMsg = "";
    fulfillMsgList.forEach(msg => {
        fulfillMsg += msg + "<br>";
    });
    return fulfillMsg;
}

const allEnteredDataIsCorrect = (fulfillMsgList) => {
    return fulfillMsgList.length === 0;
}

const signUpBtnHandler = (e) => {
    const fulfillMsgList = createFulfillMsgList();
    if (allEnteredDataIsCorrect(fulfillMsgList)) { // 전체 입력 form이 올바르게 입력되었다면
        e.preventDefault();
        processSignUp();
    } else { // 전체 입력 form이 올바르게 입력되지 않았다면
        // modal을 사용하여 입력하라 알려줌
        alertInputCorrectly(fulfillMsgList)
    }
}

const loginFormLoginHandler = (e) => {
    e.preventDefault();
    processLogin();
}

const loginFormSignUpHandler = () => {
    visualize("wrap_sign_up_modal");
}

const signUpModalExitBtnHandler = () => {
    nonVisualize("wrap_sign_up_modal");
}

const injectEventListener = (classObjs) => {
    const classes = ["id", "pass", "pass_check", "name", "birthday_year", "birthday_month",
                "birthday_month", "birthday_day", "gender", "gender", "email", "tel",
                "input_interest", "interest", "terms_window_guide_detail",
                "terms_agree_string", "terms_window_exit_btn", "reset_btn", "sign_up_btn",
                "login_form_login_btn", "login_form_sign_up_btn", "sign_up_modal_exit_btn"]
    const condition = ["keyup", "keyup", "keyup", "keyup", "keyup", "change", "keyup", "keyup",
                "keyup", "change", "keyup", "keyup", "click", "keyup", "scroll", "click", "click",
                "click", "click", "click", "click", "click"];
    const handlers = [idHandler, passHandler, passCheckHandler, nameHandler, birthHandler, birthHandler,
                birthHandler, birthHandler, genderHandler, genderHandler, emailHandler, telHandler,
                interestFocusHandler, interestHandler, termsScrollHandler, termsHandler, termsWindowExitHandler,
                resetBtnHandler, signUpBtnHandler, loginFormLoginHandler, loginFormSignUpHandler, signUpModalExitBtnHandler];

    classes.forEach((classs, idx) => {
        classObjs[classs].addEventListener(condition[idx], handlers[idx]);
    });
}

let classObjs = {};

const init = async() => {
    const [LOGIN, CLASS_OBJ] = [0, 1];
    const result = await isLoggedInCookie(classObjs);
    if (!result[LOGIN]) {
        classObjs = result[CLASS_OBJ];
        injectFocusEvent();
        injectEventListener(classObjs);
    }
}

init();