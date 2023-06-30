import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Account from "./pages/Account";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import Search from "./pages/Search";
import Header from "./components/Header";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const Layout = ({ children }) => {
    return (
      <div>
        <Navbar />
        {children}
      </div>
    );
  };
  const LayoutWithSearch = ({ children }) => {
    return (
      <div>
        <Navbar />
        <Header />
        {children}
      </div>
    );
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LayoutWithSearch><Home /></LayoutWithSearch>} />
          <Route path="/search" element={<LayoutWithSearch><Search /></LayoutWithSearch>} />
          <Route path="/post/:postId" element={<Layout><Single /></Layout>} />
          <Route path="/write" element={currentUser ? (<Layout><Write /></Layout>) : <Signup />} />
          <Route path="/account" element={currentUser ? (<Layout><Account /></Layout>) : <Signup />} />
          <Route path="/login" element={currentUser ? (<Layout><Home /></Layout>) : <Login />} />
          <Route path="/signup" element={currentUser ? (<Layout><Home /></Layout>) : <Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
