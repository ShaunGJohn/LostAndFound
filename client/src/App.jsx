import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail'; // ✅ ADDED
import MatchDetail from './pages/MatchDetail';
import About from './pages/About'; // Adjust the path if needed


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add/:type" element={<AddItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/items/:type/:id" element={<ItemDetail />} /> {/* ✅ ADDED */}
        <Route path="/match/:id" element={<MatchDetail />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
  );
}

export default App;



