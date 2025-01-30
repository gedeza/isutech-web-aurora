import React, { useState } from 'react';
import { contactApi } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await contactApi.submit(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
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
            {success ? (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent Successfully!</h3>
                <p className="text-muted-foreground mb-4">Thank you for contacting us. We'll get back to you soon.</p>
                <button 
                  onClick={() => setSuccess(false)} 
                  className="btn-secondary"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                    {error}
                  </div>
                )}

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
                    Company (Optional)
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

                <button 
                  type="submit" 
                  className="btn-primary w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
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
                <a 
                  href="https://www.linkedin.com/company/isutech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://twitter.com/isutech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Twitter
                </a>
                <a 
                  href="https://github.com/isutech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
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