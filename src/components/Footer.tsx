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

        {/* Newsletter subscription */}
        <div className="border-t border-border/40 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold mb-2">Subscribe to our newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates and insights delivered to your inbox
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              © {currentYear} iSuTech. All rights reserved.
            </span>
          </div>

          {/* Social links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;