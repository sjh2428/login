# 멤버십 프로젝트 - 로그인과 회원가입 저장소

[Membership Project 1](https://nameless-reef-81042.herokuapp.com/)

## 1주차 - 회원가입/로그인 Front-End
### 회원가입
#### HTML
1. [x] 회원가입 제목
2. [x] 아이디
3. [x] 비밀번호
4. [x] 비밀번호 재확인
5. [x] 이름
6. [x] 생년월일
7. [x] 성별
8. [x] 이메일
9. [x] 휴대전화
10. [x] 관심사
11. [x] 약관 동의
12. [x] 약관
13. [x] 초기화/회원가입 버튼
14. [x] modal

#### CSS
1. [x] Label
    - width: 100%
    - font-weight: bold
2. [x] Input
    - font-size: 18px
    - width: 100%
    - focus시에 테두리 색 변경: #56C151
3. [x] Message
    - width: 100%
    - error는 #FE2924
    - pass는 #1BAA17
4. [x] 회원가입 Title
    - color: #03A600
5. [x] 관심사 태그
    - li태그 내에 들어감
    - width, height 조정
    - 삭제버튼
    - overflow: scroll
6. [x] body
    - background-color: #F5F6F7
7. [x] Reset, Sign-Up
    - color: white
    - background-color: #0BA600

#### JS
1. [x] 아이디
    - 정규표현식 활용 및 에러메세지 구현
        - 5~20자의 영 소문자, 숫자, 특수기호(_), (-)만 사용 가능
    - 중복 체크 기능(back-end 기능 만들 때 구현해야 함)
2. [x] 비밀번호
    - 정규표현식 활용 및 에러메세지 구현
        - 8~16자의 영문 대, 소문자, 숫자, 특수문자의 조합
3. [x] 비밀번호 재확인
    - 비밀번호칸에 입력한 것과 동일하면 됨
4. [x] 생년월일
    - 태어난 년도, 월, 일이 각각 입력될 때 마다 전부 체크하며 에러메세지 출력
    - 현재년도를 기준으로 만 14세 이상 만 99세 이하여야 가입 가능
        - 입력된 년도가 숫자인지 판별
        - 4자리로 입력되었는지 판별
        - 만 14세 이상 만 99세 이하인지 확인
    - select태그를 활용하여 태어난 월 구현
        - keyup과 change에 대하여 이벤트 리스너 구현
        - 아무것도 선택하지 않은 것을 의미하는 '월'이 선택되어 있다면
            태어난 월을 입력해달라는 에러 메세지
    - 태어난 일자
        - 1이상 31이하의 숫자만 가능
        - 아무것도 입력하지 않거나 문자가 입력되지 않도록 에러메세지 구현
5. [x] 성별
    - 남자나 여자가 선택되지 않았다면 성별을 선택해달라는 에러메세지 구현
6. [x] 이메일
    - 정규표현식 활용 및 에러메세지 구현
        - xxx@xxx.com의 형태
7. [x] 휴대전화
    - 정규표현식 활용 및 에러메세지 구현
        - 앞자리는 무조건 010
        - 7-8자리의 숫자만 추가로 들어오면 됨
8. [x] 관심사
    - input이 아닌 div로 우선 만듦
    - textarea를 div안에 만들어 입력받고 ,(comma)를 입력하면 ul, li태그를 이용하여 관심사 태그 등록 후 다시 textarea 생성
    - x버튼을 누르면 해당 li 삭제
    - 3개 이상의 관심사를 작성해야함
9. [x] 약관
    - `약관에 동의합니다.`라는 메세지를 클릭한다면 약관창 visible
    - `동의`버튼을 누르면 `약관에 동의합니다.` 오른쪽에 있는 체크박스 체크
10. [x] 초기화 버튼
    - 초기화 버튼 클릭
        - 초기화를 눌렀다면 "모든 내용을 새로 작성하시겠습니까?"
        - 확인창의 취소를 클릭하면 창이 닫히고, 확인을 클릭하면 모든 입력 항목의 내용이 지워진다
11. [x] 가입하기 버튼
    - 가입하기 버튼 클릭
        - 약관 동의를 포함한 회원가입 전체 10가지 항목 중 한가지 항목이라도 비워져있다면 비워진 항목을 입력해달라는 내용의 새로운 팝업레이어가 뜬다.<br>
        예) ‘생년월일을 입력해주세요.’<br>
        ‘ 관심사를 입력해주세요.’<br>
        ‘약관에 동의해주세요.’<br>
        등등...
    - 가입하기 버튼을 클릭했을 때, 모든 항목이 입력된 상태라면 모든 내용이 비동기로 서버로 보내지고 결과를 받은 후 자동로그인이 된다. 자동로그인이 된 상태로 메인화면으로 이동된다. 메인화면은 임의 페이지를 만든다.

### 로그인
#### HTML
1. [x] 아이디, 비밀번호
2. [x] 로그인, 회원가입
3. [x] 회원가입 modal
4. [x] 회원가입 modal 나가기 버튼

#### CSS
1. [x] 아이디, 비밀번호
2. [x] 로그인, 회원가입
3. [x] 회원가입 modal
4. [x] 회원가입 modal 나가기 버튼

#### JS
1. [x] 회원가입 modal
    - 띄우기, 닫기
    - 회원가입 validation, reset, 회원가입 기능 테스트

### JS Literalize
- Check
- Event
- Message
- Modal


## 2주차 - 회원가입/로그인 Back-End
### 환경설정 및 사전작업
1. [x] express-generator를 활용한 폴더구조 변경 및 기본 파일 배치
2. [x] Mocha Test Framework 설치
    - mocha
    - node-mocks-http - http request test
    - should
    - assert
3. [x] nodemon
    - 파일이 수정되면 자동으로 서버 재시작
4. [x] lowdb
    - database handle
5. [x] README.md 작성
6. [x] html to pug 변환

### 라우팅
1. [x] 메인
    - 쿠키를 활용하여 로그인된 데이터가 존재하면 메인화면을 보여주고, 로그인 되어있지 않다면 로그인 화면을 라우팅
    - URL: /
    - method: GET
2. [x] 로그인
    - 아이디가 DB에 존재하는지
    - 존재한다면 해당 아이디는 입력된 비밀번호가 DB에서의 비밀번호와 일치하는지
    - 맞다면 회원정보를 JSON Return
    - URL: /login
    - method: POST
3. [x] 로그아웃
    - 로그아웃 버튼을 누르면 브라우저상의 쿠키정보 제거
    - 메인으로 redirect
    - URL: /logout
    - method: GET
4. [x] 회원가입
    - 입력된 데이터를 DB에 추가
    - 입력된 데이터를 토대로 쿠키에 로그인 정보 설정
    - 메인으로 redirect
    - URL: /sign-up
    - method: POST

5. [x] 중복체크
    - 회원가입시 아이디 중복체크를 위한 API Router
    - URL: /duplicate
    - method: GET

### DB
#### user_table
- UUID - Primary Key
- ID
- Password
- Name
- Birth year, month, day
- Gender
- Email
- Tel
- Interests

#### CRUD
1. [x] Create
2. [x] Read
3. [x] Update
4. [x] Delete

### 로그인 후 화면
#### HTML/CSS
1. [x] 로그인 이후의 화면

#### JS
1. [x] 로그아웃 Handler

### 배포
1. [x] deploy