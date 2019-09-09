const util = {
    getLastDay(yearValue, monthValue) {
        yearValue = Number(yearValue);
        monthValue = Number(monthValue);
        let dateObjForLastDay;
        if (monthValue === 12) {
            dateObjForLastDay = new Date(new Date(`${yearValue + 1}-01-01 00:00:00`).getTime() - 1);
        } else {
            dateObjForLastDay = new Date(new Date(`${yearValue}-${monthValue + 1}-01 00:00:00`).getTime() - 1);
        }
        return dateObjForLastDay.getDate();
    },
    inputKeyIsBackspace(key) {
        return key === "Backspace";
    },
    valueIsEmpty(value) {
        return value === "";
    },
    lastInputIsComma(key) {
        return key === ",";
    },
    createFulfillMsgList() {
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
    },
    allEnteredDataIsCorrect(fulfillMsgList) {
        return fulfillMsgList.length === 0;
    },
    getInterests(interestsLi) {
        let interests = "";
        interestsLi.forEach(li => {
            interests += li.childNodes[0].nodeValue + ",";
        });
        interests = interests.slice(0, -1);
        return interests;
    }
}

export default util