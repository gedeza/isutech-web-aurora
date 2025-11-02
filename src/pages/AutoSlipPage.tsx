import React, { useEffect, useState } from 'react';
import { Check, Zap, Mail, TrendingDown, MessageSquare, FileSpreadsheet, Shield, ChevronDown, ChevronUp, Clock, DollarSign, Smartphone, Target, Users, Award } from 'lucide-react';
import AutoSlipOnboardingForm from '@/components/AutoSlipOnboardingForm';

const AutoSlipPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'business' | 'professional'>('starter');

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(Math.min(progress, 100));

      // Show sticky CTA after scrolling past hero
      setShowStickyCTA(scrolled > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const openOnboarding = (plan: 'starter' | 'business' | 'professional' = 'starter') => {
    setSelectedPlan(plan);
    setOnboardingOpen(true);
  };

  const pricing = {
    business: [
      {
        name: 'Starter',
        icon: '💼',
        price: 99,
        originalPrice: 199,
        receipts: '50 receipts/month',
        team: '1-3 team members',
        features: [
          'WhatsApp instant processing',
          '98% OCR accuracy',
          'Weekly email reports',
          'Duplicate detection',
          'SA vendors optimized',
          'VAT extraction',
        ],
      },
      {
        name: 'Business',
        icon: '🚀',
        price: 199,
        originalPrice: 399,
        popular: true,
        receipts: '150 receipts/month',
        team: 'Up to 10 team members',
        features: [
          'Everything in Starter',
          'Priority support',
          'Custom report scheduling',
          'Multi-user management',
          'Monthly summary reports',
          'Expense categorization',
        ],
      },
      {
        name: 'Professional',
        icon: '⭐',
        price: 349,
        originalPrice: 699,
        receipts: '500 receipts/month',
        team: 'Unlimited team members',
        features: [
          'Everything in Business',
          'Phone support',
          'Dedicated account manager',
          'Custom integrations',
          'API access',
          'Priority processing',
        ],
      },
    ],
    accountant: [
      {
        name: 'Solo Practice',
        icon: '👤',
        price: 249,
        originalPrice: 499,
        receipts: '250 receipts/month',
        clients: '5 client companies',
        features: [
          'Centralized dashboard',
          'Client management',
          'Consolidated reporting',
          'White-label option',
        ],
      },
      {
        name: 'Small Practice',
        icon: '🏢',
        price: 649,
        originalPrice: 1299,
        receipts: '750 receipts/month',
        clients: '15 client companies',
        features: [
          'Everything in Solo',
          'Multi-accountant access',
          'Priority support',
          'Custom branding',
        ],
      },
      {
        name: 'Pro Practice',
        icon: '🏆',
        price: 1499,
        originalPrice: 2999,
        receipts: '2,500 receipts/month',
        clients: '50 client companies',
        features: [
          'Everything in Small Practice',
          'Dedicated account manager',
          'API integration',
          'Custom workflows',
        ],
      },
    ],
  };

  const faqs = [
    {
      question: 'How does the 14-day free trial work?',
      answer: 'Start using AutoSlip immediately with full access to all features. No credit card required. After 14 days, choose a plan to continue or cancel with no obligations.',
    },
    {
      question: 'What happens after the early adopter discount ends?',
      answer: "Your 50% discount is locked in for 3 months from when you sign up. After that, you'll pay the regular price. But as an early adopter, you'll get first access to new features and priority support.",
    },
    {
      question: 'Which South African vendors are supported?',
      answer: 'We support 50+ major SA vendors including Pick n Pay, Checkers, Woolworths, SPAR, Shoprite, Builders Warehouse, Makro, Game, Dis-Chem, Clicks, and more. Plus fuel stations (Shell, BP, Engen, Sasol) and general retailers.',
    },
    {
      question: 'Can I use AutoSlip with my existing accounting software?',
      answer: "Yes! AutoSlip generates Excel reports that can be imported into any accounting software including Xero, QuickBooks, Sage, Pastel, and more. We're working on direct integrations coming in 2026.",
    },
    {
      question: 'What if I go over my receipt limit?',
      answer: "We'll notify you when you reach 80% of your limit. You can upgrade to a higher plan anytime, or purchase additional receipt packs (50 receipts for R50) if you only need extra capacity occasionally.",
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level encryption for all data transmission and storage. Your receipts are stored on secure servers in Germany (Hetzner Cloud) with daily backups. We never share your data with third parties.',
    },
  ];

  return (
    <div className="autoslip-page">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Sticky CTA Button */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-500 ${
          showStickyCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        <button
          onClick={() => openOnboarding('starter')}
          className="flex items-center gap-2 px-6 py-4 bg-primary text-white font-bold rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 animate-pulse-glow"
        >
          <Zap className="w-5 h-5" />
          Start Free Trial
        </button>
      </div>

      {/* Hero Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Enhanced Early Adopter Banner */}
        <div className="container mx-auto mb-8">
          <div className="relative bg-gradient-to-r from-yellow-500/20 via-amber-500/30 to-yellow-500/20 border-2 border-yellow-500/50 rounded-2xl p-6 text-center overflow-hidden animate-pulse-glow animate-shimmer">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/20 to-transparent animate-shimmer" />

            <div className="relative z-10">
              <span className="text-sm sm:text-base md:text-lg font-bold animate-bounce-gentle inline-block">🎉 LIMITED TIME: </span>
              <span className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600 dark:text-yellow-400 animate-scale-pulse inline-block mx-2">
                50% OFF
              </span>
              <span className="text-sm sm:text-base md:text-lg"> for the first 50 customers! Lock in your discount for 3 months.</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 animate-fade-in">
              AutoSlip
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 text-foreground animate-fade-in delay-200">
              WhatsApp Receipt Processing
            </h2>
            <div className="space-y-4 mb-12 animate-fade-in delay-300">
              <h3 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground">
                No app downloads. No training. No hassle.
              </h3>
              <p className="text-xl text-muted-foreground">
                Just WhatsApp your receipt and get perfect Excel reports for your accountant.
              </p>
              <p className="text-lg font-semibold text-primary">
                Built for South African businesses • 98% accurate • Works in seconds
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in delay-400">
              <a
                href="mailto:info@isutech.co.za?subject=AutoSlip%20Free%20Trial"
                className="btn-primary"
              >
                Start 14-Day Free Trial
              </a>
              <a
                href="#how-it-works"
                className="btn-secondary"
              >
                See How It Works
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-muted-foreground animate-fade-in delay-500">
              <div className="flex items-center gap-2 justify-center">
                <Check className="text-green-500 w-5 h-5" />
                <span>50+ SA businesses</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="text-green-500 w-5 h-5" />
                <span>98% OCR accuracy</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="text-green-500 w-5 h-5" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <Check className="text-green-500 w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4 animate-fade-in">HOW IT WORKS</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in delay-200">
              Three simple steps to automated receipt management
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: '01',
                icon: <MessageSquare className="w-16 h-16" />,
                title: 'WhatsApp Your Receipt',
                description: 'Take a photo of your receipt and send it to our WhatsApp number. No app to download, no login required.',
              },
              {
                number: '02',
                icon: <Zap className="w-16 h-16" />,
                title: 'Instant AI Processing',
                description: 'Our AI extracts date, vendor, amount, VAT, and items in 1-2 seconds. Get instant WhatsApp confirmation with all the details.',
              },
              {
                number: '03',
                icon: <FileSpreadsheet className="w-16 h-16" />,
                title: 'Weekly Email Reports',
                description: 'Your accountant receives a professional Excel report every week with all receipts, ready to import into Xero, QuickBooks, or Sage.',
              },
            ].map((step, index) => (
              <div key={index} className="glass-card p-8 text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="text-5xl font-bold text-primary mb-4">{step.number}</div>
                <div className="text-primary mx-auto mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4">PRICING</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">
              All plans include: WhatsApp processing • Email reports • Duplicate detection • SA vendor optimization • VAT handling • 24/7 support
            </p>
          </div>

          {/* Business Plans */}
          <div className="mb-20">
            <h3 className="text-3xl font-bold text-center text-primary mb-4">Small Business Plans</h3>
            <p className="text-center text-muted-foreground mb-12">Perfect for sole proprietors, SMEs, and growing businesses</p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricing.business.map((plan, index) => (
                <div key={index} className={`glass-card p-4 sm:p-6 md:p-8 relative ${plan.popular ? 'ring-2 sm:ring-4 ring-primary sm:scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-5 sm:-top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 text-primary-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm shadow-lg animate-pulse-glow animate-shimmer relative overflow-hidden">
                        <span className="relative z-10">⭐ MOST POPULAR ⭐</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className="text-3xl sm:text-4xl md:text-5xl mb-4">{plan.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-muted-foreground line-through text-base sm:text-lg">R{plan.originalPrice}</span>
                    </div>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-2">
                      R{plan.price}
                    </div>
                    <div className="text-muted-foreground">/month</div>
                    <div className="mt-2 bg-red-500/20 text-red-500 inline-block px-4 py-1 rounded-full text-sm">
                      50% OFF Early Adopter
                    </div>
                    <div className="mt-4 text-sm font-semibold text-foreground">
                      {plan.receipts}
                    </div>
                    <div className="text-sm text-muted-foreground">{plan.team}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-muted-foreground">
                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 w-5 h-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openOnboarding(plan.name.toLowerCase() as 'starter' | 'business' | 'professional')}
                    className={`w-full block text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-primary text-white hover:scale-105'
                        : 'bg-background border-2 border-primary text-primary hover:bg-primary/10'
                    }`}
                  >
                    Start Free Trial
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Accountant Plans */}
          <div>
            <h3 className="text-3xl font-bold text-center text-purple-600 dark:text-purple-400 mb-4">Accountant Plans</h3>
            <p className="text-center text-muted-foreground mb-12">Manage multiple clients with ease</p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {pricing.accountant.map((plan, index) => (
                <div key={index} className="glass-card p-8">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{plan.icon}</div>
                    <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                    <div className="mb-2">
                      <span className="text-muted-foreground line-through text-lg">R{plan.originalPrice}</span>
                    </div>
                    <div className="text-5xl font-bold text-primary mb-2">
                      R{plan.price}
                    </div>
                    <div className="text-muted-foreground">/month</div>
                    <div className="mt-2 bg-red-500/20 text-red-500 inline-block px-4 py-1 rounded-full text-sm">
                      50% OFF Early Adopter
                    </div>
                    <div className="mt-4 text-sm font-semibold text-foreground">{plan.clients}</div>
                    <div className="text-sm text-muted-foreground">{plan.receipts}</div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-muted-foreground">
                        <Check className="text-green-500 mr-2 mt-1 flex-shrink-0 w-5 h-5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => openOnboarding('professional')}
                    className="w-full block text-center py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-background border-2 border-primary text-primary hover:bg-primary/10"
                  >
                    Start Free Trial
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why AutoSlip Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4">WHY AUTOSLIP?</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Built Different for South African Businesses</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We've reimagined receipt management from the ground up - no complex apps, no training needed, just WhatsApp and results.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {[
              {
                icon: <Smartphone className="w-12 h-12" />,
                title: 'WhatsApp-Native Solution',
                description: 'No app downloads, no logins, no training. Your team already knows how to use it. Just snap and send - it\'s that simple.',
                highlight: 'Zero learning curve',
              },
              {
                icon: <Target className="w-12 h-12" />,
                title: 'SA Vendor Optimized',
                description: 'Built specifically for South African retailers. Trained on Pick n Pay, Woolworths, Checkers, and 50+ SA vendors for unmatched accuracy.',
                highlight: '98% OCR accuracy',
              },
              {
                icon: <Clock className="w-12 h-12" />,
                title: 'Instant Processing',
                description: 'Results in 1-2 seconds, not minutes. Get immediate WhatsApp confirmation with all extracted details so you know it worked.',
                highlight: '30-second setup',
              },
              {
                icon: <DollarSign className="w-12 h-12" />,
                title: 'Transparent Pricing',
                description: 'R99-R349/month for businesses. No hidden fees, no per-user charges, no surprise costs. 50% cheaper than traditional solutions.',
                highlight: 'Save up to 61%',
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: 'Team-Friendly',
                description: 'Everyone can use their own phone. No expensive licenses per user. Perfect for field teams, contractors, and remote workers.',
                highlight: 'Unlimited devices',
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: 'Built for Accountants',
                description: 'Professional Excel reports delivered weekly. VAT extraction, duplicate detection, and expense categorization included. Works with Xero, Sage, QuickBooks.',
                highlight: 'Accountant-ready',
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="glass-card p-4 sm:p-6 md:p-8 md:hover:scale-105 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-primary mb-4 md:group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <div className="inline-block bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {benefit.highlight}
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="glass-card p-8 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">SA Businesses Trust Us</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">OCR Accuracy Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">1-2s</div>
                <div className="text-muted-foreground">Processing Time</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">50%</div>
                <div className="text-muted-foreground">Cheaper Than Alternatives</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-foreground mb-4">
              Stop paying for features you don't need.
            </p>
            <p className="text-xl text-muted-foreground mb-6">
              AutoSlip gives you exactly what you need - nothing more, nothing less.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
            >
              See Pricing Plans
              <ChevronDown className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-lg text-primary mb-4">FAQ</h3>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass-card overflow-hidden hover:glow-border transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-8 text-left flex justify-between items-center hover:bg-muted/30 transition-colors"
                >
                  <h3 className="text-xl font-bold pr-4">{faq.question}</h3>
                  {openFAQ === index ? (
                    <ChevronUp className="w-6 h-6 flex-shrink-0 text-primary" />
                  ) : (
                    <ChevronDown className="w-6 h-6 flex-shrink-0 text-primary" />
                  )}
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                  style={{ overflow: 'hidden' }}
                >
                  <p className="px-8 pb-8 text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/20 to-purple-600/20">
        <div className="container mx-auto">
          <div className="glass-card p-12 text-center max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Stop Losing Receipts?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
              Join 50+ South African businesses already saving time and money with AutoSlip.
              Start your free 14-day trial today - no credit card required.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-background/30 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl mb-3"><Zap /></div>
                <h3 className="font-bold text-xl mb-2">Setup in 30 seconds</h3>
                <p className="text-muted-foreground text-sm">Just WhatsApp your first receipt</p>
              </div>
              <div className="bg-background/30 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl mb-3"><TrendingDown /></div>
                <h3 className="font-bold text-xl mb-2">Save R314/month</h3>
                <p className="text-muted-foreground text-sm">61% cheaper than competitors</p>
              </div>
              <div className="bg-background/30 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl mb-3"><Shield /></div>
                <h3 className="font-bold text-xl mb-2">98% OCR accuracy</h3>
                <p className="text-muted-foreground text-sm">Built for SA receipts</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="mailto:info@isutech.co.za?subject=AutoSlip%20Free%20Trial"
                className="px-12 py-5 bg-primary text-white text-xl font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              >
                Start Free 14-Day Trial
              </a>

              <a
                href="#pricing"
                className="px-12 py-5 bg-transparent border-2 border-primary text-primary text-xl font-bold rounded-xl hover:bg-primary/10 transition-all duration-300"
              >
                View Pricing
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                <span>50% OFF early adopter pricing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="text-green-500 w-5 h-5" />
                <span>Setup support included</span>
              </div>
            </div>

            {/* Urgency Banner */}
            <div className="mt-8 bg-red-500/20 border border-red-500/50 rounded-2xl px-6 py-4 inline-block animate-pulse-glow">
              <p className="text-red-500 font-bold">
                ⏰ Early Adopter Discount: Only 50 spots available at 50% OFF
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Form Modal */}
      <AutoSlipOnboardingForm
        open={onboardingOpen}
        onOpenChange={setOnboardingOpen}
        defaultPlan={selectedPlan}
      />
    </div>
  );
};

export default AutoSlipPage;
