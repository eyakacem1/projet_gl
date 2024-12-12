import React,{ useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DevicesIcon from '@mui/icons-material/Devices';
import BuildIcon from '@mui/icons-material/Build';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import ClientEdit from './ClientEdit';
import DemandeForm from './DemandeForm';
import DemandeEdit from './DemandeEdit';
import DemandeList from './DemandeList';
import FactureList from './FactureList';
import { useAuth } from './AuthContext';
import ReparationList from './ReparationList';
import ReparationCreate from './ReparationCreate';
import ReparationEdit from './ReparationEdit';
import PieceRechangeList from './PieceRechangeList';

const NAVIGATION = [
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon />, roles: ['ACCUEIL', 'ATELIER'] },
  { segment: 'Clients', title: 'Clients', icon: <PeopleAltIcon />, path: '/clients', roles: ['ACCUEIL'] },
  { segment: 'Demandes', title: 'Demandes', icon: <PendingActionsIcon />, roles: ['ACCUEIL'] },
  { segment: 'Reparations', title: 'Reparations', icon: <AssignmentIcon />, path: '/reparations', roles: ['ATELIER', 'ACCUEIL'] },
  { segment: 'Factures', title: 'Factures', icon: <ReceiptLongIcon />, path: '/factures', roles: ['ACCUEIL'] },
  { segment: 'Materiels', title: 'Materiels', icon: <DevicesIcon />, roles: ['ATELIER', 'ACCUEIL'], children: [
    { segment: 'Pieces', title: 'Pieces', icon: <BuildIcon />, path: '/Materiels/Pieces', roles: ['ATELIER'] },
  ] }
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } }
});

function DashboardLayoutBasic() {
  const { user, logout } = useAuth();
  
  // If no user, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  const role = user.role;

  // Filter navigation based on the user role
  const filteredNavigation = NAVIGATION.filter(item => item.roles.includes(role));

  // Handle logout functionality
  const handleLogout = () => {
    logout();
    window.location.href = '/login';  // Redirect after logout
  };
  useEffect(() => {
    // Inject CSS to hide the Toolpad logo
    const style = document.createElement('style');
    style.innerHTML = `
      .toolpad-logo {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    // Cleanup the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <AppProvider navigation={filteredNavigation} theme={demoTheme}>
      <DashboardLayout>
        <PageContainer>
          <Routes>
            <Route path="/" element={<div>Dashboard</div>} />
            {role === 'ACCUEIL' && (
              <>
                <Route path="/clients" element={<ClientList />} />
                <Route path="/clientForm" element={<ClientForm />} />
                <Route path="/edit/:id" element={<ClientEdit />} />
                <Route path="/demandes" element={<DemandeList />} />
                <Route path="/DemandeForm" element={<DemandeForm />} />
                <Route path="/editDemande/:id" element={<DemandeEdit />} />
                <Route path="/factures" element={<FactureList />} />
                <Route path="/reparations" element={<ReparationList />} />
                <Route path="/ReparationCreate/:demandeId" element={<ReparationCreate />} />
                <Route path="/Materiels/Pieces" element={<PieceRechangeList />} />

              </>
            )}
            {role === 'ATELIER' && (
              <>
                <Route path="/Reparations" element={<ReparationList />} />
                <Route path="/ReparationEdit/:reparationId" element={<ReparationEdit />} />
              </>
            )}
          </Routes>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
            style={{ position: 'absolute', bottom: 20, right: 20 }}
          >
            Logout
          </Button>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;
