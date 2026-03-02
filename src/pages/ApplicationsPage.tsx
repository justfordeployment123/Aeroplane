import { motion } from 'framer-motion';
import { ArrowRight, Package, ShieldAlert, Factory } from 'lucide-react';

const scenarios = [
  {
    num: '01',
    title: 'Civil Logistics',
    desc: 'Revolutionizing the supply chain with autonomous precision. We provide systematic solutions for typical operation scenarios such as trunk logistics, branch logistics, and terminal logistics. Our systems ensure faster, safer, and more cost-effective delivery networks.',
    img: 'https://www.htsdfp.com/UploadFiles/2024-10-10/tsfdemhrijza6ejq.png',
    icon: Package,
    color: 'from-blue-500 to-cyan-400',
    glow: 'bg-cyan-500/20'
  },
  {
    num: '02',
    title: 'Emergency Rescue',
    desc: 'Innovating the UAV emergency rescue mode. We build an intelligent, three-dimensional rescue system that provides rapid, systematic solutions for disaster scenarios where human access is dangerous or impossible. Time saved is lives saved.',
    img: 'https://www.htsdfp.com/UploadFiles/2024-05-15/wxzhgujhcrs7dwzb.png',
    icon: ShieldAlert,
    color: 'from-orange-500 to-red-500',
    glow: 'bg-orange-500/20'
  },
  {
    num: '03',
    title: 'Industry Service',
    desc: 'A complete, end-to-end operational system for flight carrying. We provide enterprise customers with comprehensive services such as operation, rigorous testing, and the carrying of various specialized models tailored to specific industrial needs.',
    img: 'https://www.htsdfp.com/UploadFiles/2024-05-15/g8shx7utz55qhupr.png',
    icon: Factory,
    color: 'from-purple-500 to-indigo-500',
    glow: 'bg-purple-500/20'
  }
];

export const ApplicationsPage = () => {
  return (
    <div className="bg-aero-dark min-h-screen text-white pt-20 font-sans selection:bg-aero-blue selection:text-black">
      
      {/* Hero Section */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        {/* Background Image from original site */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-40"
          style={{ backgroundImage: "url('https://www.htsdfp.com/UploadFiles/banner/ban_2.jpg')" }}
        />
        {/* Sleek linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-aero-dark via-aero-dark/60 to-transparent z-0" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-aero-blue tracking-widest uppercase text-sm font-bold mb-4 block">
              Global Use Cases
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              Application <span className="bg-clip-text text-transparent bg-linear-to-r from-aero-blue to-aero-purple">Scenarios</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="border-y border-white/5 bg-black/40 backdrop-blur-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center text-sm text-gray-400">
          <span className="hover:text-aero-blue cursor-pointer transition-colors">Home</span>
          <span className="mx-2 text-gray-600">/</span>
          <span className="text-white font-medium">Application Scenarios</span>
        </div>
      </div>

      {/* Cinematic Showcase Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {scenarios.map((scenario, index) => {
            const isEven = index % 2 === 0;
            const Icon = scenario.icon;

            return (
              <div 
                key={scenario.num} 
                className={`flex flex-col lg:flex-row items-center gap-16 relative ${!isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Giant Background Number */}
                <div 
                  className={`absolute top-0 ${isEven ? '-left-10' : '-right-10'} text-[250px] font-black text-white/5 select-none -z-10 leading-none`}
                >
                  {scenario.num}
                </div>

                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 space-y-8"
                >
                  <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg backdrop-blur-sm">
                    <Icon className={`w-8 h-8 text-transparent bg-clip-text bg-linear-to-br ${scenario.color}`} />
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {scenario.title}
                  </h2>
                  
                  <div className={`h-1 w-20 rounded-full bg-linear-to-r ${scenario.color}`} />
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {scenario.desc}
                  </p>

                  <button className="group flex items-center text-white font-semibold tracking-wide hover:text-aero-blue transition-colors">
                    <span className="border-b-2 border-transparent group-hover:border-aero-blue pb-1 transition-all">
                      Explore Case Study
                    </span>
                    <div className="ml-4 p-2 rounded-full border border-white/20 group-hover:border-aero-blue group-hover:bg-aero-blue/10 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </motion.div>

                {/* Image Showcase */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1 }}
                  className="flex-1 relative group w-full"
                >
                  {/* Glowing background blob behind the image */}
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full blur-[100px] ${scenario.glow} transition-opacity duration-700 group-hover:opacity-100 opacity-50`} />
                  
                  <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-linear-to-br from-white/5 to-transparent p-8 backdrop-blur-sm shadow-2xl">
                    <motion.img 
                      src={scenario.img} 
                      alt={scenario.title}
                      className="w-full h-auto object-cover rounded-xl drop-shadow-2xl"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};