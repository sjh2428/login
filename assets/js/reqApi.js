import render from "./render";
import util from "./util";

const api = {
    isLoggedInCookie() {
        fetch("/isAliveSession", {
            'Content-Type': 'application/x-www-form-urlencoded',
            method: "GET"
        }).then(res => res.json().then(res => {
            if (res.login) {
                this.renderHomePage(res.userData);
            }
        }));
    },
    processLogin() {
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
                this.renderHomePage(res.userData);
            }
        }));
    },
    processSignUp() {
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
        const interests = util.getInterests(interestsLi);
    
        fetch("/sign-up", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "POST",
            body: `id=${id}&pwd=${pass}&name=${name}&birthYear=${birthday_year}
                    &birthMonth=${birthday_month}&birthDay=${birthday_day}&gender=${gender}
                    &email=${email}&tel=${tel}&interests=${interests}`
        }).then(res => res.json().then(res => {
            console.log(res.result);
        }));
    },
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
    renderHomePage(info) {
        render.renderHomePage(info);
        document.querySelector(".wrap_home_logout_btn").addEventListener("click", this.logoutHandler);
    },
    logoutHandler() {
        render.renderLoginPage();
        document.cookie = "sessionId=oiq22oei2jeo938rej23orj928hr2o3ih";
        util.injectFocusEvent();
        util.injectEventListener();
    }
}

export default api