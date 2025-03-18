import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Notebook from "./components/Notebook";
import AddNotes from "./components/AddNotes";
import EditNotes from "./components/EditNotes";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/notes" element={<Notebook />} />
      <Route path="/add" element={<AddNotes />} /> 
      <Route path="/edit/:id" element={<EditNotes />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
