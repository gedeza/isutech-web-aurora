import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Index';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import CareersPage from './pages/CareersPage';
import SecurityPage from './pages/SecurityPage';
import ScrollToTop from './components/ScrollToTop';
import SupportPage from './pages/SupportPage';
import TermsPage from './pages/TermsPage';
import DocumentationPage from './pages/DocumentationPage';
import AutoSlipPage from './pages/AutoSlipPage';
import PropertyIntelligencePage from './pages/PropertyIntelligencePage';
import EducationAnalyticsPage from './pages/EducationAnalyticsPage';

// Admin pages
import AdminLayout from './layouts/AdminLayout';
import PublicLayout from './layouts/PublicLayout';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ContactsDashboard from './pages/admin/contacts/ContactsDashboard';
import ProductsDashboard from './pages/admin/products/ProductsDashboard';
import ProductForm from './pages/admin/products/ProductForm';
import ServicesDashboard from './pages/admin/services/ServicesDashboard';
import ServiceForm from './pages/admin/services/ServiceForm';
import CRMDashboard from './pages/admin/crm/CRMDashboard';
import AddCustomer from './pages/admin/crm/AddCustomer';
import CustomerDetails from './pages/admin/crm/CustomerDetails';
import UsersDashboard from './pages/admin/users/UsersDashboard';
import UserForm from './pages/admin/users/UserForm';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes with Navbar and Footer */}
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
          <Route path="/autoslip" element={<AutoSlipPage/>}/>
          <Route path="/property-intelligence" element={<PropertyIntelligencePage/>}/>
          <Route path="/education-analytics" element={<EducationAnalyticsPage/>}/>
        </Route>

        {/* Admin login (no navbar/footer) */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Admin routes (without public navbar/footer) */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="contacts" element={<ContactsDashboard />} />
          <Route path="products" element={<ProductsDashboard />} />
          <Route path="products/new" element={<ProductForm />} />
          <Route path="products/edit/:id" element={<ProductForm />} />
          <Route path="services" element={<ServicesDashboard />} />
          <Route path="services/new" element={<ServiceForm />} />
          <Route path="services/edit/:id" element={<ServiceForm />} />
          <Route path="crm" element={<CRMDashboard />} />
          <Route path="crm/add" element={<AddCustomer />} />
          <Route path="crm/customer/:id" element={<CustomerDetails />} />
          <Route path="users" element={<UsersDashboard />} />
          <Route path="users/new" element={<UserForm />} />
          <Route path="users/edit/:id" element={<UserForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
