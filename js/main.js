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

const changeMsgClass = (msgClass, from, to) => {
    if (msgClass.classList.contains(from)) {
        msgClass.classList.replace(from, to);
    }
}

const checkId = (str) => {
    const regex = /^[a-z0-9-_]+$/;
    return str.match(regex);
}

const idHandler = () => {
    const idValue = classObjs["id"].value;
    const idMsg = classObjs["msg_id"];
    if (checkLength(idValue, 5, 20) && checkId(idValue)) {
        changeMsgClass(idMsg, "err_msg", "pass_msg");
        idMsg.innerText = "사용 가능한 아이디입니다.";
    } else {
        changeMsgClass(idMsg, "pass_msg", "err_msg");
        idMsg.innerText = "5~20자의 영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
    }
}

const init = () => {
    getClasses();
    console.log(classObjs);
    classObjs["id"].addEventListener("keyup", idHandler);
}

init();