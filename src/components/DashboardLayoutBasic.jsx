import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DevicesIcon from '@mui/icons-material/Devices';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ClientList from './ClientList';
import Client from './ClientForm';
import ClientEdit from './ClientEdit';


// Déclaration de la navigation
const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'Clients',
    title: 'Clients',
    icon: <PeopleAltIcon />,
    path: '/clients', // Ajouter un chemin pour la navigation
  },
  {
    segment: 'Demandes',
    title: 'Demandes',
    icon: <PendingActionsIcon />,
  },
  {
    segment: 'Fiches de Reparation',
    title: 'Fiches de Reparation',
    icon: <AssignmentIcon />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'Materiels',
    title: 'Materiels',
    icon: <DevicesIcon />,
    children: [
      {
        segment: 'Machines',
        title: 'Machines',
        icon: <ComputerIcon />,
      },
      {
        segment: "Pieces d'echange",
        title: "Pieces d'echange",
        icon: <BuildIcon />,
      },
    ],
  },
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
});

// Composant pour gérer les clics de navigation
function NavigationItem({ item }) {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleClick = () => {
    if (item.path) {
      navigate(item.path); // Naviguer vers l'URL spécifiée
    }
  };

  return (
    <div onClick={handleClick}>
      {item.icon}
      <span>{item.title}</span>
    </div>
  );
}

export default function DashboardLayoutBasic() {
  return (
    <Router>
      <AppProvider
        navigation={NAVIGATION}
        theme={demoTheme}
      >
        <DashboardLayout>
          <PageContainer>
            {/* Navigation */}
            

            {/* Routes */}
            <Routes>
              <Route path="/clients" element={<ClientList />} />
              <Route path="/clientForm" element={<Client />} />
              <Route path="/edit/:id" element={<ClientEdit />} /> 
              <Route path="/" element={<div>Dashboard</div>} />
            </Routes>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </Router>
  );
}
