import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import TrainSearch from "./pages/TrainSearch";
import Login from "./pages/Login";
import TravelerDetails from "./pages/TravelerDetails";
import PaymentPage from "./pages/PaymentPage";
import './App.css';
import MyBookings from "./pages/MyBookings";
import Booking from "./pages/Booking";
import ContactUs from "./components/ContactUs";
import { getSessionUser } from "./services/authService";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageReservations from "./pages/admin/ManageReservations";
import PassengersList from "./pages/admin/PassengersList";
import ManageTrains from "./pages/admin/ManageTrains";
import ManageRoutes from "./pages/admin/ManageRoutes";
import CancelBooking from "./pages/CancelBooking";

function App() {
  const user = getSessionUser(); // Ensure this function returns the user object
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  // Check if the user is an admin
  const isAdmin = user && user.role === "admin";

  return (
    <div className="container-fluid">
      {/* Hide Navbar & Footer on admin pages */}
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<TrainSearch />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* Protected User Routes */}
        <Route path="/traveler-details" element={user ? <TravelerDetails /> : <Navigate to="/login" />} />
        <Route path="/booking-payment" element={user ? <PaymentPage /> : <Navigate to="/login" />} />
        <Route path="/booking" element={user ? <Booking /> : <Navigate to="/login" />} />
        <Route path="/my-bookings" element={user ? <MyBookings /> : <Navigate to="/login" />} />
        <Route path="/cancel-booking/:id" element={user ? <CancelBooking /> : <Navigate to="/login" />} />


        {/* Admin Routes */}
        <Route path="/admin/*" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}>
          <Route path="reservations" element={<ManageReservations />} />
          <Route path="passengers" element={<PassengersList />} />
          <Route path="trains" element={<ManageTrains />} />
          <Route path="routes" element={<ManageRoutes />} />
        </Route>
      </Routes>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
