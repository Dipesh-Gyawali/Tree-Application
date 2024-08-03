import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./Components/Navbar.tsx";
import { Create } from "./Components/Create.tsx";
import { Read } from "./Components/Read.tsx";
import Update from "./Components/Update.tsx";
function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Create />} />
            <Route path="/read" element={<Read />} />
            <Route path="/edit/:id" element={<Update />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
