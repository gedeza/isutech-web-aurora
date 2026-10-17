import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Solutions: [
      { name: 'Custom Software', href: '/services#software' },
      { name: 'Cloud Solutions', href: '/services#cloud' },
      { name: 'AI & ML', href: '/services#ai' },
      { name: 'Consulting', href: '/services#consulting' },
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Products', href: '/products' },
      { name: 'Contact', href: '/contact' },
    ],
    Resources: [
      { name: 'Documentation', href: '/documentation' },
      { name: 'Support', href: '/support' },
      { name: 'Security', href: '/security' },
      { name: 'Terms', href: '/terms' },
    ],
  };

  return (
    <footer className="bg-background border-t border-border/40">
      <div className="container py-12 md:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img 
                src="/images/iSuTech Logo2000x1000.png" 
                alt="iSuTech" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering businesses with innovative technology solutions for a digital future.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="border-t border-border/40 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Get in touch</h3>
            <p className="text-sm text-muted-foreground">
              <a href="mailto:info@isutech.co.za" className="hover:text-primary transition-colors">info@isutech.co.za</a>
              <span className="mx-2">·</span>
              <a href="tel:+27820600404" className="hover:text-primary transition-colors">+27 82 060 0404</a>
            </p>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              © {currentYear} iSu Technologies (Pty) Ltd. All rights reserved.
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;