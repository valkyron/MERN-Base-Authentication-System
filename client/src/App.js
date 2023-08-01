import {Navigate, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import ProposalPage from './pages/ProposalPage';
import Proposals from './pages/Proposals';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
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
    return <Navigate to="/login"/>
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
    return <Navigate to="/login"/>
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
    return <Navigate to="/login"/>
  }
}

export default App;
