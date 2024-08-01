import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from '../services/Api'; // import axios from 'axios';

const KakaoLogRedirect = () => {
  const navigate = useNavigate();
  const urlStr = window.location.href;
  const url = new URL(urlStr);
  const urlparams = url.searchParams;
  const code = urlparams.get('code');

  useEffect(() => {
    if (code) {
      axios.post(`${process.env.REACT_APP_API_URL}/mindary/accounts/kakao/login`, { access_code: code })
        .then((response) => {
          if (response.status === 200) {
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            navigate('/kakaologsuccess');
          }
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 404) {
              navigate('/kakaologsignup');
            } else if (error.response.status === 401) {
              alert('Unauthorized: Invalid token');
            } else if (error.response.status === 400) {
              alert('Bad Request: Invalid request parameters');
            } else {
              alert(`An error occurred: ${error.response.status}`);
            }
          } else {
            alert('Login failed: No response from server');
          }
        });
    }
  }, [code, navigate]);

  return <div>로그인 중입니다.</div>;
};

export default KakaoLogRedirect;
