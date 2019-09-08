import classObjs from "./getClasses";
import eventHandler from "./eventHandler";
import message from "./message";
import util from "./util";

const view = {
    appendInterest(e) {
        const inputValue = e.target.value.trim().slice(0, -1);
        if (inputValue.length > 0 && !inputValue.includes(",")) {
            const interestUl = classObjs["ul_interests"];
            interestUl.appendChild(view.getInterestNode(inputValue));
        }
        e.target.value = "";
    },
    lastInterestEdit(e) {
        const interestUl = classObjs["ul_interests"];
        const lastInterest = interestUl.lastElementChild;
        if (lastInterest) { // interest ul의 마지막 node가 존재한다면
            const lastInterestText = lastInterest.childNodes[0].nodeValue;
            e.target.value = lastInterestText;
            lastInterest.remove();
        }
    },
    getInterestNode(str) {
        const interestLi = document.createElement("li");
        const interestText = document.createTextNode(str);
        const delBtn = document.createElement("button");
        const delText = document.createTextNode("X");
        interestLi.classList.add("li_interest");
        delBtn.classList.add("interest_del_btn");
        delBtn.appendChild(delText);
        delBtn.addEventListener("click", eventHandler.interestDelHandler);
        interestLi.appendChild(interestText);
        interestLi.appendChild(delBtn);
        return interestLi;
    },
    visualize(className, displayValue = "flex") {
        classObjs[className].style.display = displayValue;
    },
    nonVisualize(className) {
        classObjs[className].style.display = "none";
    },
    resizeWidth(className, size) {
        classObjs[className].style.width = size;
    },
    resizeHeight(className, size) {
        classObjs[className].style.height = size;
    },
    changeBackgroundColor(className, color) {
        classObjs[className].style.backgroundColor = color;
    },
    alertInputCorrectly(fulfillMsgList) {
        view.nonVisualize("modal_cancel_btn")
        view.resizeWidth("modal_ok_btn", "100%");
        view.visualize("wrap_modal");
        classObjs["modal_string"].innerHTML = util.makeFulfillMsg(fulfillMsgList);
        view.resizeHeight("modal_content", `${200 + ((fulfillMsgList.length - 1) * 25)}px`);
        classObjs["modal_ok_btn"].addEventListener("click", eventHandler.fulfillModalOkBtnHandler);
    },
    removeResetFeaturesInModal() {
        view.nonVisualize("wrap_modal");
        classObjs["modal_string"].innerHTML = "";
        classObjs["modal_ok_btn"].removeEventListener("click", eventHandler.resetOkBtnHandler);
        classObjs["modal_cancel_btn"].removeEventListener("click", eventHandler.resetCancelBtnHandler);
    },
    initializeAllMsgClass() {
        document.querySelectorAll(".msg").forEach(msgClass => {
            message.changeMsg(msgClass, "pass_msg", "err_msg", "&nbsp");
        });
    },
    initializeAllInputData() {
        classObjs["sign_up_form"].reset();
        classObjs["ul_interests"].innerHTML = "";
    }
}

export default view