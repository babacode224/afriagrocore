import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  story: string;
  image: string;
  rating: number;
  yield_improvement: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Samuel Kipchoge',
    story: 'Using AfriAgroCore AI disease detection, I identified cassava brown streak virus 3 weeks early. This saved 40% of my harvest and increased my income by 35%.',
    image: '/images/farmer1.webp',
    rating: 5,
    yield_improvement: '+35% yield increase'
  },
  {
    name: 'Grace Mwangi',
    story: 'The weather forecasting feature helped me plan my maize planting perfectly. I avoided the drought and got the best harvest in 10 years. AfriAgroCore changed my farming!',
    image: '/images/farmer2.webp',
    rating: 5,
    yield_improvement: '+42% yield increase'
  },
  {
    name: 'Joseph Okonkwo',
    story: 'The marketplace connected me directly with buyers. I eliminated middlemen and increased my profit margins from 15% to 45%. This platform is a game-changer for small-scale farmers.',
    image: '/images/farmer3.webp',
    rating: 5,
    yield_improvement: '+45% profit increase'
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-bold text-3xl md:text-4xl text-slate-900 mb-4">
            Farmer Success Stories
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Real farmers, real results. See how AfriAgroCore is transforming agricultural productivity across Africa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-900">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  width="384"
                  height="384"
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-emerald-500 text-emerald-500" />
                  ))}
                </div>

                {/* Story */}
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.story}"
                </p>

                {/* Name & Improvement */}
                <div className="border-t border-slate-200 pt-4">
                  <h3 className="font-bold text-lg text-slate-900 mb-2">
                    {testimonial.name}
                  </h3>
                  <p className="text-emerald-600 font-semibold text-sm">
                    {testimonial.yield_improvement}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
