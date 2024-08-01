import React from 'react';
import axios from '../services/Api'; // import axios from 'axios';

const Logout = () => {
  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/mindary/accounts/kakao/logout`, { refresh_token: refreshToken });
      if (response.status === 200) {
        // 로그아웃 성공 시 토큰 제거 및 리디렉션
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        alert('로그아웃에 성공했습니다');
        window.location.href = '/';
      } else {
        // 다른 상태 코드 처리 (필요 시)
        alert(response.status, '로그아웃 실패 : 예기치 못한 상태 코드가 반환되었습니다.');
        //우리 백엔드 api 명세서에 없던데?
      }
    } catch (error) {
      // 오류 처리
      console.error('Logout error:', error);
      alert('Logout failed: an error occurred.', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
