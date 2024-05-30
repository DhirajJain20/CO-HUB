import { useEffect } from 'react';
import { useAuth } from '../../Contexts/AuthContext';
import { Navbar } from '../../Components';
import { Footer, DashboardButtons, DisplayToggle } from '../../Containers';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  // Use useEffect to navigate to '/login' if not logged in
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login');
    }
  }, [loggedIn, navigate]);

  return (
    <div className="dashboard gradient_bg">
      <Navbar />
      <div className="dashboard__header">
        <div className="dashboard__heading">
          <h1>Dashboard</h1>
          <div className="dashboard__line" />
        </div>
        <DashboardButtons />
        <DisplayToggle />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
