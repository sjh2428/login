import condition from "./condition";
import util from "./util";

const check = {
    checkIdDuplicate(id) {
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
    },
    async checkId(idValue, msgClass) {
        let regex;
        let msgString = "";
        if (!condition.checkBound(idValue.length, 5, 20)) {
            msgString = "5자 이상 20자 이하로 입력해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        regex = /^[a-z0-9-_]+$/;
        if (!condition.checkRegex(idValue, regex)) {
            msgString = "영문 소문자, 숫자와 특수기호(_)(-) 만 사용 가능합니다.";
            return condition.failedToCondition(msgClass, msgString);
        }
        if (await check.checkIdDuplicate(idValue)) {
            msgString = "중복된 아이디입니다.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "사용 가능한 아이디입니다.";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkPass(passValue, msgClass) {
        let regex;
        let msgString = "";
        if (!condition.checkBound(passValue.length, 8, 16)) {
            msgString = "8자 이상 16자 이하로 입력해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        regex = /^.*[A-Z].*$/;
        if (!condition.checkRegex(passValue, regex)) {
            msgString = "영문 대문자를 최소 1자 이상 포함해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        regex = /^.*[0-9].*$/;
        if (!condition.checkRegex(passValue, regex)) {
            msgString = "숫자를 최소 1자 이상 포함해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        regex = /^.*[`~!@#$%^&*()\-_+=[{\]}\\|;:'",<\.>/?].*$/;
        if (!condition.checkRegex(passValue, regex)) {
            msgString = "특수문자를 최소 1자 이상 포함해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "안전한 비밀번호입니다.";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkPassCheck(passValue, passCheckValue, msgClass) {
        let msgString = "";
        if (!condition.checkBound(passCheckValue.length, 8, 16)) {
            msgString = "8자 이상 16자 이하로 입력해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        if (!condition.checkIsEqual(passValue, passCheckValue)) {
            msgString = "비밀번호가 일치하지 않습니다.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "비밀번호가 일치합니다.";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkName(nameValue, msgClass) {
        let msgString = "";
        if (!condition.checkIsMore(nameValue.length, 1)) {
            msgString = "2글자 이상의 이름을 입력해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "&nbsp;";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkBirthYear(yearValue, msgClass) {
        let msgString = "";
        const nowYear = new Date().getFullYear();
        const lowerBound = nowYear - 99;
        const upperBound = nowYear - 14;
        if (condition.checkIsNaN(Number(yearValue)) || !condition.checkIsEqual(yearValue.length, 4)) {
            msgString = "태어난 년도 4자리를 정확하게 입력하세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        yearValue = Number(yearValue);
        if (!condition.checkBound(yearValue, lowerBound, upperBound)) {
            msgString = "만 14세 이상 만 99세 이하만 가입 가능합니다.";
            return condition.failedToCondition(msgClass, msgString);
        }
        return true;
    },
    checkBirthMonth(monthValue, msgClass) {
        if (condition.checkIsNaN(Number(monthValue))) {
            const msgString = "태어난 월을 선택해주세요";
            return condition.failedToCondition(msgClass, msgString);
        }
        return true;
    },
    checkBirthDay(yearValue, monthValue, dayValue, msgClass) {
        dayValue = Number(dayValue);
        const lastDay = util.getLastDay(yearValue, monthValue);
        if (condition.checkIsNaN(dayValue) || !condition.checkBound(dayValue, 1, lastDay)) {
            const msgString = `태어난 날짜를 다시 확인해주세요. ${yearValue}년 ${monthValue}월은 1일부터 ${lastDay}까지 존재합니다.`;
            return condition.failedToCondition(msgClass, msgString);
        }
        return true;
    },
    checkBirth(yearValue, monthValue, dayValue, msgClass) {
        if (check.checkBirthYear(yearValue, msgClass) && check.checkBirthMonth(monthValue, msgClass)
                && check.checkBirthDay(yearValue, monthValue, dayValue, msgClass)) {
            const msgString = "&nbsp;"
            return condition.meetAllConditions(msgClass, msgString);
        }
        return false;
    },
    checkGender(genderValue, msgClass) {
        let msgString = "";
        if (condition.checkIsEqual(genderValue, "gender")) {
            msgString = "성별을 선택해주세요";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "&nbsp;";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkEmail(emailValue, msgClass) {
        let msgString = "";
        const regex = /^[A-Za-z0-9]([-_\.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        if (!condition.checkRegex(emailValue, regex)) {
            msgString = "이메일 주소를 다시 확인해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "&nbsp;";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkTel(telValue, msgClass) {
        let msgString = "";
        const regex = /^010[0-9]{7,8}$/;
        if (!condition.checkRegex(telValue, regex)) {
            msgString = "형식에 맞지 않는 번호입니다.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "&nbsp;";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkInterest(interestsCnt, msgClass) {
        let msgString = "";
        if (!condition.checkIsMore(interestsCnt, 2)) {
            msgString = "3개 이상의 관심사를 입력하세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "&nbsp;";
        return condition.meetAllConditions(msgClass, msgString);
    },
    checkTerms(msgClass, termsCheckBox) {
        let msgString = "";
        if (condition.checkIsEqual(termsCheckBox, false)) {
            msgString = "약관에 동의해주세요.";
            return condition.failedToCondition(msgClass, msgString);
        }
        msgString = "&nbsp;";
        return condition.meetAllConditions(msgClass, msgString);
    }
}

export default check