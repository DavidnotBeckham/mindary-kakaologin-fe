import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URL}/mindary/accounts/kakao/register`, formData)
      .then(response => {
        alert('Signup successful!');
        // 로그인 페이지로 이동
        window.location.href = '/';
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status === 400) {
            // 400 Bad Request
            alert('Signup failed: Bad request. Please check your form.');
          } else if (error.response.status === 401) {
            // 401 Unauthorized
            alert('Signup failed: Unauthorized. Please check your credentials.');
          // } else if (error.response.status === 409) {
            // // 409 Conflict
            // alert('Signup failed: User already exists.');
          } else {
            // 기타 상태 코드
            alert(`Signup failed: ${error.response.status}`);
          }
        } else {
          // 네트워크 오류 또는 기타 이유로 응답이 없는 경우
          alert('Signup failed: No response from server');
        }
      });
  };

  return (
    <div className="signup">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
