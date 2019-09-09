import util from "./util";

const api = {
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
        }).then(_ => {
            location.reload();
        });
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
    }
}

export default api