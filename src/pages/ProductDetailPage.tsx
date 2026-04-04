import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, LayoutGrid, Activity, ShieldCheck, Zap } from 'lucide-react';
import { products } from '@/data/products';
import { Product } from '@/types/products';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find(p => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center text-foreground">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The system could not locate the requested portfolio item.</p>
        <button onClick={() => navigate('/products')} className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Go Back to Products
        </button>
      </div>
    );
  }

  // Predefined icon mapping to add visual flair to abstract features
  const getFeatureIcon = (index: number) => {
    const icons = [
      <ShieldCheck className="w-6 h-6 text-muted-foreground" />,
      <Activity className="w-6 h-6 text-muted-foreground" />,
      <Zap className="w-6 h-6 text-muted-foreground" />,
      <LayoutGrid className="w-6 h-6 text-muted-foreground" />
    ];
    return icons[index % icons.length];
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background">
      
      {/* Immersive Dark Header */}
      <div className="relative pt-32 pb-24 border-b border-white/[0.05] overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-12 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Portfolio
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 rounded-full bg-foreground/10 text-xs font-semibold tracking-widest uppercase text-foreground">
              {product.category.replace("-", " ")}
            </span>
            {product.status === 'ongoing' && (
              <span className="px-3 py-1 rounded-full bg-primary/20 text-xs font-semibold tracking-widest uppercase text-primary">
                Strategic Planning Phase
              </span>
            )}
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-4xl"
          >
            {product.name}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-foreground/60 font-light max-w-3xl leading-relaxed"
          >
            {product.description}
          </motion.p>
        </div>
      </div>

      {/* Detail Section */}
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-24">
            
            {/* Feature KPIs */}
            <section>
              <h2 className="text-2xl font-semibold mb-10 tracking-tight">Key Value Drivers</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {(product.features || []).map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="p-8 rounded-2xl bg-foreground/[0.02] border border-white/[0.05] flex flex-col items-start gap-4 hover:border-white/[0.1] hover:bg-foreground/[0.03] transition-colors"
                  >
                    {getFeatureIcon(i)}
                    <h3 className="text-lg font-medium leading-snug">{feature}</h3>
                  </motion.div>
                ))}
              </div>
            </section>

          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              
              <div className="p-8 rounded-2xl bg-foreground/[0.02] border border-white/[0.05]">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-foreground/50 mb-6">Technical Architecture</h3>
                <div className="flex flex-wrap gap-2">
                  {(product.technologies || []).map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-foreground/5 text-sm font-medium text-foreground/80">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-2xl bg-foreground/[0.02] border border-white/[0.05]">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-foreground/50 mb-6">Execution Context</h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between items-center pb-4 border-b border-foreground/[0.05]">
                    <dt className="text-foreground/50">Core Client</dt>
                    <dd className="font-medium text-right">{product.client || 'Enterprise'}</dd>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-foreground/[0.05]">
                    <dt className="text-foreground/50">Deployment Year</dt>
                    <dd className="font-medium">{product.year || '2025'}</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt className="text-foreground/50">Market Status</dt>
                    <dd className="font-medium flex items-center gap-2">
                      {product.status === 'completed' ? (
                        <><span className="w-2 h-2 rounded-full bg-green-500" /> Production Ready</>
                      ) : (
                        <><span className="w-2 h-2 rounded-full bg-amber-500" /> In Development</>
                      )}
                    </dd>
                  </div>
                </dl>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default ProductDetailPage;
