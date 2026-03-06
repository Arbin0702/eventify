import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingCTA from "./components/FloatingCTA";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";

import AdminInbox from "./pages/AdminInbox";
import AdminPortfolio from "./pages/AdminPortfolio";
import AdminBookings from "./pages/AdminBookings";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard";
import BookingReceipt from "./pages/BookingReceipt";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />

        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<WorkDetail />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings/:id"
          element={
            <ProtectedRoute>
              <BookingReceipt />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-event"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events/:id/edit"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <EditEvent />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/inbox"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminInbox />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/portfolio"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminPortfolio />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <FloatingCTA />
      <Footer />
    </BrowserRouter>
  );
}