import { useAuth } from './AuthContext';

const NAVIGATION = {
  accueil: [
    { segment: 'Clients', title: 'Clients', icon: <PeopleAltIcon />, path: '/clients' },
    { segment: 'Reparations', title: 'Reparations', icon: <AssignmentIcon />, path: '/reparations' },
    { segment: 'Factures', title: 'Factures', icon: <ReceiptLongIcon />, path: '/factures' },
  ],
  clientele: [
    { segment: 'Clients', title: 'Clients', icon: <PeopleAltIcon />, path: '/clients' },
    { segment: 'Demandes', title: 'Demandes', icon: <PendingActionsIcon />, path: '/demandes' },
    { segment: 'Reparations', title: 'Reparations', icon: <AssignmentIcon />, path: '/reparations' },
  ],
  direction: [
    { segment: 'Dashboard', title: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    // Add all other links for direction
  ],
};

function Navigation() {
  const { user } = useAuth();

  // Render navigation items based on the user's role
  const items = NAVIGATION[user.role] || [];

  return (
    <div>
      {items.map(item => (
        <NavigationItem key={item.segment} item={item} />
      ))}
    </div>
  );
}
