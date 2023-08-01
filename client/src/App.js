import {Navigate, Route, Routes} from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import ProposalPage from './pages/ProposalPage';
import Proposals from './pages/Proposals';
import Portal from './pages/Portal';
import HomePage from './pages/HomePage';

function App() {
  //validate token after app load
  // /validate
  
  return (
    <>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<ProtectedRoutes><Portal /></ProtectedRoutes>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projectproposal" element={<PIRoutes><ProposalPage /></PIRoutes>} />
        <Route path="/submittedproposals" element={<PIRoutes><Proposals /></PIRoutes>} />
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/projectproposal" element={<ProposalPage />} /> */}
      </Routes>
    </>
  );
}


export function ProtectedRoutes(props) {
  if(localStorage.getItem("user")) {
    // const user = JSON.parse(localStorage.getItem('user'));
    return props.children;
  } else {
    return <Navigate to="/home"/>
  }
}

export function PIRoutes(props) {
  if(localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    if(user.role==="pi") {
      return props.children;
    } else {
      return <Navigate to="/"/>
    }
  } else {
    return <Navigate to="/home"/>
  }
}

export function CWDBRoutes(props) {
  if(localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user);
    if(user.role==="cwdb") {
      return props.children;
    } else {
      return <Navigate to="/"/>
    }
  } else {
    return <Navigate to="/home"/>
  }
}

export default App;
