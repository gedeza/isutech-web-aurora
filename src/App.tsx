import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Index';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareersPage';
import SecurityPage from './pages/SecurityPage';
import SupportPage from './pages/SupportPage';
import TermsPage from './pages/TermsPage';
import DocumentationPage from './pages/DocumentationPage';
import DashboardPage from './pages/admin/DashboardPage';
import LoginPage from './pages/admin/LoginPage';
import CRMDashboard from './pages/admin/crm/CRMDashboard';
import CustomerDetails from './pages/admin/crm/CustomerDetails';
import AddCustomer from './pages/admin/crm/AddCustomer';
import UserManagement from './pages/admin/users/UserManagement';
import UserForm from './pages/admin/users/UserForm';
import ProductManagement from './pages/admin/products/ProductManagement';
import ProductForm from './pages/admin/products/ProductForm';
import ServicesDashboard from './pages/admin/services/ServicesDashboard';
import ServiceForm from './pages/admin/services/ServiceForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/support" element={<SupportPage/>}/>
          <Route path="/terms" element={<TermsPage/>}/>
          <Route path="/documentation" element={<DocumentationPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage/>}/>
          
          {/* CRM Routes */}
          <Route path="crm" element={<CRMDashboard />} />
          <Route path="crm/customers/new" element={<AddCustomer />} />
          <Route path="crm/customers/:id" element={<CustomerDetails />} />
          
          {/* User Management Routes */}
          <Route path="users" element={<UserManagement />} />
          <Route path="users/new" element={<UserForm />} />
          <Route path="users/:id/edit" element={<UserForm />} />
          
          {/* Product Management Routes */}
          <Route path="products" element={<ProductManagement />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/:id/edit" element={<ProductForm />} />

          {/* Service Management Routes */}
          <Route path="services" element={<ServicesDashboard />} />
          <Route path="services/new" element={<ServiceForm />} />
          <Route path="services/:id/edit" element={<ServiceForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
