import axios from 'axios';

// Axios 인스턴스 생성 및 기본 URL 설정
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // API 요청의 기본 URL
});

// 요청 인터셉터 설정
api.interceptors.request.use(
  (config) => {
    // localStorage에서 액세스 토큰 가져오기
    const token = localStorage.getItem('access_token');
    if (token) {
      // 액세스 토큰을 Authorization 헤더에 추가
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
api.interceptors.response.use(
  (response) => {
    // 응답 성공 시 그대로 반환
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // 401 Unauthorized 에러가 발생하고 첫 번째 재시도인 경우
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      try {
        // 리프레시 토큰을 사용하여 액세스 토큰 갱신 시도
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/mindary/accounts/kakao/verify`, { refresh_token: refreshToken });
        // 우리 백엔드 API 명세서의 4번째 주소 같은데, 태경이가 Request에 아무것도 안 써놨네?
        if (response.status === 200) {
          // 갱신 성공 시 localStorage에 새로운 액세스 토큰 저장
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          // 원래 요청의 Authorization 헤더를 새로운 토큰으로 업데이트
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          // 새로운 토큰으로 원래 요청 재시도
          return api(originalRequest);
        }
      } catch (refreshError) {
        // 토큰 갱신 중 에러 처리
        console.error('Refresh token failed', refreshError);
      }
    }
    // 갱신 실패 시 원래 에러 반환
    return Promise.reject(error);
  }
);

export default api;
