import { useEffect, useState, useCallback, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';

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
      // Use Vercel serverless function (same domain, works with HTTPS)
      const response = await fetch('/api/contact', {
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
                      <a href="tel:+27820600404" className="text-primary hover:underline">+27 82 060 0404</a>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="animate-fade-in" style={{ transitionDelay: '200ms' }}>
                  <h2 className="text-3xl font-bold mb-6">Follow Us</h2>
                  <div className="flex gap-4">
                    <a href="#" className="p-3 border border-border rounded-full hover:bg-primary hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                      </svg>
                    </a>
                    <a href="#" className="p-3 border border-border rounded-full hover:bg-primary hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                      </svg>
                    </a>
                    <a href="#" className="p-3 border border-border rounded-full hover:bg-primary hover:text-white transition-colors">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                      </svg>
                    </a>
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