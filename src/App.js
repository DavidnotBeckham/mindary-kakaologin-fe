import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 3, 4번째 줄과 같은 의미다.
// import { BrowserRouter as Router} from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';
import KakaoLogLand from './pages/KakaoLogLand';
import KakaoLogRedirect from './pages/KakaoLogRedirect';
import KakaoLogSignUp from './pages/KakaoLogSignUp';
import KakaoLogSuccess from './pages/KakaoLogSuccess';
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<KakaoLogLand />} />
        <Route path="/oauth" element={<KakaoLogRedirect />} />
        <Route path="/kakaologsignup" element={<KakaoLogSignUp />} />
        <Route path="/kakaologsuccess" element={<KakaoLogSuccess />} />
        <Route path="/logout" element={<Logout />} />
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
