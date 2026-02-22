"use client";
import { motion } from 'framer-motion';
import { Mic, MessageSquareHeart, UsersRound, Video, Globe, Star, Calendar, ArrowRight, Phone, Award, Headset } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Link } from 'wouter';
import WaitlistModal from '@/components/WaitlistModal';
import { useState } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Community() {
  useDocumentTitle('Community - Expert Consultations & Farmer Network');
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistFeature, setWaitlistFeature] = useState({ name: '', description: '' });

  const showWaitlist = (name: string, description: string) => {
    setWaitlistFeature({ name, description });
    setWaitlistOpen(true);
  };

  const experts = [
    {
      name: "Dr. Amara Okonkwo",
      specialty: "Crop Diseases & Pest Management",
      rating: 4.9,
      reviews: 287,
      languages: ["English", "Yoruba"],
      availability: "Available Today"
    },
    {
      name: "James Kipchoge",
      specialty: "Soil Health & Fertilization",
      rating: 4.8,
      reviews: 312,
      languages: ["English", "Swahili"],
      availability: "Available Today"
    },
    {
      name: "Fatima Hassan",
      specialty: "Water Management & Irrigation",
      rating: 4.9,
      reviews: 256,
      languages: ["English", "Arabic", "Hausa"],
      availability: "Available in 2h"
    },
    {
      name: "Samuel Mwangi",
      specialty: "Crop Yield Optimization",
      rating: 4.7,
      reviews: 198,
      languages: ["English", "Swahili"],
      availability: "Available Tomorrow"
    }
  ];

  const testimonials = [
    {
      name: "Kofi Mensah",
      crop: "Maize",
      improvement: "200% Yield Increase",
      quote: "The voice chatbot helped me identify early blight before it spread. My harvest was 2x better this season!"
    },
    {
      name: "Amina Diallo",
      crop: "Vegetables",
      improvement: "40% Cost Reduction",
      quote: "Expert consultations saved me thousands on unnecessary fertilizer. Now I farm smarter, not harder."
    },
    {
      name: "David Okafor",
      crop: "Rice",
      improvement: "150% Profit Growth",
      quote: "The community forum connected me with buyers. I now sell directly without middlemen!"
    }
  ];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 -mr-40 -mt-40 w-[700px] h-[700px] bg-emerald-500/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-bold text-5xl md:text-6xl text-white mb-6">
              Join a Thriving <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-300">Farming Community</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10">
              Connect with certified agricultural experts and agronomists, logistics partners, storage facility providers, join farmer discussion forums, and access multilingual AI-powered farming guidance 24/7. Our agricultural community platform provides peer-to-peer knowledge sharing, expert consultations, transportation solutions, and voice-enabled support in local African languages for smallholder farmers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => showWaitlist('Community Features', '')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Mic size={20} /> Start Voice Chat
              </button>
              <button 
                onClick={() => showWaitlist('Community Features', '')}
                className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
              >
                Book Expert Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- VOICE CHATBOT SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src="/images/community-voice-chatbot-new.webp" alt="Voice Chatbot" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-emerald-50 p-3 rounded-xl w-fit text-emerald-600 mb-6">
                <Mic size={32} />
              </div>
              <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6">
                AI Voice Assistant Available 24/7
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Speak in your native language and get instant agricultural advice from our multilingual AI voice assistant. Our intelligent chatbot understands local dialects and farming contexts, providing personalized crop recommendations, pest identification, weather forecasts, and market price updates for African farmers. Access expert farming knowledge through voice commands in Swahili, Yoruba, Hausa, and 12+ other languages.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Support for 15+ African languages",
                  "Real-time disease & pest identification",
                  "Weather-based farming recommendations",
                  "Market price updates and trends"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => showWaitlist('Community Features', '')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-all flex items-center gap-2"
              >
                Try Voice Chat <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- EXPERT CONSULTANTS SECTION --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-4">Certified Agricultural Experts</h2>
            <p className="text-slate-600 text-lg">Book video consultations with experienced agronomists who understand your local climate and crops.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experts.map((expert, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">{expert.name}</h3>
                <p className="text-emerald-600 font-semibold text-sm mb-4">{expert.specialty}</p>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">({expert.reviews})</span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{expert.languages.join(', ')}</p>
                <p className="text-sm font-semibold text-emerald-600 mb-6">{expert.availability}</p>
                <button 
                  onClick={() => showWaitlist('Community Features', '')}
                  className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Video size={18} /> Book Consultation
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- EXPERT CONSULTATION SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-teal-50 p-3 rounded-xl w-fit text-teal-600 mb-6">
                <Video size={32} />
              </div>
              <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6">
                One-on-One Expert Consultations
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Schedule personalized video calls with agricultural experts. Get tailored advice for your specific crops, soil conditions, and challenges.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Flexible scheduling - book at your convenience",
                  "Real-time problem solving with visual analysis",
                  "Customized action plans for your farm",
                  "Follow-up support and progress tracking"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <Award size={20} className="text-teal-600 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => showWaitlist('Community Features', '')}
                className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-semibold transition-all flex items-center gap-2"
              >
                Schedule Now <ArrowRight size={20} />
              </button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src="/images/community-expert-consultation-new.webp" alt="Expert Consultation" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FARMER SUCCESS STORIES --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-4">Farmer Success Stories</h2>
            <p className="text-slate-600 text-lg">Real farmers, real results. See how our community transformed their harvests.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill="#fbbf24" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="border-t pt-6">
                  <h4 className="font-bold text-slate-900 mb-1">{testimonial.name}</h4>
                  <p className="text-emerald-600 font-semibold mb-2">{testimonial.crop} Farmer</p>
                  <p className="text-lg font-bold text-teal-600">{testimonial.improvement}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PEER LEARNING SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src="/images/community-peer-learning-new.webp" alt="Peer Learning" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-emerald-50 p-3 rounded-xl w-fit text-emerald-600 mb-6">
                <UsersRound size={32} />
              </div>
              <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6">
                Learn from Fellow Farmers
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Join active discussion forums where farmers share experiences, tips, and solutions. Ask questions and get answers from your community.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Q&A forums organized by crop type",
                  "Proven farming techniques and best practices",
                  "Regional weather and market discussions",
                  "Success stories and lessons learned"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <MessageSquareHeart size={20} className="text-emerald-600 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => showWaitlist('Community Features', '')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold transition-all flex items-center gap-2"
              >
                Join Community <ArrowRight size={20} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- COMMUNITY STATS --- */}
      <section className="py-24 bg-gradient-to-br from-emerald-900 to-teal-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Farmers" },
              { number: "200+", label: "Expert Consultants" },
              { number: "1M+", label: "Questions Answered" },
              { number: "4.8★", label: "Average Rating" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</h3>
                <p className="text-emerald-100 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6">Ready to Join the Community?</h2>
          <p className="text-slate-600 text-xl mb-10">Start connecting with experts and farmers today. Get your first voice consultation free.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => showWaitlist('Community Features', '')}
              className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              <Mic size={20} /> Start Free Trial
            </button>
            <button 
              onClick={() => showWaitlist('Community Features', '')}
              className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              Learn More
            </button>
          </div>
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
