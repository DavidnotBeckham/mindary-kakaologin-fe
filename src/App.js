import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KakaoLogLand from './pages/KakaoLogLand';
import KakaoLogSuccess from './pages/KakaoLogSuccess';
import KakaoLogRedirect from './pages/KakaoLogRedirect';
import SignUp from './pages/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<KakaoLogLand />} />
        <Route path="/oauth" element={<KakaoLogRedirect />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/kakaologsuccess" element={<KakaoLogSuccess />} />
      </Routes>
      {/* <Switch>
        <Route exact path="/" component={KakaoLogLand} />
        <Route path="/kakaologsuccess" component={KakaoLogSuccess} />
      </Switch>
      // Switch를 Routes로 바꿔야 다음 오류 메시지가 사라진다.
      // export 'Switch' (imported as 'Switch') was not found in 'react-router-dom'
      // component={KakaoLogLand}도 element={<KakaoLogLand />}로 바꿔야 비로소 요소가 화면에 뜬다.*/}
    </Router>
  );
}

export default App;
