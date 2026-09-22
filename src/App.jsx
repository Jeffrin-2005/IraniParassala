import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reserve from "./pages/Reserve";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Features />
        <Menu />
        <Gallery />
        <Reviews />
        <Contact />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main restaurant page */}
        <Route path="/" element={<Home />} />

        {/* Reservation page */}
        <Route path="/reserve" element={<Reserve />} />
      </Routes>
    </BrowserRouter>
  );
}