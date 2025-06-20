import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomThemeProvider } from './contexts/ThemeContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Calendar from './pages/Calendar';
import Tasks from './pages/Tasks';

function App() {
  return (
    <CustomThemeProvider>
      <EmployeeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<Tasks />} />
            </Routes>
          </Layout>
        </Router>
      </EmployeeProvider>
    </CustomThemeProvider>
  );
}

export default App;
