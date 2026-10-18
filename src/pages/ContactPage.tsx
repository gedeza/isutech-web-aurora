import { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { API_URL } from '@/utils/api';

// Define libraries array outside component to prevent reloading
const libraries: ("marker")[] = ["marker"];

const ContactPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
    mapIds: [import.meta.env.VITE_GOOGLE_MAPS_MAP_ID]
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);

  // Map configuration
  const mapCenter = {
    lat: -29.8271,
    lng: 30.9241
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    mapId: import.meta.env.VITE_GOOGLE_MAPS_MAP_ID
  };

  const containerStyle = {
    width: '100%',
    height: '400px'
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
    markerRef.current = new google.maps.marker.AdvancedMarkerElement({
      map,
      position: mapCenter,
      title: "iSu Technologies - Westway Office Park"
    });

    // Create an info window
    const infoWindow = new google.maps.InfoWindow({
      content: `
        <div style="padding: 8px;">
          <h3 style="font-weight: bold; margin-bottom: 4px;">iSu Technologies</h3>
          <p style="margin: 0;">18 The Boulevard</p>
          <p style="margin: 0;">Westway Office Park</p>
          <p style="margin: 0;">Westville, 3630</p>
        </div>
      `
    });

    // Add click listener to marker
    if (markerRef.current) {
      markerRef.current.addListener('click', () => {
        infoWindow.open(map, markerRef.current);
      });
    }
  }, []);

  const onUnmount = useCallback(() => {
    if (markerRef.current) {
      markerRef.current = null;
    }
    setMap(null);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'contact_page_form'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderMap = () => {
    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={15}
        options={mapOptions}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    );
  };

  return (
    <div className="contact-page">
      {/* Hero Section with Progress */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.06)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.06)'} 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.08)'} 1px, transparent 1px),
              linear-gradient(to bottom, ${theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.08)'} 1px, transparent 1px)
            `,
            backgroundSize: '160px 160px'
          }}
        />
        
        {/* Grain effect */}
        <div className="absolute inset-0 bg-[url('https://framerusercontent.com/images/rR6HYXBrMmX4cRpXfXUOvpvpB0.png')] bg-repeat opacity-[0.03] dark:opacity-[0.15]" />
        
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-border z-50">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Content */}
        <div className="container relative z-20">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <div className="overflow-hidden">
                <span className="block transform transition-transform duration-1000 translate-y-0 text-primary">
                  GET IN
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="block transform transition-transform duration-1000 delay-300 translate-y-0 text-foreground">
                  TOUCH
                </span>
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mt-8 max-w-2xl mx-auto">
              Let's build something amazing together
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              {/* Left Column - Contact Info */}
              <div className="space-y-12">
                <div className="animate-fade-in">
                  <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Head Office</h3>
                      <p className="text-muted-foreground">18 The Boulevard</p>
                      <p className="text-muted-foreground">Westway Office Park</p>
                      <p className="text-muted-foreground">Westville, 3630</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                      <a href="mailto:info@isutech.co.za" className="text-primary hover:underline">info@isutech.co.za</a>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                      <a href="tel:+27783736437" className="text-primary hover:underline">+27 78 373 6437</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="animate-fade-in" style={{ transitionDelay: '400ms' }}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-md">
                      <p className="text-green-800 dark:text-green-200 text-center">
                        ✅ Message sent successfully! We'll get back to you soon.
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-md">
                      <p className="text-red-800 dark:text-red-200 text-center">
                        ❌ {errorMessage}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Find Us</h2>
            <div className="rounded-lg overflow-hidden shadow-lg">
              {isLoaded ? renderMap() : <div>Loading...</div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 