import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
          source: 'homepage_contact_form'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', message: '' });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="section relative overflow-hidden" id="contact">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-accent/5 to-background" />
      
      <div className="container relative">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Get in Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Let's discuss how we can help transform your business
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="glass-card p-8 rounded-lg animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-600 rounded-md">
                  <p className="text-green-800 dark:text-green-200 text-center">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-600 rounded-md">
                  <p className="text-red-800 dark:text-red-200 text-center">
                    ❌ {errorMessage}
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="floating-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Visit Our Office</h3>
              <p className="text-muted-foreground">
                18 The Boulevard <br />
                Westway Office Park<br />
                Westville, 3630
              </p>
            </div>

            <div className="floating-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-muted-foreground">
                <p>Email: info@isutech.co.za</p>
                <p>Phone: +27 68 127 6710</p>
                <p>Hours: Mon-Fri 9:00 AM - 6:00 PM </p>
              </div>
            </div>

            <div className="floating-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                {/* Add social media icons/links here */}
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Twitter
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;