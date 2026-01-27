import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './layout/Header'
import HomePage from './pages/HomePage'
import ClassPage from './pages/ClassPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/class/:classId" element={<ClassPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
