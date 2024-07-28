import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoLogRedirect = () => {
  const navigate = useNavigate();
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlparams = url.searchParams;
  const code = urlparams.get('code');
  console.log(code); //

  useEffect(() => {
    if (code) {
      axios.post(`${process.env.REACT_APP_API_URL}/mindary/accounts/kakao/login`, { access_code: code })
        .then((response) => {
          if (response.status === 200) {
            // 사용자 등록되어 있음
            console.log(response.data);
            localStorage.setItem('access_token', response.data.access_token);
            navigate('/kakaologsuccess');
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              // 사용자 등록되지 않음
              navigate('/signup');
            } else if (error.response.status === 401) {
              // 인증 실패 (예: 토큰 유효하지 않음)
              alert('Unauthorized: Invalid token');
              // 필요시 로그인 페이지로 리디렉션
            } else if (error.response.status === 400) {
              // 잘못된 요청 (예: 요청 파라미터 오류)
              alert('Bad Request: Invalid request parameters');
            } else {
              // 기타 에러
              alert(`An error occurred: ${error.response.status}`);
            }
          } else {
            // 네트워크 오류 또는 기타 이유로 응답이 없는 경우
            alert('Login failed: No response from server');
          }
        });
    }
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default KakaoLogRedirect;
