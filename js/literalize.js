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
    checkPassCondition(condition, passMsg) {
        if (condition) {
            this.msgString = passMsg;
            return Condition.meetAllConditions(this.msgClass, this.msgString);
        }
        return false;
    },
    checkFailCondition(condition, errMsg) {
        if (condition) {
            this.msgString = errMsg;
            return Condition.failedToCondition(this.msgClass, this.msgString);
        }
        return true;
    },
    checkRegex(regex, errMsg) {
        return this.checkFailCondition(!this.valueForCheck.match(regex), errMsg);
    },
    checkLength(min, max, errMsg = `${min}자 이상 ${max}자 이하로 입력해 주세요.`, val = this.valueForCheck.length) {
        return this.checkFailCondition(!this.checkBound(val, min, max), errMsg);
    },
    checkIsEqual(a, b, errMsg) {
        return this.checkFailCondition(a !== b, errMsg);
    },
    checkMoreThan(num, errMsg) { // num 이상인 경우
        return this.checkFailCondition(!this.valueForCheck >= num, num + errMsg);
    },
    checkCheckBox(errMsg) {
        return this.checkFailCondition(!this.valueForCheck.checked, errMsg);
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
        const lowerBound = nowYear - 14;
        const upperBound = lowerBound + 99;
        const birthYearStrCntErrMsg = "태어난 년도 4자리를 정확하게 입력하세요.";
        const ageErrMsg = "만 14세 이상 만 99세 이하만 가입 가능합니다.";
        const condition = this.checkValueIsNotNumber(Number(yearValue), birthYearStrCntErrMsg) &&
                            this.checkIsEqual(yearValue.length, 4, birthYearStrCntErrMsg) &&
                            this.checkLength(lowerBound, upperBound, ageErrMsg, Number(yearValue));
        // yearValue가 숫자인지 && 4자리가 입력되었는지 && 만 14세 이상 만 99세 이하인지
        return this.checkPassCondition(condition, "&nbsp;");
    },
    checkBirthMonth(monthValue) {
        const monthErrMsg = "태어난 월을 선택해주세요.";
        return this.checkPassCondition(this.checkValueIsNotNumber(Number(monthValue), monthErrMsg), "&nbsp;");
    },
    checkBirthDay(yearValue, monthValue, dayValue) {
        dayValue = Number(dayValue);
        const lastDay = getLastDay(Number(yearValue), Number(monthValue));
        const dayErrMsg = `태어난 날짜를 다시 확인해주세요. ${yearValue}년 ${monthValue}월은 1일부터 ${lastDay}까지 존재합니다.`;
        const condition = this.checkValueIsNotNumber(dayValue, dayErrMsg) && this.checkLength(dayValue, 1, lastDay);
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
        return this.checkPassCondition(this.checkIsEqual(this.valueForCheck, "성별", genderErrMsg), "&nbsp;");
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
        return this.checkPassCondition(this.checkCheckBox(), termsCheckErrMsg);
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