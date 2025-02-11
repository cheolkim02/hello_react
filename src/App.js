import logo from './logo.svg';
import './App.css';
import { Home } from './Components/Home';
import { ParseExcel } from "./Components/ParseExcel"
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
