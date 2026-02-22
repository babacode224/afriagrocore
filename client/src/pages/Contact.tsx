"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Users, Briefcase, TrendingUp, Loader2 } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { trpc } from '@/lib/trpc';

export default function Contact() {
  useDocumentTitle('Contact Us - Get in Touch with AfriAgroCore');
  const [activeTab, setActiveTab] = useState<'farmer' | 'partner' | 'investor'>('farmer');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    waitlistFeatures: [] as string[],
  });
  const [error, setError] = useState('');
  
  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      setError('');
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  return (
    <main className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* --- HERO --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-bold text-5xl md:text-6xl mb-6">
              Let's <span className="text-emerald-400">Connect</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Whether you're a farmer seeking agricultural support, a logistics partner offering transportation services, a storage facility provider, a business partner interested in agritech collaboration, or an investor exploring opportunities in African agriculture technology, we're here to support your journey. Contact AfriAgroCore for inquiries about our precision farming platform, AI disease detection, marketplace solutions, logistics partnerships, storage facilities, and agricultural innovation opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- CONTACT FORM SECTION --- */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-2xl border border-slate-700">
              <h2 className="font-bold text-3xl mb-8">Get in Touch</h2>
              
              <div className="space-y-6 mb-12">
                <ContactInfo 
                  icon={<Mail className="text-emerald-400" size={20} />}
                  title="Email"
                  detail="info@africybercore.com"
                />
                <ContactInfo 
                  icon={<Phone className="text-emerald-400" size={20} />}
                  title="Phone"
                  detail="+234 (0) 8167205221"
                />
                <ContactInfo 
                  icon={<MapPin className="text-emerald-400" size={20} />}
                  title="Location"
                  detail="Lagos, Nigeria"
                />
              </div>

              <div className="pt-8 border-t border-slate-700">
                <p className="text-slate-400 text-sm mb-4">Response time: Within 24 hours</p>
                <p className="text-slate-500 text-xs">We're committed to supporting farmers, partners, and investors in transforming African agriculture.</p>
              </div>
            </div>

            {/* Right: Dynamic Form */}
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10">
              {!isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <h3 className="font-bold text-2xl mb-6">Contact Us</h3>

                  {/* Role Tabs */}
                  <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                    <RoleTab 
                      id="farmer"
                      label="Farmer"
                      icon={<Users size={16} />}
                      isActive={activeTab === 'farmer'}
                      onClick={() => setActiveTab('farmer')}
                    />
                    <RoleTab 
                      id="partner"
                      label="Partner"
                      icon={<Briefcase size={16} />}
                      isActive={activeTab === 'partner'}
                      onClick={() => setActiveTab('partner')}
                    />
                    <RoleTab 
                      id="investor"
                      label="Investor"
                      icon={<TrendingUp size={16} />}
                      isActive={activeTab === 'investor'}
                      onClick={() => setActiveTab('investor')}
                    />
                  </div>

                  {/* Form */}
                  <form onSubmit={(e) => { 
                    e.preventDefault(); 
                    submitContact.mutate({
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      role: activeTab,
                      message: formData.message,
                      waitlistFeatures: formData.waitlistFeatures,
                    });
                  }} className="space-y-6">
                    <Input 
                      label="Full Name" 
                      placeholder="Your name" 
                      value={formData.name}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                    <Input 
                      label="Email" 
                      placeholder="your@email.com" 
                      type="email"
                      value={formData.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                    <Input 
                      label="Phone (Optional)" 
                      placeholder="+234 XXX XXX XXXX" 
                      type="tel"
                      value={formData.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, phone: e.target.value})}
                    />

                    {/* Dynamic Fields */}
                    <AnimatePresence mode="wait">
                      {activeTab === 'farmer' && (
                        <motion.div 
                          key="farmer"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-6"
                        >
                          <Input label="Farm Location" placeholder="e.g. Kaduna, Nigeria" />
                          <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Primary Crop</label>
                            <select className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white">
                              <option>Maize</option>
                              <option>Cassava</option>
                              <option>Rice</option>
                              <option>Other</option>
                            </select>
                          </div>
                        </motion.div>
                      )}
                      {activeTab === 'partner' && (
                        <motion.div 
                          key="partner"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-6"
                        >
                          <Input label="Organization Name" placeholder="e.g. Ministry of Agriculture" />
                          <Input label="Role / Title" placeholder="Director of Innovation" />
                        </motion.div>
                      )}
                      {activeTab === 'investor' && (
                        <motion.div 
                          key="investor"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-6"
                        >
                          <Input label="Investment Fund / Company" placeholder="Your fund or company name" />
                          <Input label="Investment Focus" placeholder="e.g. Agritech, Impact Investing" />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Features I'm Interested In (Waitlist)</label>
                      <select 
                        multiple 
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white h-48"
                        style={{ backgroundImage: 'none' }}
                        value={formData.waitlistFeatures}
                        onChange={(e) => {
                          const selected = Array.from(e.target.selectedOptions, option => option.value);
                          setFormData({...formData, waitlistFeatures: selected});
                        }}
                      >
                        <option value="climate-forecasting" className="py-2">🌤️ Climate Forecasting & Weather Intelligence</option>
                        <option value="yield-optimization" className="py-2">📊 Yield Optimization Analytics</option>
                        <option value="soil-health" className="py-2">🌱 Soil & Crop Health Monitoring</option>
                        <option value="voice-assistant" className="py-2">🎤 Multilingual AI Voice Assistant</option>
                        <option value="expert-consultation" className="py-2">👨‍🌾 Expert Consultation Booking</option>
                        <option value="community-forums" className="py-2">💬 Community Forums & Peer Learning</option>
                        <option value="market-insights" className="py-2">💰 Real-time Market Insights</option>
                      </select>
                      <p className="text-xs text-slate-400 mt-1">Hold Ctrl (Windows) or Cmd (Mac) to select multiple features</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                      <textarea 
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white resize-none h-32" 
                        placeholder="Tell us about your needs..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        minLength={10}
                      ></textarea>
                    </div>

                    {error && (
                      <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
                        {error}
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={submitContact.isPending}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitContact.isPending ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              ) : (
                // Success State
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="w-24 h-24 bg-emerald-100/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-400">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="font-bold text-3xl mb-4">Message Sent!</h3>
                  <p className="text-slate-300">Thank you for reaching out. A member of our {activeTab} relations team will contact you shortly.</p>
                  <button onClick={() => setIsSubmitted(false)} className="mt-8 text-emerald-400 font-bold hover:underline">Send another</button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactInfo({ icon, title, detail }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-lg font-bold text-white">{detail}</p>
      </div>
    </div>
  );
}

function RoleTab({ id, label, icon, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all whitespace-nowrap ${
        isActive 
        ? 'bg-emerald-600 text-white shadow-md' 
        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
      }`}
    >
      {icon} {label}
    </button>
  );
}

function Input({ label, placeholder, type = "text", value, onChange, required }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-white placeholder-slate-500 transition-all"
      />
    </div>
  );
}
