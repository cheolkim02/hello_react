import logo from './logo.svg';
import './App.css';
import { Home } from './Pages/Home';
import { ParseExcel } from "./Pages/ParseExcel"
import { Route, Routes } from 'react-router-dom';

function App() {
  return  (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/parse-excel" element={<ParseExcel />} />
    </Routes>
  )
}

export default App;
