"use client";
import { motion } from 'framer-motion';
import { Bug, CloudSun, Droplet, TrendingUp, MapPin, ArrowRight, Sparkles, ScanLine, Sprout, Wind, Gauge, Brain, ShieldAlert } from 'lucide-react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { Link } from 'wouter';
import WaitlistModal from '@/components/WaitlistModal';
import { useState } from 'react';

export default function AISolutions() {
  useDocumentTitle('AI Solutions - Disease Detection & Smart Farming');
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistFeature, setWaitlistFeature] = useState({ name: '', description: '' });

  const showWaitlist = (name: string, description: string) => {
    setWaitlistFeature({ name, description });
    setWaitlistOpen(true);
  };

  const weatherForecast = [
    { day: "Today", high: 28, low: 22, condition: "Sunny", icon: "☀️", humidity: 65, wind: 12 },
    { day: "Tomorrow", high: 26, low: 20, condition: "Cloudy", icon: "☁️", humidity: 72, wind: 15 },
    { day: "Wed", high: 24, low: 18, condition: "Rainy", icon: "🌧️", humidity: 85, wind: 20 },
    { day: "Thu", high: 27, low: 21, condition: "Partly Cloudy", icon: "⛅", humidity: 68, wind: 10 },
    { day: "Fri", high: 29, low: 23, condition: "Sunny", icon: "☀️", humidity: 60, wind: 8 }
  ];

  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-900 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ x: [0, 50, -30, 0], y: [0, -50, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 right-0 -mr-40 -mt-40 w-[700px] h-[700px] bg-blue-500/20 rounded-full blur-3xl"
          ></motion.div>
          <motion.div 
            animate={{ x: [0, -50, 30, 0], y: [0, 50, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-bold text-5xl md:text-6xl text-white mb-6">
              AI-Powered <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Farm Intelligence</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-10">
              From AI-powered crop disease detection and pest identification to precision weather forecasting and yield prediction, our artificial intelligence agricultural platform sees what the human eye cannot. Make smarter, data-driven farming decisions every day with advanced machine learning technology for African agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => showWaitlist('AI Features', '')}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-semibold text-lg transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles size={20} /> Explore Features
              </button>
              <button 
                onClick={() => showWaitlist('AI Features', '')}
                className="px-8 py-4 bg-white/20 hover:bg-white/30 text-white border border-white/40 rounded-full font-semibold text-lg transition-all flex items-center justify-center"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- FEATURE 1: Disease Detection --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-emerald-500/10 p-4 rounded-xl w-fit text-emerald-600 mb-6">
                <ScanLine size={32} />
              </div>
              <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6">
                AI Disease and Pest Detection
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Upload a photo of your crop using our AI-powered plant disease detection system. Our advanced deep learning model identifies crop diseases, pest infestations, and plant health issues in seconds with 95%+ accuracy, providing localized treatment recommendations and agricultural best practices for African farmers.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Real-time image analysis with 95%+ accuracy",
                  "Localized treatment recommendations",
                  "Preventive alerts based on weather patterns",
                  "Disease severity assessment"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <div className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/ai-disease-detection">
                <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-all">
                  Try Now
                </button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[9/16] rounded-3xl bg-slate-900 overflow-hidden relative shadow-2xl border-8 border-slate-800">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 to-transparent z-10"></div>
                <img src="/images/disease-detection-diverse.webp" alt="Disease Detection" className="w-full h-full object-cover" loading="lazy" />

                <motion.div 
                  animate={{ top: ["10%", "90%", "10%"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute left-0 right-0 h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.8)] z-20"
                />

                <div className="absolute bottom-0 w-full p-6 bg-slate-900/90 backdrop-blur-md z-30 border-t border-slate-700">
                  <div className="flex items-center gap-3 mb-2">
                    <ShieldAlert className="text-yellow-500" size={20} />
                    <span className="text-white font-bold">Early Blight Detected</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                    <div className="w-[92%] h-full bg-yellow-500"></div>
                  </div>
                  <p className="text-slate-400 text-xs">Confidence: 92%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 2: Weather Forecast --- */}
      <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="bg-blue-500/10 p-4 rounded-xl w-fit text-blue-600 mb-6 mx-auto">
              <CloudSun size={32} />
            </div>
            <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Hyper-Local Weather Forecasting
            </h2>
            <p className="text-slate-600 text-lg">
              Don't just check the weather. Get AI-powered hyper-local weather forecasts and climate predictions tailored specifically to your farm location with actionable agricultural insights for planting, irrigation, and harvesting decisions. Our precision agriculture weather system helps farmers optimize operations and reduce climate-related risks.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-4 mb-12">
            {weatherForecast.map((day, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all text-center"
              >
                <p className="font-bold text-slate-900 mb-2">{day.day}</p>
                <div className="text-5xl mb-4">{day.icon}</div>
                <p className="text-sm text-slate-600 mb-4">{day.condition}</p>
                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-lg p-3 mb-4">
                  <p className="text-2xl font-bold text-slate-900">{day.high}°C</p>
                  <p className="text-xs text-slate-600">Low: {day.low}°C</p>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-center gap-2 text-slate-600">
                    <Droplet size={14} /> {day.humidity}%
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-600">
                    <Wind size={14} /> {day.wind} km/h
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Weather Insights Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
                <CloudSun size={24} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Optimal Spray Windows</h3>
              <p className="text-slate-600 text-sm mb-4">
                Identifies low wind speed and no-rain periods to ensure your chemicals aren't wasted.
              </p>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 text-center">
                <span className="text-xs text-blue-700 uppercase font-bold tracking-wider">Next Window</span>
                <p className="text-blue-600 font-bold mt-1">Today, 4:00 PM</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mb-6">
                <ShieldAlert size={24} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Climate Risk Alerts</h3>
              <p className="text-slate-600 text-sm mb-4">
                Real-time alerts for frost, heavy rain, or heatwaves based on historical and current data.
              </p>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                <span className="text-xs text-red-800 uppercase font-bold tracking-wider">Alert Status</span>
                <p className="text-red-600 font-bold mt-1">Frost Warning (Tonight)</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-cyan-100 text-cyan-600 rounded-lg flex items-center justify-center mb-6">
                <Droplet size={24} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Smart Irrigation</h3>
              <p className="text-slate-600 text-sm mb-4">
                Calculates exact water needs based on crop growth stage and soil moisture models.
              </p>
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-100 text-center">
                <span className="text-xs text-cyan-700 uppercase font-bold tracking-wider">Soil Moisture</span>
                <p className="text-cyan-600 font-bold mt-1">42% (Optimal)</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 3: Yield Optimization --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-cyan-500/10 p-4 rounded-xl w-fit text-cyan-600 mb-6">
                <TrendingUp size={32} />
              </div>
              <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-6">
                Yield Optimization & Predictive Analytics
              </h2>
              <p className="text-slate-600 text-lg mb-8">
                Move beyond simple diagnostics to long-term operational planning. We integrate satellite data to see your farm from above and predict optimal harvest timing.
              </p>
              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Variable Rate Application (VRA)</h4>
                    <p className="text-slate-600 text-sm mt-1">Generates prescription maps instructing machinery exactly where to apply fertilizer, minimizing waste.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Harvest Prediction</h4>
                    <p className="text-slate-600 text-sm mt-1">Uses Growing Degree Days (GDD) to predict the optimal harvest window for maximum commercial value.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Yield Forecasting</h4>
                    <p className="text-slate-600 text-sm mt-1">Predict crop yields weeks in advance based on growth patterns, weather, and historical data.</p>
                  </div>
                </div>
              </div>
              <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-semibold transition-all">
                Learn More
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden relative shadow-2xl border border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/40 to-transparent z-10"></div>
                <img src="/images/farm-hero-diverse.webp" alt="Yield Optimization" className="w-full h-full object-cover" loading="lazy" />

                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-1/3 left-1/4 bg-slate-900/80 backdrop-blur border border-emerald-500/50 p-3 rounded-lg text-xs text-emerald-400 font-semibold"
                >
                  NDVI: 0.85 (High)
                </motion.div>
                <motion.div 
                   initial={{ scale: 0 }}
                   whileInView={{ scale: 1 }}
                   transition={{ delay: 0.4 }}
                   className="absolute bottom-1/3 right-1/4 bg-slate-900/80 backdrop-blur border border-red-500/50 p-3 rounded-lg text-xs text-red-400 font-semibold"
                >
                  NDVI: 0.32 (Stress)
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- FEATURE 4: Soil & Crop Health --- */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-bold text-4xl md:text-5xl text-slate-900 mb-4">
              Soil & Crop Health Monitoring
            </h2>
            <p className="text-slate-600 text-lg">
              Real-time insights into soil nutrients, pH levels, and crop health to optimize every farming decision.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mb-6">
                <Sprout size={24} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Nutrient Analysis</h3>
              <p className="text-slate-600 text-sm mb-6">
                AI-powered analysis of soil samples to determine nutrient levels and recommend precise fertilizer applications.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">✓ NPK levels (Nitrogen, Phosphorus, Potassium)</li>
                <li className="flex items-center gap-2">✓ Micronutrient detection</li>
                <li className="flex items-center gap-2">✓ pH balance recommendations</li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mb-6">
                <Gauge size={24} />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-3">Growth Monitoring</h3>
              <p className="text-slate-600 text-sm mb-6">
                Track crop development stages and growth rates to ensure optimal conditions at every phase.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">✓ Biomass estimation</li>
                <li className="flex items-center gap-2">✓ Leaf area index (LAI)</li>
                <li className="flex items-center gap-2">✓ Growth stage prediction</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="font-bold text-4xl md:text-5xl mb-6">Ready to Farm Smarter?</h2>
          <p className="text-xl mb-10 text-blue-50">Join thousands of farmers using AI to increase yields and reduce costs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => showWaitlist('AI Features', '')}
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold text-lg transition-all hover:bg-blue-50 flex items-center justify-center gap-2"
            >
              <Sparkles size={20} /> Get a Demo
            </button>
            <button 
              onClick={() => showWaitlist('AI Features', '')}
              className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              Start Free Trial <ArrowRight size={20} />
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
