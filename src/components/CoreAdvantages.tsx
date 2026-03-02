import { motion } from 'framer-motion';
import { Layers, Cuboid, Clock, BadgeCheck } from 'lucide-react';

const advantages = [
  { title: 'Systematic Solution', icon: <Layers /> },
  { title: 'Complete Product Layout', icon: <Cuboid /> },
  { title: '10W+ Flight Time', icon: <Clock /> },
  { title: 'Airworthiness Certified', icon: <BadgeCheck /> },
];

export const CoreAdvantages = () => {
  return (
    <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="w-20 h-20 rounded-full border border-white/10 bg-black flex items-center justify-center text-aero-blue mb-6 shadow-[0_0_30px_rgba(0,210,255,0.1)]">
                {adv.icon}
              </div>
              <h4 className="text-lg font-medium text-gray-200">{adv.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};