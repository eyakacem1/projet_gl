import React, { useState, useEffect } from 'react'; // Import useEffectimport { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DevicesIcon from '@mui/icons-material/Devices';
import BuildIcon from '@mui/icons-material/Build';
import ComputerIcon from '@mui/icons-material/Computer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Client from './ClientForm';
import { extendTheme } from '@mui/material/styles';
import styled from 'styled-components';
import ClientList from './ClientList';
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

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            
          <Client/>
           <ClientList></ClientList>
          
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}