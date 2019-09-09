import util from "./util";

const renderHomePage = (info) => {
    if (info) {
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
        util.injectEventListener();
        util.injectFocusEvent();
    }
}

renderHomePage();

export default renderHomePage