import { Link } from 'react-router-dom';

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Careers</h1>
            <p className="text-xl text-muted-foreground mb-6">
              We are a small team building software for South African municipalities, public bodies and regulated
              industries. We do not have advertised vacancies at the moment.
            </p>
            <p className="text-muted-foreground mb-8">
              If you build software, or understand records management, property valuation or ISO compliance, and you
              would like to work on this kind of problem, send us your CV and a few lines about what you would like to
              work on. We read everything we receive.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="mailto:info@isutech.co.za?subject=Careers" className="btn-primary">
                Email Your CV
              </a>
              <Link to="/about" className="btn-secondary">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
