import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetails from "./pages/MenuDetails";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import ServicesLayout from "./pages/ServicesLayout";
import DineIn from "./pages/DineIn";
import Catering from "./pages/Catering";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<MenuDetails />} />

          <Route path="/about" element={<About />} />

          <Route path="/services" element={<ServicesLayout />}>
            <Route
              index
              element={<Navigate to="dine-in" replace />}
            />

            <Route path="dine-in" element={<DineIn />} />
            <Route path="catering" element={<Catering />} />
            <Route path="events" element={<Events />} />
          </Route>

          <Route path="/reservations" element={<Reservations />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/demo-payment" element={<Payment />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;