import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">Journal website</h3>
          <p className="text-sm leading-relaxed">
            A global platform for academic research and knowledge sharing. Submit your papers, explore journals, and connect with scholars worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/submit" className="hover:text-white">Submit Paper</a></li>
            <li><a href="/journals" className="hover:text-white">Journals</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
          <address className="not-italic text-sm space-y-2">
            <p>123 Academic Ave,<br />Knowledge City, 45678</p>
            <p>Email: <a href="mailto:info@scholarlyhorizons.com" className="hover:text-white">info@scholarlyhorizons.com</a></p>
            <p>Phone: <a href="tel:+1234567890" className="hover:text-white">+1 (234) 567-890</a></p>
          </address>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
          <div className="flex space-x-4 text-gray-400">
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.333v21.333C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.41c0-3.1 1.893-4.788 4.66-4.788 1.325 0 2.466.099 2.797.143v3.24h-1.917c-1.504 0-1.796.715-1.796 1.764v2.313h3.59l-.467 3.622h-3.123V24h6.116c.73 0 1.324-.597 1.324-1.333V1.333C24 .597 23.403 0 22.675 0z"/></svg>
            </a>
            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.949.555-2.005.959-3.127 1.184-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.828-.734.199-1.5.232-2.224.084.631 1.953 2.445 3.377 4.604 3.418-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.557 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.8-1.562 2.46-2.549z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.115 2.5-2.49 2.5S0 4.881 0 3.5 1.116 1 2.49 1s2.49 1.119 2.49 2.5zM.22 8.249h4.488v12.75H.22V8.25zm7.468 0h4.303v1.778h.06c.599-1.134 2.066-2.33 4.254-2.33 4.55 0 5.39 3 5.39 6.9v7.352h-4.487v-6.5c0-1.55-.027-3.548-2.162-3.548-2.163 0-2.494 1.69-2.494 3.43v6.618H7.688v-12.75z"/></svg>
            </a>
          </div>
        </div>

      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Scholarly Horizons. All rights reserved.
      </div>
    </footer>
  );
}
