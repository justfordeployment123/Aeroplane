import { motion } from 'framer-motion';
import { Award, ShieldCheck, ChevronRight } from 'lucide-react';

const qualifications = [
  "Training Center for Large Civilian UAV Manipulators",
  "Remotely Piloted Aircraft Systems (RPAS) Air Operator Certificate",
  "Ministry Of Public Security Safety And Police Electronic Product Certification",
  "General Aviation Business Operation Certification",
  "Civil UAVs Pilot Training Agency Certification",
  "China Mobile Industrial Research Institute UAVs 5G Network Certification",
  "Intellectual Property Management System Certification",
  "Quality, Environmental, and Occupational Health Management Certification",
  "Enterprise AAA Credit Rating Certification"
];

const honors = [
  "2023 National High-Tech Enterprise",
  "Potential Unicorn Enterprises In Jiangsu Province",
  "Jiangsu Province Science And Technology SMEs",
  "Suzhou Low Altitude Economy Leading Enterprises",
  "2023 Dongshahu Venture Capital 'Annual Most Growth Enterprise'",
  "2021 'Kectron China' Leading Technology List",
  "Kunshan Advanced Unmanned Transportation System Key Laboratory",
  "Civil Aviation UAVs Industry Technology Innovation Strategic Alliance",
  "Suzhou University Master's Degree Graduate Practice Base"
];

const certificates = [
  { title: "National High-Tech Enterprise", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/3y8p4kvlf33blgld.png" },
  { title: "Training Center for UAV Manipulators", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/khg1eb8l1pmcskkr.png" },
  { title: "RPAS Air Operator Certificate", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/bciybjpxxqq9a6x1.png" },
  { title: "Quality Management System Iso9001", img: "https://www.htsdfp.com/UploadFiles/2024-02-28/4shsqlbmmsqhz3xz.jpg" },
  { title: "Singapore Airshow Participation", img: "https://www.htsdfp.com/UploadFiles/2024-03-06/fwrtqkfpfvx7xvtu.png" },
  { title: "Civil UAVs Pilot Training Agency", img: "https://www.htsdfp.com/UploadFiles/2024-05-06/t8jkrqf2qngewm79.png" },
];

export const About = () => {
  return (
    <div className="bg-aero-dark min-h-screen text-white pt-20 font-sans">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{ backgroundImage: "url('https://www.htsdfp.com/UploadFiles/banner/ban_1.jpg')" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-aero-dark via-aero-dark/80 to-black/50 z-0" />
        
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
              About <span className="bg-clip-text text-transparent bg-linear-to-r from-aero-blue to-aero-purple">AeroNexus</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pioneering the transition from two-dimensional to three-dimensional autonomous transportation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub-Navigation */}
      <div className="sticky top-20 z-40 bg-black/60 backdrop-blur-xl border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#profile" className="hover:text-aero-blue transition-colors">Company Profile</a>
          <a href="#honors" className="hover:text-aero-blue transition-colors">Qualifications & Honors</a>
          <a href="#vision" className="hover:text-aero-blue transition-colors">Vision</a>
        </div>
      </div>

      {/* Company Profile Section */}
      <section id="profile" className="py-24 relative scroll-mt-20">
        <div className="absolute top-0 right-0 w-125 h-125 bg-aero-purple/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">Who We Are</h2>
            <div className="h-1 w-16 bg-aero-blue rounded-full mb-8" />
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              <strong className="text-white">AeroNexus Co., Ltd.</strong> is a cutting-edge aerospace enterprise initiated by the China Aerospace Science and Technology Corporation. Operating under the state-owned enterprise reform "Three-Year Action Plan," we represent the pinnacle of modern aviation technology.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our core mission is to leverage advanced unmanned system technology to provide comprehensive, scenario-level solutions for global industry users. We are actively driving the evolution of logistics and transportation, supplying key equipment and system-level architectures for the autonomous skies of tomorrow.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-linear-to-tr from-aero-blue to-aero-purple rounded-3xl blur-2xl opacity-20" />
            <img 
              src="https://www.htsdfp.com/UploadFiles/2024-04-23/asgfuykn5nfrkksf.png" 
              alt="Company Profile Overview" 
              className="relative z-10 rounded-3xl border border-white/10 shadow-2xl object-cover w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Qualifications & Honors Section */}
      <section id="honors" className="py-24 bg-black relative scroll-mt-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Honorary Qualifications</h2>
            <div className="h-1 w-24 bg-linear-to-r from-aero-blue to-aero-purple mx-auto rounded-full" />
          </motion.div>

          {/* Text Lists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-aero-panel border border-white/10 rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-aero-blue">
                <ShieldCheck className="mr-3" /> Industry Qualifications
              </h3>
              <ul className="space-y-4">
                {qualifications.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300 text-sm md:text-base">
                    <ChevronRight className="w-5 h-5 text-aero-purple mr-2 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-aero-panel border border-white/10 rounded-3xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-6 flex items-center text-aero-blue">
                <Award className="mr-3" /> Enterprise Honors
              </h3>
              <ul className="space-y-4">
                {honors.map((item, i) => (
                  <li key={i} className="flex items-start text-gray-300 text-sm md:text-base">
                    <ChevronRight className="w-5 h-5 text-aero-purple mr-2 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Certificates Visual Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-black border border-white/10 rounded-xl overflow-hidden hover:border-aero-blue/50 transition-colors cursor-pointer"
              >
                <div className="aspect-4/3 p-4 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                  <img src={cert.img} alt={cert.title} className="max-h-full max-w-full object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-3 text-center border-t border-white/10">
                  <p className="text-xs text-gray-400 group-hover:text-aero-blue transition-colors line-clamp-2">
                    {cert.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-24 relative scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Our Vision</h2>
            <div className="h-1 w-24 bg-linear-to-r from-aero-blue to-aero-purple mx-auto rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,210,255,0.1)] inline-block max-w-5xl mx-auto bg-black/50 p-4"
          >
            <div className="absolute inset-0 bg-aero-blue/5 blur-3xl" />
            <img 
              src="https://www.htsdfp.com/UploadFiles/2024-03-01/xphd7wktdh8z9f5m.png" 
              alt="AeroNexus Vision Diagram" 
              className="relative z-10 w-full h-auto object-contain rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
};