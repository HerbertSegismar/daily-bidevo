// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Devotionals from "./pages/Devotionals";
import Bookmarks from "./pages/Bookmarks";
import Prayers from "./pages/Prayers";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/devotionals" element={<Devotionals />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/prayers" element={<Prayers />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
