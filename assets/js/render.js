const render = {
    renderLoginPage() {
        const html = '<div class="wrap_login">' +
            '<form class="ui form login_form">' +
                '<div class="field"><input type="text" name="login_id" placeholder="아이디"></div>' +
                '<div class="field"><input type="password" name="login_password" placeholder="비밀번호"></div>' +
                '<div class="field login_btns"><input class="login_form_login_btn" type="submit" value="로그인">' +
                    '<div class="login_form_sign_up_btn">회원가입</div>' +
                '</div>' +
            '</form>' +
        '</div>' +
        '<div class="wrap_sign_up_modal">' +
            '<div class="sign_up_content"><span class="sign_up_modal_exit_btn">❌</span>' +
                '<header>' +
                    '<div class="wrap_title wrap_label_input_msg">' +
                        '<h1 class="title">회원가입</h1>' +
                    '</div>' +
                '</header>' +
                '<section>' +
                    '<form class="sign_up_form" action="#">' +
                        '<div class="wrap_id wrap_label_input_msg"><label for="id">아이디</label>' +
                            '<div class="input_area input_id"><input class="id" type="text" name="id" maxlength="20"></div>' +
                            '<div class="msg msg_id">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_pass wrap_label_input_msg"><label for="pass">비밀번호</label>' +
                            '<div class="input_area input_pass"><input class="pass" type="password" name="pass" maxlength="16">' +
                            '</div>' +
                            '<div class="msg msg_pass">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_pass_check wrap_label_input_msg"><label for="pass_check">비밀번호 재확인</label>' +
                            '<div class="input_area input_pass_check">' +
                            '<input class="pass_check" type="password" name="pass_check" maxlength="16"></div>' +
                            '<div class="msg msg_pass_check">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_name wrap_label_input_msg"><label for="name">이름</label>' +
                            '<div class="input_area input_name"><input class="name" type="text" name="name"></div>' +
                            '<div class="msg msg_name">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_birthday wrap_label_input_msg"><label for="birthday">생년월일</label>' +
                            '<div class="birth_flex">' +
                                '<div class="input_area input_birthday_year">' +
                                    '<input class="birthday_year" type="text" name="birthday_year" placeholder="년(4자)" maxlength="4">' +
                                '</div>' +
                                '<div class="input_area input_birthday_month">' +
                                    '<select class="birthday_month" name="birthday_month">' +
                                        '<option value="월" selected disabled>월</option>' +
                                        '<option value="1">1</option>' +
                                        '<option value="2">2</option>' +
                                        '<option value="3">3</option>' +
                                        '<option value="4">4</option>' +
                                        '<option value="5">5</option>' +
                                        '<option value="6">6</option>' +
                                        '<option value="7">7</option>' +
                                        '<option value="8">8</option>' +
                                        '<option value="9">9</option>' +
                                        '<option value="10">10</option>' +
                                        '<option value="11">11</option>' +
                                        '<option value="12">12</option>' +
                                    '</select>' +
                                '</div>' +
                                '<div class="input_area input_birthday_day">' +
                                    '<input class="birthday_day" type="text" name="birthday_day" placeholder="일" maxlength="2">' +
                                '</div>' +
                            '</div>' +
                            '<div class="msg msg_birthday">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_gender wrap_label_input_msg"><label for="gender">성별</label>' +
                            '<div class="input_area input_gender"><select class="gender" name="gender">' +
                                    '<option value="gender" selected="" disabled="">성별</option>' +
                                    '<option value="man">남자</option>' +
                                    '<option value="woman">여자</option>' +
                                '</select>' +
                            '</div>' +
                            '<div class="msg msg_gender">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_email wrap_label_input_msg"><label for="email">이메일</label>' +
                            '<div class="input_area input_email">' +
                                '<input class="email" type="email" name="email"></div>' +
                            '<div class="msg msg_email">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_tel wrap_label_input_msg"><label for="tel">휴대전화</label>' +
                            '<div class="input_area input_tel">' +
                                '<input class="tel" type="tel" name="tel" placeholder="- 없이 입력해주세요. 예) 0101231234" maxlength="11"></div>' +
                            '<div class="msg msg_tel">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_interest wrap_label_input_msg"><label for="interest">관심사</label>' +
                            '<div class="input_area input_interest">' +
                                '<ul class="ul_interests"></ul>' +
                                '<input class="interest" type="text" name="interest" placeholder=",(comma)로 추가">' +
                            '</div>' +
                            '<div class="msg msg_interest">&nbsp;</div>' +
                        '</div>' +
                        '<div class="wrap_terms wrap_label_input_msg"><span class="terms_agree_string">약관에 동의합니다.</span>' +
                            '<input class="terms_check" type="checkbox" name="terms_check" disabled="">' +
                            '<div class="msg msg_terms">&nbsp;</div>' +
                        '</div>' +
                        '<div class="terms_window">' +
                            '<div class="wrap_terms_window"><span class="terms_window_exit_btn">X</span>' +
                                '<div class="terms_window_guide_wrap">' +
                                    '<div class="terms_window_guide_title">개인정보 수집 및 이용에 대한 안내</div>' +
                                    '<div class="terms_window_guide_detail">' +
                                        '정보통신망법 규정에 따라 부스트캠프에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, ' +
                                        '개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.' +
                                        '1. 수집하는 개인정보의 항목' +
                                        '최초 회원가입 당시 아래와 같은 최소한의 개인정보를 필수항목으로 수집하고 있습니다.' +
                                        '- 필수항목 : 아이디, 비밀번호, 이름, 생년월일, 성별, 이메일, 휴대전화, 관심사' +
                                        '2. 개인정보의 수집 및 이용 목적' +
                                        '가. 컨텐츠 제공, 특정 맞춤 서비스 제공' +
                                        '나. 회원제 서비스 제공, 개인식별, 부스트캠프 이용약관 위반 회원에 대한 이용제한 조치, 서비스의 원활한 운영에 지장을 미치는 행위 및 서비스 부정이용 행위제재' +
                                        '3. 개인정보의 보유 및 이용기간' +
                                        '이용자의 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안' +
                                        '보존합니다.' +
                                        '가. 회사 내부 방침에 의한 정보보유 사유' +
                                        '- 부정이용기록(부정가입, 징계기록 등의 비정상적 서비스 이용기록)' +
                                        '보존 항목 : 가입인증 휴대폰 번호' +
                                        '보존 이유 : 부정 가입 및 이용 방지' +
                                        '보존 기간 : 6개월' +
                                        "※ '부정이용기록'이란 부정 가입 및 운영원칙에 위배되는 게시글 작성 등으로 인해 회사로부터 이용제한 등을 당한 기록입니다." +
                                        '상법, 전자상거래 등에서의 소비자보호에 관한 법률 등 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원정보를' +
                                        '보관합니다. 이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.- 계약 또는 청약철회 등에 관한 기록' +
                                        '보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률' +
                                        '보존 기간 : 5년' +
                                        '- 소비자의 불만 또는 분쟁처리에 관한 기록' +
                                        '보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률' +
                                        '보존 기간 : 3년' +
                                        '- 웹사이트 방문기록' +
                                        '보존 이유 : 통신비밀보호법' +
                                        '보존 기간 : 3개월' +
                                        '</div>' +
                                    '<input class="terms_window_agree_btn" type="button" value="동의" disabled>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                        '<div class="wrap_btns wrap_label_input_msg">' +
                            '<div class="reset_btn">초기화</div>' +
                            '<div class="sign_up_btn">가입하기</div>' +
                        '</div>' +
                        '<div class="wrap_modal">' +
                            '<div class="modal_content">' +
                                '<div class="modal_string"></div>' +
                                '<div class="modal_btns">' +
                                    '<div class="modal_ok_btn">확인</div>' +
                                    '<div class="modal_cancel_btn">취소</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</form>' +
                '</section>' +
            '</div>' +
        '</div>';
        document.getElementById("content").innerHTML = html;
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
    }
}

render.renderLoginPage();

export default render