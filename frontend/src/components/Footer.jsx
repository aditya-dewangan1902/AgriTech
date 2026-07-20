import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-[#EEEEEE] pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-[#222222] pb-10">
          <div>
            <h4 className="text-xl font-semibold mb-4 merriweather text-white">AgriTech</h4>
            <p className="text-sm text-[#CCCCCC] leading-relaxed">
              The Journal of Advanced Computing and AI in Agriculture (AgriTech) drives innovation by publishing essential research in AI, IoT, Big Data, and Robotics for the future of farming.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 merriweather text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="text-[#CCCCCC] hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/papers" className="text-[#CCCCCC] hover:text-primary transition-colors">Published Papers</Link></li>
              <li><Link to="/guidelines" className="text-[#CCCCCC] hover:text-primary transition-colors">Submission Guidelines</Link></li>
              <li><Link to="/contact" className="text-[#CCCCCC] hover:text-primary transition-colors">Contact</Link></li>
              <li><Link to="/login" className="text-[#CCCCCC] hover:text-primary transition-colors">Author Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4 merriweather text-white">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:support@agritech.org" className="text-[#CCCCCC] hover:text-primary transition-colors">support@agritech.org</a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-primary" />
                <span className="text-[#CCCCCC]">123 Academic Way, Ag-Tech City, World, 00000</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-6">
          <p className="text-xs text-[#666666]">&copy; 2025 AgriTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
