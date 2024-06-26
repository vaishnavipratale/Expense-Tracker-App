import { Route, Routes } from 'react-router-dom';
import SignUp from './Component/SignUp';
import LogIn from './Component/LogIn';
import Welcome from './Component/pagese/Welcome';
import Header from './Component/Header/Header';
import CompleteProfile from './Component/pagese/CompleteProfile';
function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<SignUp/>} />
      <Route path="login" element={<LogIn />} />
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path='welcome/completeprofile' element={<CompleteProfile/>} />
    </Routes>
    </>
  );
}

export default App;