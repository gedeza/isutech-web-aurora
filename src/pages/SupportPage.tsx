import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Book } from 'lucide-react';

const supportChannels = [
  {
    title: "Phone Support",
    description: "Speak directly with our team during business hours.",
    icon: Phone,
    content: {
      hours: "Monday - Friday: 8:00 AM - 5:00 PM SAST",
      contact: "+27 82 060 0404"
    }
  },
  {
    title: "Email Support",
    description: "Send us an email and we will get back to you.",
    icon: Mail,
    content: {
      email: "support@isutech.co.za"
    }
  }
];

const supportResources = [
  {
    title: "Documentation",
    description: "User guides and product documentation.",
    icon: Book,
    link: "/documentation"
  },
  {
    title: "Contact Us",
    description: "Send a message through the contact form.",
    icon: MessageSquare,
    link: "/contact"
  }
];

export default function SupportPage() {
  return (
    <div className="container py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Support Center</h1>
        <p className="text-xl text-muted-foreground">
          We're here to help you succeed with iSu Technologies solutions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {supportChannels.map((channel) => (
          <div key={channel.title} className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <channel.icon className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-semibold">{channel.title}</h2>
            </div>
            <p className="text-muted-foreground mb-6">{channel.description}</p>
            <div className="space-y-2">
              {Object.entries(channel.content).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span className="capitalize">{key}:</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Additional Resources</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {supportResources.map((resource) => (
          <Link
            key={resource.title}
            to={resource.link}
            className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              <resource.icon className="w-8 h-8 text-primary" />
              <h3 className="text-xl font-semibold">{resource.title}</h3>
            </div>
            <p className="text-muted-foreground">{resource.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
} 