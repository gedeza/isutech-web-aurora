import { Link } from 'react-router-dom';

const DocumentationPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Documentation</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Product documentation, guides and company knowledge live in our Documentation Hub. Some sections are
              public; others are for customers and our team and ask you to sign in.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://docs.isutech.co.za"
                className="btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the Documentation Hub
              </a>
              <Link to="/support" className="btn-secondary">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DocumentationPage;
