import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/SideBar';
import GestionClient from './pages/GestionClient';
import GestionDemande from './pages/GestionDemande';

import ClientForm from './components/Client/ClientForm';

const App = () => {
  return (
    <Router>
      <SideBar />
      <Routes>
      <Route path="/" element={<h1>Welcome to the Home Page</h1>} />
        <Route path="/gestion-client" element={<GestionClient />} />
        <Route path="/gestion-demande" element={<GestionDemande />} />
      </Routes>
    </Router>
  );
};

export default App;
