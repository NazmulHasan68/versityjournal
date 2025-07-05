import React from 'react';
import logo from '@/assets/login.svg';
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 mt-20 font-sans text-gray-900 dark:text-white">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4">Let’s Talk!</h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Got questions, feedback or a project idea? Drop us a message and we’ll get back to you ASAP!
        </p>
        <div className="mt-4 border-t-4 w-24 border-blue-600 mx-auto"></div>
      </div>

      {/* Image + Form Layout */}
      <div className="flex flex-col md:flex-row gap-10 mb-24">
        {/* Left Image */}
        <div className="md:w-1/2 rounded-xl overflow-hidden">
          <img src={logo} alt="Contact Illustration" className="w-full h-full object-cover" />
        </div>

        {/* Contact Form */}
        <div className="md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6">✍️ Send Us a Message</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">First Name *</label>
              <input type="text" required placeholder="John" className="w-full p-3 border rounded border-gray-300 focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Last Name *</label>
              <input type="text" required placeholder="Doe" className="w-full p-3 border rounded border-gray-300 focus:border-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input type="email" required placeholder="john@example.com" className="w-full p-3 border rounded border-gray-300 focus:border-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Subject *</label>
              <input type="text" required placeholder="Project discussion or query" className="w-full p-3 border rounded border-gray-300 focus:border-blue-500 outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Message *</label>
              <textarea rows="4" required placeholder="Write your message..." className="w-full p-3 border rounded border-gray-300 focus:border-blue-500 outline-none resize-none"></textarea>
            </div>
            <div className="md:col-span-2 flex items-start gap-2">
              <input type="checkbox" required className="mt-1" />
              <p className="text-sm">
                I agree to the <a href="#" className="text-blue-600 underline">privacy policy</a> and consent to be contacted.
              </p>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded hover:from-blue-700 hover:to-indigo-700 transition shadow-md w-full"
              >
                📤 Send Message
              </button>
              <p className="text-xs mt-2 text-gray-500 dark:text-gray-400">
                This is a demo form. Connect with an API or email service in production.
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* Contact Info Cards */}
      <h2 className="text-3xl font-bold mb-6 text-center">📞 Contact Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {[
          { Icon: Phone, title: 'Phone', line1: '+1 (555) 123-4567', line2: 'Mon–Fri: 8am–6pm' },
          { Icon: Mail, title: 'Email', line1: 'info@company.com', line2: 'support@company.com' },
          { Icon: MapPin, title: 'Address', line1: '123 Business Ave', line2: 'San Francisco, CA 94107' },
        ].map((info, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center hover:scale-105 transition-all">
            <div className="flex justify-center mb-2">
              <info.Icon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-1">{info.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{info.line1}</p>
            <p className="text-sm text-gray-500">{info.line2}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-4 text-center">🗺️ Our Location</h2>
        <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Google Map"
            src="https://maps.google.com/maps?q=San+Francisco,+CA,+USA&z=13&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Social Links */}
      <div className="text-center mb-20">
        <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
        <div className="flex flex-wrap justify-center gap-6 text-xl text-gray-700 dark:text-gray-300">
          <a href="#" className="hover:text-blue-600 transition flex items-center gap-2">
            <Facebook className="w-5 h-5" /> Facebook
          </a>
          <a href="#" className="hover:text-pink-500 transition flex items-center gap-2">
            <Instagram className="w-5 h-5" /> Instagram
          </a>
          <a href="#" className="hover:text-sky-400 transition flex items-center gap-2">
            <Twitter className="w-5 h-5" /> Twitter
          </a>
          <a href="#" className="hover:text-blue-700 transition flex items-center gap-2">
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
          <a href="#" className="hover:text-red-600 transition flex items-center gap-2">
            <Youtube className="w-5 h-5" /> YouTube
          </a>
        </div>
      </div>

      {/* Footer Note */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 italic mt-10">
        “We respond within 24 hours. Your voice matters.”
      </div>
    </div>
  );
}
