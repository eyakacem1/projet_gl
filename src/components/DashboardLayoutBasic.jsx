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
import DemandeForm from './DemandeForm';
import DemandeEdit from './DemandeEdit';
import DemandeList from './DemandeList';
import TypeForm from './TypeForm';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import TypeList from './TypeList';
import TypeEdit from './TypeEdit';

import PieceRechangeList from './PieceRechangeList';
import PieceRechangeForm from './PieceRechangeForm';
import PieceRechangeEdit from './PieceRechangeEdit';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ReparationList from './ReparationList';
import ReparationForm from './ReparationForm';
import ReparationCreate from './ReparationCreate';

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
    path: '/clients', 
  },
  {
    segment: 'Demandes',
    title: 'Demandes',
    icon: <PendingActionsIcon />,
  },
  {
    segment: 'Reparations',
    title: 'Reparations',
    icon: <AssignmentIcon />,
  },
  {
    segment: 'Factures',
    title: 'Factures',
    icon: <ReceiptLongIcon />,
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
        segment: "Pieces",
        title: "Pieces",
        icon: <BuildIcon />,
        path: '/Materiels/Pieces', 

      },
      {
        segment: "Types",
        title: "Types",
        icon: <DevicesOtherIcon />,
        path: '/Materiels/Types', 

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

function NavigationItem({ item }) {
  const navigate = useNavigate(); 
  const handleClick = () => {
    if (item.path) {
      navigate(item.path); 
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
            

            <Routes>
            <Route path="/Reparations" element={<ReparationList />} />
            <Route path="/ReparationForm" element={<ReparationForm />} />
            <Route path="/ReparationCreate/:id" element={<ReparationCreate />} />

            <Route path="/Materiels/Pieces" element={<PieceRechangeList />} />
            <Route path="/PieceForm" element={<PieceRechangeForm />} />

              <Route path="/clients" element={<ClientList />} />
              <Route path="/clientForm" element={<Client />} />
              <Route path="/edit/:id" element={<ClientEdit />} />

              <Route path="/clients" element={<ClientList />} />
              <Route path="/clientForm" element={<Client />} /> 

              <Route path="/demandes" element={<DemandeList />} />
              <Route path="/DemandeForm" element={<DemandeForm />} />
              <Route path="/editDemande/:id" element={<DemandeEdit />} /> 

              <Route path="/typeEdit/:id" element={<TypeEdit />} />
              <Route path="/typeForm" element={<TypeForm />} />
              <Route path="/Materiels/Types" element={<TypeList />} />
              <Route path="/" element={<div>Dashboard</div>} />
            </Routes>
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    </Router>
  );
}
