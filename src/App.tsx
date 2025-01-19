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
import DashboardPage from './pages/admin/DashboardPage';
import LoginPage from './pages/admin/LoginPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-background">
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow">
          <Routes>
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
            <Route path="/dashboard" element={<DashboardPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
