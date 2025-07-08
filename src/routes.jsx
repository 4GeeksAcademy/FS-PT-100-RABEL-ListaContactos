import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { AddContact } from "./pages/AddContact";

const App = () => (
    <BrowserRouter>
        <Navbar />

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-contact" element={<AddContact />} />
            <Route path="/edit-contact/:id" element={<AddContact />} />
            <Route path="*" element={<h1 className="text-center">404  Not found</h1>} />
        </Routes>
    </BrowserRouter>
);

export default App;
