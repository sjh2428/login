import render from "./render";
import getClasses from "./getClasses";
import uuidv1 from "uuid/v1";

/**
 * 쿠키값을 서버로 보내서 현재 세션에 등록되어있는 uuid인지 체크 후 로그인 여부에 따라 홈페이지나
 * 로그인페이지를 렌더링 후 로그인 여부와 해당 유저의 정보를 배열로 return
 * 
 * @returns {Array} [로그인 여부, 해당 유저의 정보]
 */
const isLoggedInCookie = async() => {
    return await fetch("/isAliveSession", {
        'Content-Type': 'application/x-www-form-urlencoded',
        method: "GET"
    }).then(res => res.json().then(res => {
        if (res.login) {
            renderHomePage(res.userData);
            return [res.login, undefined];
        } else {
            renderLoginPage();
            return [res.login, getClasses.getAllData()];
        }
    }));
}

/**
 * 로그인 요청을 보낸 후 유효한 아이디와 비밀번호라면 홈페이지를 렌더링
 */
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

/**
 * 모달을 띄워 올바르게 입력해달라는 메세지를 보여준다
 * 
 * @param {Array} fulfillMsgList 채우거나 확인해야하는 input에 따른 메세지 String Array
 */
const alertInputCorrectly = (fulfillMsgList) => {
    nonVisualize("modal_cancel_btn")
    resizeWidth("modal_ok_btn", "100%");
    visualize("wrap_modal");
    classObjs["modal_string"].innerHTML = makeFulfillMsg(fulfillMsgList);
    resizeHeight("modal_content", `${200 + ((fulfillMsgList.length - 1) * 25)}px`);
    classObjs["modal_ok_btn"].addEventListener("click", fulfillModalOkBtnHandler);
}

/**
 * interests를 Array type으로 받아서 comma(,)를 구분으로 하여 String으로 return
 * ['asda', 'qewr'] => "asda,qewr"
 * 
 * @param {Array} interestsLi Array of interests
 * @returns {String} Array to String with comma(,)
 */
const getInterests = (interestsLi) => {
    let interests = "";
    interestsLi.forEach(li => {
        interests += li.childNodes[0].nodeValue + ",";
    });
    interests = interests.slice(0, -1);
    return interests;
}

/**
 * 회원가입창에 입력된 input, select의 각 value를 서버로 전송하여 회원가입을 진행
 */
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

/**
 * 회원의 정보를 가지고 홈페이지 렌더링
 * 
 * @param {Object} info 홈페이지에 표시될 회원의 정보를 담은 Object
 */
const renderHomePage = (info) => {
    render.renderHomePage(info);
    document.querySelector(".wrap_home_logout_btn").addEventListener("click", logoutHandler);
}

/**
 * 로그인 페이지 렌더링
 */
const renderLoginPage = () => {
    render.renderLoginPage();
}

/**
 * 로그아웃 진행시 cookie에 새로운 uuid를 할당하고, init함수 실행
 */
const logoutHandler = () => {
    document.cookie = `sessionId=${uuidv1()}`;
    init();
}

/**
 * 관심사 입력부분에 focus해줌
 */
const interestFocusHandler = () => {
    classObjs["interest"].focus();
}

/**
 * target의 border color를 #56C151 색으로 변경
 * 
 * @param {Object} e event객체
 */
const focusHandler = (e) => {
    e.target.parentNode.style = "border-color: #56C151;";
}

/**
 * target의 border color를 #DADADA 색으로 변경
 * 
 * @param {Object} e event객체
 */
const focusOutHandler = (e) => {
    e.target.parentNode.style = "border-color: #DADADA;";
}

/**
 * Array로 받은 tag에게 focus, focusout event를 달아줌
 * 
 * @param {Array} tagArray Array of input tag
 */
const injectFocusEventToTagArray = (tagArray) => {
    tagArray.forEach(tag => {
        tag.addEventListener("focus", focusHandler);
        tag.addEventListener("focusout", focusOutHandler);
    });
}

/**
 * terms_check를 제외한 input tag와 select태그를 모두 가져와
 * 각각에게 injectFocusEventToTagArray함수 실행
 */
const injectFocusEvent = () => {
    // 약관의 체크박스를 제외한 전체 input tags
    const inputTags = document.querySelectorAll("input:not(.terms_check)");
    const selectTags = document.querySelectorAll("select");
    injectFocusEventToTagArray(inputTags);
    injectFocusEventToTagArray(selectTags);
}

/**
 * value가 lower와 upper 사이에 있는지 check
 * 
 * @param {Number} val 
 * @param {Number} min 
 * @param {Number} max 
 * @returns {Boolean} min < value < max
 */
const checkBound = (val, min, max) => {
    return min <= val && val <= max;
}

/**
 * from_msg가 있다면 to_msg로 바꿔줌
 * 
 * @param {*} msgClass 
 * @param {*} from 
 * @param {*} to 
 * @param {*} msgString 
 */
const changeMsg = (msgClass, from, to, msgString) => {
    if (msgClass.classList.contains(from)) {
        msgClass.classList.replace(from, to);
    }
    msgClass.innerHTML = msgString;
}

/**
 * 모든 조건을 만족하였을 때 err_msg 클래스가 있다면 pass_msg 클래스로 바꾸어줌
 * 
 * @param {Object} msgClass 
 * @param {String} msgString 
 * @returns {Boolean}
 */
const meetAllConditions = (msgClass, msgString) => {
    changeMsg(msgClass, "err_msg", "pass_msg", msgString);
    return true;
}

/**
 * 모든 조건을 만족하였을 때 pass_msg 클래스가 있다면 err_msg 클래스로 바꾸어줌
 * 
 * @param {Object} msgClass 
 * @param {String} msgString 
 * @return {Boolean}
 */
const failedToCondition = (msgClass, msgString) => {
    changeMsg(msgClass, "pass_msg", "err_msg", msgString);
    return false;
}

/**
 * 아이디를 서버로 전송하여 중복되는 아이디인지 Boolean type으로 return
 * 
 * @param {String} id 
 * @returns {Boolean}
 */
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

/**
 * ID input값에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
const checkId = async() => {
    let regex;
    let msgString = "";
    const idValue = classObjs["id"].value;
    const msgClass = classObjs["msg_id"];
    if (!checkBound(idValue.length, 5, 20)) {
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

/**
 * id input handler
 */
const idHandler = () => {
    checkId();
}

/**
 * PASSWORD input값에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
const checkPass = () => {
    let regex;
    let msgString = "";
    const passValue = classObjs["pass"].value;
    const msgClass = classObjs["msg_pass"];
    if (!checkBound(passValue.length, 8, 16)) {
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

/**
 * password input handler
 */
const passHandler = () => {
    checkPass();
}

/**
 * password 재확인 input에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
const checkPassCheck = () => {
    let msgString = "";
    const passValue = classObjs["pass"].value;
    const passCheckValue = classObjs["pass_check"].value;
    const msgClass = classObjs["msg_pass_check"];
    if (!checkBound(passCheckValue.length, 8, 16)) {
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

/**
 * password 재확인 handler
 */
const passCheckHandler = () => {
    checkPassCheck();
}

/**
 * 해당 년도, 달의 마지막 날짜를 getDate()로 return
 * 
 * @param {String} yearValue 
 * @param {String} monthValue 
 * @returns {Number} Date.getDate()
 */
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

/**
 * 이름에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
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

/**
 * name input handler
 */
const nameHandler = () => {
    checkName();
}

/**
 * 태어난 년도에 대하여 유효성 검사
 * 
 * @param {String} yearValue 
 * @param {Object} msgClass 
 * @returns {Boolean}
 */
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

/**
 * 태어난 월에 대하여 유효성 검사
 * 
 * @param {String} monthValue 
 * @param {Object} msgClass 
 * @returns {Boolean}
 */
const checkBirthMonth = (monthValue, msgClass) => {
    monthValue = Number(monthValue);
    if (isNaN(monthValue)) {
        const msgString = "태어난 월을 선택해주세요";
        return failedToCondition(msgClass, msgString);
    }
    return true;
}

/**
 * 태어난 날에 대하여 유효성 검사
 * 
 * @param {String} yearValue 
 * @param {String} monthValue 
 * @param {String} dayValue 
 * @param {Object} msgClass 
 * @returns {Boolean}
 */
const checkBirthDay = (yearValue, monthValue, dayValue, msgClass) => {
    dayValue = Number(dayValue);
    const lastDay = getLastDay(yearValue, monthValue);
    if (isNaN(dayValue) || !checkBound(dayValue, 1, lastDay)) {
        const msgString = `태어난 날짜를 다시 확인해주세요. ${yearValue}년 ${monthValue}월은 1일부터 ${lastDay}까지 존재합니다.`;
        return failedToCondition(msgClass, msgString);
    }
    return true;
}

/**
 * 생일에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
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

/**
 * 생일 input handler
 */
const birthHandler = () => {
    checkBirth();
}

/**
 * 성별에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
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

/**
 * 생일 input handler
 */
const genderHandler = () => {
    checkGender();
}

/**
 * 이메일에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
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

/**
 * 이메일 input handler
 */
const emailHandler = () => {
    checkEmail();
}

/**
 * 핸드폰번호에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
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

/**
 * tel input handler
 */
const telHandler = () => {
    checkTel();
}

/**
 * 마지막 interest를 삭제하고 편집 하게 해줌
 * 
 * @param {Object} e interest input object
 */
const lastInterestEdit = (e) => {
    const interestUl = classObjs["ul_interests"];
    const lastInterest = interestUl.lastElementChild;
    if (lastInterest) { // interest ul의 마지막 node가 존재한다면
        const lastInterestText = lastInterest.childNodes[0].nodeValue;
        e.target.value = lastInterestText;
        lastInterest.remove();
    }
}

/**
 * 입력한 키가 Backspace인지 return
 * 
 * @param {Object} e 
 * @returns {Boolean}
 */
const inputKeyIsBackspace = (e) => {
    return e.key === "Backspace";
}

/**
 * 타겟의 value가 비어있는지 return
 * 
 * @param {Object} e 
 * @returns {Boolean}
 */
const valueIsEmpty = (e) => {
    return e.target.value === "";
}

/**
 * 입력한 값이 comma(,)인지 return
 * 
 * @param {Object} e 
 * @returns {Boolean}
 */
const lastInputIsComma = (e) => {
    return e.key === ",";
}

/**
 * str로 입력받아 li node로 만들어 return
 * 
 * @param {String} str 
 * @returns {Object} li node
 */
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

/**
 * input에 입력한 interest를 ul node에 붙여줌
 * 
 * @param {Object} e 
 */
const appendInterest = (e) => {
    const inputValue = e.target.value.trim().slice(0, -1);
    if (inputValue.length > 0 && !inputValue.includes(",")) {
        const interestUl = classObjs["ul_interests"];
        interestUl.appendChild(getInterestNode(inputValue));
    }
    e.target.value = "";
}

/**
 * interest에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
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

/**
 * interest input handler
 * 
 * @param {Object} e 
 */
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

/**
 * interest delete handler
 * 
 * @param {Object} e 
 */
const interestDelHandler = (e) => {
    e.target.parentNode.remove();
    checkInterest();
}

/**
 * terms에 동의하였는지 return
 * 
 * @returns {Boolean}
 */
const notAgreedTerms = () => {
    return classObjs["terms_check"].checked === false;
}

/**
 * terms에 대하여 유효성 검사
 * 
 * @returns {Boolean}
 */
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

/**
 * className에 해당하는 class의 display를 displayValue로 변경
 * 
 * @param {Object} className 
 * @param {String} displayValue 
 */
const visualize = (className, displayValue = "flex") => {
    classObjs[className].style.display = displayValue;
}

/**
 * className에 해당하는 class의 display를 none으로 변경
 * 
 * @param {Object} className 
 */
const nonVisualize = (className) => {
    classObjs[className].style.display = "none";
}

/**
 * className에 해당하는 class의 width를 size값으로 변경
 * 
 * @param {String} className 
 * @param {String} size 
 */
const resizeWidth = (className, size) => {
    classObjs[className].style.width = size;
}

/**
 * className에 해당하는 class의 height을 size값으로 변경
 * 
 * @param {String} className 
 * @param {String} size 
 */
const resizeHeight = (className, size) => {
    classObjs[className].style.height = size;
}

/**
 * className에 해당하는 class의 backgroundColor를 color값으로 변경
 * 
 * @param {String} className 
 * @param {String} color 
 */
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