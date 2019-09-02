const Classes = {
    classNames: [
        "wrap_sign_up_modal", "sign_up_form", "id", "msg_id", "pass", "msg_pass", "pass_check", "msg_pass_check", 
        "name", "msg_name", "birthday_year", "birthday_month", "birthday_day", "msg_birthday",
        "gender", "msg_gender", "email", "msg_email", "tel", "msg_tel", "interest", "ul_interests", "input_interest",
        "msg_interest", "interest_del_btn", "reset_btn", "sign_up_btn", "sign_up_modal_exit_btn",
        "terms_window", "terms_window_exit_btn", "terms_window_agree_btn", "terms_check", "terms_agree_string", "msg_terms",
        "wrap_modal", "modal_content", "modal_ok_btn", "modal_cancel_btn", "modal_string",
        "login_form_sign_up_btn", "login_form_login_btn"
    ],
    get getClasses() {
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

const classObjs = Classes.getClasses;

const Check = {
    msgString: "",
    msgClass: "",
    valueForCheck: "",
    checkBound(val, min, max) {
        return min <= val && val <= max;
    },
    checkCondition(condition, errMsg) {
        if (condition) {
            this.msgString = errMsg;
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        return true;
    },
    checkRegex(regex, errMsg) {
        return this.checkCondition(!this.valueForCheck.match(regex), errMsg);
    },
    checkLength(min, max) {
        return this.checkCondition(!this.checkBound(this.valueForCheck.length, min, max), errMsg);
    },
    checkIsEqual(a, b, errMsg) {
        return this.checkCondition(!a === b, errMsg);
    },
    checkMoreThan(num, errMsg) { // num 이상인 경우
        
        if (!this.valueForCheck >= num) {
            this.msgString = num + errMsg;
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        return true;
    },
    checkCheckBox(errMsg) {
        if (!this.valueForCheck.checked) {
            this.msgString = errMsg;
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        return true;
    },
    checkId() {
        const idRegex = /^[a-z0-9-_]+$/;
        const idErrMsg = "영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
        this.valueForCheck = classObjs["id"].value;
        this.msgClass = classObjs["msg_id"];
        if (this.checkLength(5, 20) && this.checkRegex(idRegex, idErrMsg)) {
            this.msgString = "사용 가능한 아이디입니다.";
            return Condition.meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkPass() {
        const [upperRegex, upperErrMsg] = [/^.*[A-Z].*$/, "영문 대문자를 최소 1자 이상 포함해주세요."];
        const [numRegex, numErrMsg] = [/^.*[0-9].*$/, "숫자를 최소 1자 이상 포함해주세요."];
        const specialCharRegex = /^.*[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<\.>/?].*$/;
        const specialCharErrMsg = "특수문자를 최소 1자 이상 포함해주세요.";
        this.valueForCheck = classObjs["pass"].value;
        this.msgClass = classObjs["msg_pass"];
        if (this.checkLength(8, 16) && this.checkRegex(upperRegex, upperErrMsg) &&
                this.checkRegex(numRegex, numErrMsg) && this.checkRegex(specialCharRegex, specialCharErrMsg)) {
            this.msgString = "안전한 비밀번호입니다.";
            return Condition.meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkPassCheck() {
        const passValue = classObjs["pass"].value;
        const passCheckErrMsg = "비밀번호가 일치하지 않습니다.";
        this.valueForCheck = classObjs["pass_check"].value;
        this.msgClass = classObjs["msg_pass_check"];
        if (this.checkLength(8, 16) && this.checkIsEqual(passValue, this.valueForCheck, passCheckErrMsg)) {
            this.msgString = "비밀번호가 일치합니다.";
            return meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkName() {
        const nameErrMsg = "글자 이상 입력해주세요.";
        this.valueForCheck = classObjs["name"].value.length;
        this.msgClass = classObjs["msg_name"];
        if (this.checkMoreThan(2, nameErrMsg)) {
            this.msgString = "&nbsp;";
            return meetAllConditions(msgClass, msgString);
        }
        return false;
    },
    checkBirthYear(yearValue) {
        const nowYear = new Date().getFullYear();
        const lowerBound = nowYear - 14;
        const upperBound = lowerBound + 99;
        if (isNaN(Number(yearValue)) || yearValue.length !== 4) {
            this.msgString = "태어난 년도 4자리를 정확하게 입력하세요.";
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        yearValue = Number(yearValue);
        if (checkBound(yearValue, lowerBound, upperBound)) {
            this.msgString = "만 14세 이상 만 99세 이하만 가입 가능합니다.";
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        return true;
    },
    checkBirthMonth(monthValue) {
        monthValue = Number(monthValue);
        if (isNaN(monthValue)) {
            this.msgString = "태어난 월을 선택해주세요";
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        return true;
    },
    checkBirthDay = (yearValue, monthValue, dayValue) => {
        dayValue = Number(dayValue);
        const lastDay = getLastDay(yearValue, monthValue);
        if (isNaN(dayValue) || !checkBound(dayValue, 1, lastDay)) {
            this.msgString = `태어난 날짜를 다시 확인해주세요. ${yearValue}년 ${monthValue}월은 1일부터 ${lastDay}까지 존재합니다.`;
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        return true;
    },
    checkBirth() {
        const yearValue = classObjs["birthday_year"].value;
        const monthValue = classObjs["birthday_month"].value;
        const dayValue = classObjs["birthday_day"].value;
        this.msgClass = classObjs["msg_birthday"];
        if (checkBirthYear(yearValue) && checkBirthMonth(monthValue)
                && checkBirthDay(yearValue, monthValue, dayValue)) {
            this.msgString = "&nbsp;"
            return Condition.meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkGender() {
        const genderErrMsg = "성별을 선택해주세요";
        this.valueForCheck = classObjs["gender"].value;
        this.msgClass = classObjs["msg_gender"];
        if (this.checkIsEqual(this.valueForCheck, "성별", genderErrMsg)) {
            this.msgString = "&nbsp;";
            return Condition.meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkEmail() {
        const emailRegex = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        const emailErrMsg = "이메일 주소를 다시 확인해주세요.";
        this.valueForCheck = classObjs["email"].value;
        this.msgClass = classObjs["msg_email"];
        if (this.checkRegex(emailRegex, emailErrMsg)) {
            this.msgString = "&nbsp;";
            return meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkTel() {
        const telRegex = /^010[0-9]{7,8}$/;
        const telErrMsg = "형식에 맞지 않는 번호입니다.";
        this.valueForCheck = classObjs["tel"].value;
        this.msgClass = classObjs["msg_tel"];
        if (this.checkRegex(telRegex, telErrMsg)) {
            this.msgString = "&nbsp;";
            return meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkInterest() {
        const interestErrMsg = "개 이상의 관심사를 입력하세요.";
        this.valueForCheck = classObjs["ul_interests"].childNodes.length;
        this.msgClass = classObjs["msg_interest"];
        if (this.checkMoreThan(3, interestErrMsg)) {
            msgString = "&nbsp;";
            return meetAllConditions(msgClass, msgString);
        }
        return false;
    },
    checkTerms() {
        const msgClass = classObjs["msg_terms"];
        if (notAgreedTerms()) {
            msgString = "약관에 동의해주세요.";
            return failedToCondition(msgClass, msgString);
        }
        msgString = "&nbsp;";
        return meetAllConditions(msgClass, msgString);
    }    
}

const Condition = {
    meetAllConditions(msgClass, msgString) {
        Message.changeMsg(msgClass, "err_msg", "pass_msg", msgString);
        return true;
    },
    failedToCondition(msgClass, msgString) {
        Message.changeMsg(msgClass, "pass_msg", "err_msg", msgString);
        return false;
    }
}

const Event = {
    
}

const Message = {
    changeMsg(msgClass, from, to, msgString) {
        if (msgClass.classList.contains(from)) {
            msgClass.classList.replace(from, to);
        }
        msgClass.innerHTML = msgString;
    }
}

const Modal = {

}

console.log(classObjs2);