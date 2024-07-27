import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';

const KakaoLogRedirect = () => {
  const navigate = useNavigate();
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlparams = url.searchParams;
  const code = urlparams.get('code');
  console.log(code);

  useEffect(() => {
    if (code) {
      axios.post(`${process.env.REACT_APP_API_URL}/mindary/accounts/kakao/login`, { code })
        .then((r) => {
          console.log(r.data);
          localStorage.setItem('accessToken', r.data.data.accessToken); // 토큰 저장

          axios.get(`${process.env.REACT_APP_API_URL}/mindary/accounts/kakao/verify`, {
            headers: {
              Authorization: `Bearer ${r.data.data.accessToken}`,
            },
          })
          .then(response => {
            console.log(response.data);
            navigate('/kakaologsuccess');
          })
          .catch(error => {
            console.error('Verification failed:', error);
            // 에러 페이지로 이동하거나 에러 메시지 표시
          });
        })
        .catch(error => {
          console.error('Login failed:', error);
          // 에러 페이지로 이동하거나 에러 메시지 표시
        });
    }
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default KakaoLogRedirect;
