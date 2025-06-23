import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AddItem from './pages/AddItem';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail'; // ✅ ADDED
import MatchDetail from './pages/MatchDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add/:type" element={<AddItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/items/:type/:id" element={<ItemDetail />} /> {/* ✅ ADDED */}
        <Route path="/match/:id" element={<MatchDetail />} />

      </Routes>
    </Router>
  );
}

export default App;



