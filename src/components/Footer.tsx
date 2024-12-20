import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">iSuTech</h3>
            <p className="text-foreground/70 max-w-md">
              Empowering businesses with cutting-edge technology solutions for a digital future.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/70 hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-foreground/70 hover:text-primary">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-foreground/70 hover:text-primary">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-primary">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-foreground/70">
              <li>info@isutech.co.za</li>
              <li>+27 (0) 81 646 0137</li>
              <li>Westville, Durban, KwaZulu-Natal, 3610, South Africa</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-foreground/70">
          <p>&copy; {new Date().getFullYear()} iSuTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;