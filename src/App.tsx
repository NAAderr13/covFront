import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar'; // Assurez-vous que Navbar est bien importé depuis le bon chemin
import { Home } from './pages/Home'; // Assurez-vous que Home est bien importé depuis le bon chemin
import { FindRide } from './pages/FindRide';
import { OfferRide } from './pages/OfferRide';
import { Dashboard } from './pages/Dashboard';
import { SearchResults } from './pages/SearchResults';
import Admin from './pages/Admin'; // Assurez-vous d'importer Admin correctement avec export default dans Admin.tsx
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ReservationList } from './pages/ReservationList'; // Chemin corrigé pour ReservationList

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<FindRide />} />
            <Route path="/offer" element={<OfferRide />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/admin" element={<Admin />} /> {/* Page Admin pour la gestion */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reservations" element={<ReservationList />} /> {/* Nouvelle route pour la liste des réservations */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
