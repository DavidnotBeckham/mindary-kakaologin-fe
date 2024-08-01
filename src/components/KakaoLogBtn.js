import React from 'react';

function KakaoLogBtn() { // function KakaoLogBtn()은 전통적인 함수 선언 방식이며, 
  // 이를 화살표 함수로 변경하면 const KakaoLogBtn = () => { }가 된다.
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; // process는 Node.js 환경에서 
  // 전역 객체(global object)로 제공되는 객체 중 하나다.
  // 이 객체를 통해 Node.js 애플리케이션의 실행 환경과 관련된 다양한 정보를 얻고, 제어할 수 있다. 
  // process.env는 그 중 하나로, 시스템 환경 변수에 접근할 수 있게 해준다. 
  // 예를 들어, 환경 변수에 설정된 데이터베이스 URL, API 키 등을 process.env를 통해 가져올 수 있다.
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  // 템플릿 리터럴을 사용한 URL을 전통적인 문자열 연결 방식으로 표현하면 다음과 같다.
  // const url = 'https://kauth.kakao.com/oauth/authorize?client_id=' + REST_API_KEY + '&redirect_uri=' + REDIRECT_URI + '&response_type=code';

  const loginHandler = () => {
    window.location.href = link;
  };
  
  return (
    <div>
        <button type='button' onClick={loginHandler}>로그인 하기</button> {/* <button> 요소는 기본적으로 
        type='submit'이다. 이는 버튼이 폼 내에 있을 때, 버튼을 클릭하면 폼이 제출된다는 것을 의미한다. 
        따라서 폼 내부에 <button> 요소를 사용할 때 특별히 type을 지정하지 않으면, 해당 버튼은 기본적으로 폼을 제출한다.
        type='button'은 폼을 제출하지 않고 단순히 클릭 이벤트를 처리하는 버튼을 의미한다. 
        폼 내에서 폼을 제출하지 않는 버튼을 만들려면 type='button'을 명시적으로 지정해야 한다.*/}
    </div>
  );
}

export default KakaoLogBtn;
