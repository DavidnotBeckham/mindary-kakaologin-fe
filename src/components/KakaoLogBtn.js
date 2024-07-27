import React from 'react';

function KakaoLogBtn() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  const loginHandler = () => {
    window.location.href = link;
  };
  
  return (
    <div> {/* className="OFirst"*/}
        <button type='button' onClick={loginHandler}>로그인 하기</button>
    </div>
  );
}

export default KakaoLogBtn;
