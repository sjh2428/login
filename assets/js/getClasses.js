const getClasses = {
    classNamesInLogin: ["wrap_sign_up_modal", "sign_up_form", "id", "msg_id", "pass", "msg_pass", "pass_check", "msg_pass_check", 
        "name", "msg_name", "birthday_year", "birthday_month", "birthday_day", "msg_birthday",
        "gender", "msg_gender", "email", "msg_email", "tel", "msg_tel", "interest", "ul_interests", "input_interest",
        "msg_interest", "interest_del_btn", "reset_btn", "sign_up_btn", "sign_up_modal_exit_btn", "terms_window_guide_detail",
        "terms_window", "terms_window_exit_btn", "terms_window_agree_btn", "terms_check", "terms_agree_string", "msg_terms",
        "wrap_modal", "modal_content", "modal_ok_btn", "modal_cancel_btn", "modal_string",
        "login_form_sign_up_btn", "login_form_login_btn"
    ],
    getAllData() {
        const classObjs = {};
        this.classNamesInLogin.forEach(className => {
            classObjs[className] = document.querySelector(`.${className}`);
            if (className.includes("msg")) {
                classObjs[className].classList.add("err_msg");
            }
        });
        return classObjs;
    }
}

export default getClasses