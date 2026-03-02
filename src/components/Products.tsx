import { motion } from 'framer-motion';

const products = [
  {
    title: 'Double 1000 Series',
    desc: 'Trunk Line Scenarios with 1000 km Range and 1000 kg Load',
    img: 'https://www.htsdfp.com/UploadFiles/2024-10-10/gbm3aqgufndmem5n.png'
  },
  {
    title: 'Double 100 Series',
    desc: 'Branch Line Scenarios with 100 km Range and 100 kg Load',
    img: 'https://www.htsdfp.com/UploadFiles/2024-10-10/qm2fdjkspstmse7r.png'
  },
  {
    title: 'Double 10 Series',
    desc: 'Terminal Line Scenarios with 10 km Range and 10 kg Load',
    img: 'https://www.htsdfp.com/UploadFiles/2024-06-18/ceqz12usfnsnru3e.png'
  }
];

export const Products = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Series Products</h2>
          <div className="h-1 w-20 bg-linear-to-r from-aero-blue to-aero-purple mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group relative bg-black border border-white/10 rounded-2xl p-8 hover:border-aero-blue/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Text Top */}
              <div className="z-10 relative">
                <h3 className="text-2xl font-bold mb-2 text-white">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{product.desc}</p>
                <button className="text-aero-blue font-medium hover:text-white transition-colors flex items-center">
                  Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
              
              {/* Image Bottom */}
              <div className="mt-8 relative z-0 h-48 flex items-center justify-center">
                <div className="absolute inset-0 bg-aero-blue/5 rounded-full blur-3xl group-hover:bg-aero-blue/20 transition-colors" />
                <motion.img 
                  src={product.img} 
                  alt={product.title} 
                  className="w-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};