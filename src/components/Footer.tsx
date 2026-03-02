export const Footer = () => {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="col-span-1 md:col-span-2">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-aero-blue to-aero-purple mb-4">
            AERONEXUS
          </div>
          <p className="text-sm text-gray-400 mb-6 max-w-sm">
            Aerospace technology makes life better. Leading the low-altitude economy with advanced AI-driven UAV systems.
          </p>
          <div className="text-2xl font-light text-white">400-888-2062</div>
        </div>
        
        <div>
          <h4 className="font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-aero-blue cursor-pointer">About AeroNexus</li>
            <li className="hover:text-aero-blue cursor-pointer">Civil Logistics</li>
            <li className="hover:text-aero-blue cursor-pointer">Series Products</li>
            <li className="hover:text-aero-blue cursor-pointer">Training Center</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-aero-blue cursor-pointer">Contact Us</li>
            <li className="hover:text-aero-blue cursor-pointer">Technical Support</li>
            <li className="hover:text-aero-blue cursor-pointer">Market Cooperation</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© 2024 AeroNexus Co., Ltd. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <span className="hover:text-white cursor-pointer">Disclaimer</span>
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
        </div>
      </div>
    </footer>
  );
};