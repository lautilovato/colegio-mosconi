import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import HomePage from './pages/HomePage';
import ClassPage from './pages/ClassPage';
import TakeAttendancePage from './pages/TakeAttendancePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/class/:classId" element={<ClassPage />} />
          <Route path="/class/:classId/attendance" element={<TakeAttendancePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
