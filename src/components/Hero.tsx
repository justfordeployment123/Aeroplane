// src/components/Hero.tsx
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      
      {/* 1. The New Futuristic Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('https://t4.ftcdn.net/jpg/02/59/22/13/360_F_259221396_4KjcV5my6AHI6wIL6wDCkQERn5acd11X.jpg')" }}
      />
      
      {/* 2. Gradient Overlay (Fades from black on the left to transparent on the right) */}
      <div className="absolute inset-0 bg-gradient-to-r from-aero-dark via-aero-dark/90 to-transparent z-0" />
      
      {/* 3. Blue Tech Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-aero-blue/20 rounded-full blur-[150px] opacity-60 pointer-events-none z-0" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-aero-blue/50 bg-aero-blue/10 text-aero-blue text-sm font-medium tracking-wide mb-6 inline-block backdrop-blur-md">
              Next-Generation Autonomous Aviation
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg"
          >
            FP-98 Large <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-aero-blue to-aero-purple">
              Fixed Wing UAV
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed"
          >
            Redefining trunk line logistics, emergency rescue, and low-altitude economy with state-of-the-art AI flight systems.
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-aero-blue/20 border border-aero-blue rounded-full hover:bg-aero-blue hover:text-black overflow-hidden backdrop-blur-sm shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_40px_rgba(0,210,255,0.6)]"
          >
            Explore Systems
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Floating Drone Image from Original Site */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative"
        >
          <motion.img 
            src="https://www.htsdfp.com/UploadFiles/2024-10-10/duk1z1npyretmsfm.png" 
            alt="FP-98 Unmanned Aircraft" 
            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,210,255,0.2)]"
            animate={{ y: [0, -25, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
};