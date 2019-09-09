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
                // this.renderHomePage(res.userData);
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
        let interestHtml = "";
        info.interests.forEach((interest, idx) => {
            interestHtml += `${idx + 1}. ${interest} `;
        });
        interestHtml = interestHtml.slice(0, -1);

        let html = "<div class='wrap_home'>" +
        `<header class='home_header'>${info.name}님의 회원정보</header>` + 
        `<section class='wrap_home_content'>` + 
        `<div class='wrap_home_birth_year home_content'>생년월일: ${info.birthYear}년 ${info.birthMonth}월 ${info.birthDay}일</div>` + 
        `<div class='wrap_home_email home_content'>이메일: ${info.email}</div>` + 
        `<div class='wrap_home_gender home_content'>성별: ${info.gender}</div>` + 
        `<div class='wrap_home_interests home_content'>관심사: ${interestHtml}</div>` + 
        `<div class='wrap_home_tel home_content'>휴대전화: ${info.tel}</div>` + 
        `<div class='wrap_home_logout_btn'>로그아웃</div>` + 
        `</section>` +
        "</div>";
        document.getElementById("content").innerHTML = html;
        document.querySelector(".wrap_home_logout_btn").addEventListener("click", () => {
            console.log(document.cookie);
            init();
        });
    }
}

export default api