import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Register from "./pages/Register/Register";
import HomePage from "./pages/Homepage/HomePage";
import Login from "./pages/Login/Login";
import Products from "./pages/Products/Product";
import Dashboard from "./pages/Dashboard/Dashboard";
import SellRent from "./pages/SellRent/SellRent";
import RedgFrom from "./pages/RedgForm/RedgFrom";
import StartProjectForm from "./pages/Projects/StartProjectForm";
import ProductList from "./pages/MyProduct/MyProduct";
import RentedProducts from "./pages/MyProduct/RentedProducts";
import { AuthProvider } from "./Contexts/AuthContext";
import { UserInfoProvider } from "./Contexts/UserInfoContext";
import ProjectDetailsPage from "./pages/Project/ProjectDetailsPage";

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <UserInfoProvider>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/start-project" element={<StartProjectForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/form" element={<RedgFrom />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/dashboard/srform" element={<SellRent />} />
            <Route path="/dashboard/my-product" element={<ProductList />} />
            <Route path="/dashboard/rented-products" element={<RentedProducts />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/project-details/:projectId" element={<ProjectDetailsPage/>} />

          </Routes>
          </UserInfoProvider>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
