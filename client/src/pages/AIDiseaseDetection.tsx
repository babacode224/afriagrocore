import { useEffect } from 'react';
import { Link } from 'wouter';

/**
 * AI Disease Detection Page
 * Provides information and link to the disease detection tool
 */
export default function AIDiseaseDetection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            AI Disease & Pest Detection
          </h1>
          <p className="text-xl text-slate-600">
            Upload a photo of your crop to identify diseases and pests with 95%+ accuracy
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Instant Analysis</h3>
            <p className="text-slate-600 text-sm">Get results in seconds with our AI-powered detection system</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="font-semibold text-lg mb-2">95%+ Accuracy</h3>
            <p className="text-slate-600 text-sm">Trained on thousands of crop disease images</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-3">💡</div>
            <h3 className="font-semibold text-lg mb-2">Treatment Tips</h3>
            <p className="text-slate-600 text-sm">Receive recommended treatments for detected issues</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="http://41.79.5.8:5173/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-12 py-4 rounded-full font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl"
          >
            Launch Detection Tool →
          </a>
          <p className="text-slate-500 text-sm mt-4">Opens in a new tab</p>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12">
          <Link href="/ai-solutions" className="text-emerald-600 hover:text-emerald-700 font-semibold">
            ← Back to AI Solutions
          </Link>
        </div>
      </div>
    </div>
  );
}
