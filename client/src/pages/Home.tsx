"use client";

import { useAuth } from '@/_core/hooks/useAuth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, UsersRound, Store, GraduationCap, Smartphone, Truck, Warehouse } from 'lucide-react';
import { Link } from 'wouter';
import ImageSlider from '@/components/ImageSlider';
import AnimatedText from '@/components/AnimatedText';
import Testimonials from '@/components/Testimonials';
import WaitlistModal from '@/components/WaitlistModal';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  // Set page title dynamically (30-60 characters for SEO)
  useDocumentTitle('AfriAgroCore - AI Farming Platform for Africa');
  
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistFeature, setWaitlistFeature] = useState({ name: '', description: '' });

  const showWaitlist = (name: string, description: string) => {
    setWaitlistFeature({ name, description });
    setWaitlistOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: [0, 30, -15, 0], y: [0, -30, 15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-emerald-500/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, -30, 15, 0], y: [0, 30, -15, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[700px] h-[700px] bg-teal-500/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-400/10 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="text-left">
              <motion.h1 variants={fadeInUp} className="font-bold text-4xl md:text-5xl text-white tracking-tight mb-6">
                Precision Farming <br />
                <AnimatedText />
              </motion.h1>
              <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed">
                AfriAgroCore is a comprehensive AI-powered precision agriculture platform that supports African farmers with early crop disease and pest detection, climate forecasting, real-time agricultural market insights, access to verified agricultural consultants and agro-chemical suppliers, logistics partners for farm produce transportation, and storage facilities for product preservation. Transform your farming with smart agriculture technology.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
                <button 
          onClick={() => showWaitlist('AI Features', '')}
                  className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg shadow-emerald-200 flex items-center justify-center gap-2"
                >
                  Explore AI Features <ArrowRight size={20} />
                </button>
                <button 
          onClick={() => showWaitlist('Partnership Opportunities', '')}
                  className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
                >
                  Partner With Us
                </button>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <ImageSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SECTION --- */}
      <Testimonials />

      {/* --- VISION & MISSION SECTION --- */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-900/40 to-transparent z-10 overflow-hidden relative shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent z-10"></div>
                <img 
                  srcSet="/images/farm-hero-diverse-sm.webp 640w, /images/farm-hero-diverse-desktop.webp 774w, /images/farm-hero-diverse-md.webp 1024w, /images/farm-hero-diverse.webp 1536w"
                  sizes="(max-width: 640px) 640px, (max-width: 774px) 774px, (max-width: 1024px) 1024px, 1536px"
                  src="/images/farm-hero-diverse.webp" 
                  alt="Precision Farming" 
                  className="w-full h-full object-cover" 
                  loading="lazy" 
                  width="774" 
                  height="432"
                />
              </div>
            </div>

            <div>
              <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-6">Our Vision & Mission</h2>
              <p className="text-lg text-slate-600 mb-6">
                Our core mission is to make precision farming and smart agriculture accessible to African farmers through language-inclusive technology. We integrate cutting-edge artificial intelligence for crop diagnostics, a transparent agricultural e-commerce marketplace, and robust farming community tools to empower sustainable agriculture across Africa.
              </p>
              <ul className="space-y-4">
                {[
                  "Maximize crop yields through predictive analytics.",
                  "Reduce risk with hyper-local weather forecasting.",
                  "Direct market access, removing unnecessary intermediaries.",
                  "Seamless logistics for farm-to-market transportation.",
                  "Reliable storage facilities to preserve agricultural products.",
                  "Inclusive technology bridging the literacy gap."
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- TECHNOLOGY SHOWCASE --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-4">AI-Powered Agriculture</h2>
            <p className="text-slate-600 text-lg">Harness cutting-edge artificial intelligence, machine learning, and IoT sensor technology to optimize every aspect of your farming operation. Our smart agriculture solutions help farmers increase productivity, reduce costs, and improve crop yields through data-driven precision farming.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                srcSet="/images/ai-tech-farm-sm.webp 640w, /images/ai-tech-farm-desktop.webp 584w, /images/ai-tech-farm-md.webp 1024w, /images/ai-tech-farm.webp 1536w"
                sizes="(max-width: 640px) 640px, (max-width: 584px) 584px, (max-width: 1024px) 1024px, 1536px"
                src="/images/ai-tech-farm.webp" 
                alt="AI Technology in Farming" 
                className="w-full h-full object-cover" 
                loading="lazy"
                width="584"
                height="326"
              />
            </div>
            <div>
              <h3 className="font-bold text-2xl text-slate-900 mb-6">Real-Time Crop Intelligence</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Our advanced AI-powered agricultural systems analyze satellite imagery, drone data, and IoT ground sensors to provide instant insights on crop health monitoring, early disease detection, pest threats, and optimal harvest timing. Empower your farm with real-time precision agriculture intelligence.</p>
              <ul className="space-y-4">
                {[
                  { title: "Disease Detection", desc: "Identify crop diseases 2-3 weeks before visible symptoms" },
                  { title: "Yield Prediction", desc: "Forecast yields with 92% accuracy using ML models" },
                  { title: "Resource Optimization", desc: "Reduce water and fertilizer usage by up to 40%" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 bg-emerald-500 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-bold text-2xl text-slate-900 mb-6">Precision Farming at Scale</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">Deploy IoT sensors and smart farming devices across your agricultural fields to collect real-time data on soil moisture, temperature, nutrient levels, and pest activity. Make data-driven farming decisions instantly with our precision agriculture platform and improve your farm management efficiency.</p>
              <ul className="space-y-4">
                {[
                  { title: "IoT Sensor Network", desc: "Deploy and manage thousands of sensors" },
                  { title: "Real-Time Alerts", desc: "Get instant notifications on crop threats" },
                  { title: "Automated Recommendations", desc: "AI-driven actions for optimal results" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-1 bg-teal-500 rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-slate-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                srcSet="/images/smart-farming-sm.webp 640w, /images/smart-farming-desktop.webp 584w, /images/smart-farming-md.webp 1024w, /images/smart-farming.webp 1536w"
                sizes="(max-width: 640px) 640px, (max-width: 584px) 584px, (max-width: 1024px) 1024px, 1536px"
                src="/images/smart-farming.webp" 
                alt="Smart Farming Technology" 
                className="w-full h-full object-cover" 
                loading="lazy"
                width="584"
                height="326"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- ADVANCED FEATURES --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-4">Advanced Agricultural Solutions</h2>
            <p className="text-slate-600 text-lg">From AI-powered crop health monitoring and disease detection to automated harvesting and yield optimization, we provide end-to-end agricultural technology solutions for modern farmers. Discover comprehensive smart farming tools designed for African agriculture.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <img src="/images/crop-health.webp" alt="Crop Health" className="w-full h-64 object-cover" loading="lazy" />
              <div className="p-8">
                <h3 className="font-bold text-xl text-slate-900 mb-3">Crop Health Monitoring</h3>
                <p className="text-slate-600 mb-4">AI-powered analysis of plant vitality, water stress, and nutrient levels with real-time health scores.</p>
                <Link href="/ai-solutions" className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <img src="/images/harvest-tech.webp" alt="Harvest Technology" className="w-full h-64 object-cover" loading="lazy" />
              <div className="p-8">
                <h3 className="font-bold text-xl text-slate-900 mb-3">Automated Harvesting</h3>
                <p className="text-slate-600 mb-4">Intelligent harvesting systems with data analytics to maximize yield and minimize crop loss.</p>
                <Link href="/ai-solutions" className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all">
              <img src="/images/farm-hero.webp" alt="Precision Agriculture" className="w-full h-64 object-cover" loading="lazy" />
              <div className="p-8">
                <h3 className="font-bold text-xl text-slate-900 mb-3">Precision Analytics</h3>
                <p className="text-slate-600 mb-4">Comprehensive dashboards showing field performance, trends, and predictive insights for better planning.</p>
                <Link href="/ai-solutions" className="text-emerald-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Learn more <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MODULE PREVIEWS --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-4">Our Core Pillars</h2>
            <p className="text-slate-600">The platform is divided into integrated modules to support every aspect of the agricultural lifecycle.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Sparkles />} 
              title="AI Diagnostics" 
              desc="Deep learning models for disease detection, pest identification, and yield optimization."
              link="/ai-solutions"
            />
            <FeatureCard 
              icon={<UsersRound />} 
              title="Community" 
              desc="Multilingual voice chatbots and direct access to certified agricultural experts."
              link="/community"
            />
            <FeatureCard 
              icon={<Store />} 
              title="Marketplace" 
              desc="Verified e-commerce for inputs and a direct B2B/B2C produce sales portal."
              link="/marketplace"
            />
            <FeatureCard 
              icon={<GraduationCap />} 
              title="Knowledge" 
              desc="Adaptive learning platforms with content localized to region and crop type."
              link="/learning"
            />
            <FeatureCard 
              icon={<Truck />} 
              title="Logistics" 
              desc="Reliable transportation partners to move farm produce from farms to markets and end-users."
              link="/marketplace"
            />
            <FeatureCard 
              icon={<Warehouse />} 
              title="Storage" 
              desc="Cold storage and warehousing facilities to preserve agricultural products and reduce post-harvest losses."
              link="/marketplace"
            />
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-bold text-3xl md:text-4xl mb-6">Ready to transform agriculture?</h2>
          <p className="text-emerald-100 text-lg mb-8">Join the platform that is redefining how Africa farms, trades, and grows.</p>
          <Link href="/contact" className="inline-block bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
            Contact Us Today
          </Link>
        </div>
      </section>

      <WaitlistModal
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
        featureName={waitlistFeature.name}
        description={waitlistFeature.description}
      />
    </main>
  );
}

function FeatureCard({ icon, title, desc, link }: { icon: any, title: string, desc: string, link: string }) {
  return (
    <Link href={link} className="group">
      <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 h-full">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h3 className="font-bold text-xl text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4">{desc}</p>
        <div className="text-emerald-600 font-semibold text-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
          Learn more <ArrowRight size={16} />
        </div>
      </div>
    </Link>
  );
}
