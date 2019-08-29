const classObjs = {};

const getClasses = () => {
    const idArray = ["id", "msg_id", "pass", "msg_pass", "pass_check", "msg_pass_check", 
        "name", "msg_name", "birthday_year", "msg_birthday", "birthday_month", "birthday_day", 
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

const checkLength = (str, min, max) => {
    return min <= str.length && str.length <= max;
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
    idMsg.innerText = checkId(idValue, idMsg);
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
    passMsg.innerText = checkPass(passValue, passMsg);
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
    passCheckMsg.innerText = checkPassCheck(passValue, passCheckValue, passCheckMsg);
}

const init = () => {
    getClasses();
    // console.log(classObjs);
    classObjs["id"].addEventListener("keyup", idHandler);
    classObjs["pass"].addEventListener("keyup", passHandler);
    classObjs["pass_check"].addEventListener("keyup", passCheckHandler);
}

init();