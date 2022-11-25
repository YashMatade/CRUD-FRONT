
import './App.css';
import Table from './components/Table';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeForm from './components/EmployeeForm';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Table />} />
          <Route path='/addemployee' element={<EmployeeForm />} />
          <Route path='/:id' element={<EmployeeForm />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
