import React from 'react';
import '../styles/KakaoLogSuccess.css'; // 스타일을 위한 CSS 파일 추가
import Logout from '../components/Logout'; // Logout 컴포넌트 임포트

const KakaoLogSuccess = () => {
  return (
    <div className="kakao-log-success">
      <h1>로그인 성공!</h1>
      <p>환영합니다. 로그인에 성공하셨습니다.</p>
      <Logout /> {/* Logout 컴포넌트 추가 */}
    </div>
  );
};

export default KakaoLogSuccess;
