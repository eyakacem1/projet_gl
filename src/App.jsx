import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayoutBasic from './components/DashboardLayoutBasic';
import LoginForm from './components/Login';

import { AuthProvider } from './components/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/*" element={<DashboardLayoutBasic />} />
          <Route path="/*" element={<DashboardLayoutBasic />} />
          <Route path="/*" element={<DashboardLayoutBasic />} />
          {/*<Route path="/" element={<LoginForm />} />*/}
        </Routes>
      </Router>
    </AuthProvider>
  );
};
export default App;
