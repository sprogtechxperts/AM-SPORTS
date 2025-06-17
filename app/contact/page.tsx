"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
      
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Get In Touch</h2>
              <p className="text-gray-300">
                We’d love to hear from you! Whether it’s for gutting requests, sports gear, or any general inquiries — reach out anytime.
              </p>
            </div>

            <ul className="space-y-3 text-gray-300">
              <li>
                📧 Email:{" "}
                <a href="mailto:support@amsports.com" className="text-blue-400 underline">
                  support@amsports.com
                </a>
              </li>
              <li>
                📞 Phone:{" "}
                <a href="tel:+911234567890" className="text-blue-400 underline">
                  +91 12345 67890
                </a>
              </li>
              <li>
                📍 Address: Hinjawadi Phase 1, Pandavnagar Vasti, Mann Road, Hinjawadi Phase 1 Rd, Maharashtra 411057, India
              </li>
              <li>
                🌐 Map Link:{" "}
                <a
                  href="https://g.co/kgs/mv6ecdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  View on Google Maps
                </a>
              </li>
            </ul>
          </div>

          {/* Google Map Embed */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.7674217638814!2d73.7288439737222!3d18.584521367220624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb0cf1261b75%3A0xfa305c197f0372b3!2sA.M%20SPORTS%20-%20Hinjawadi%20Phase%20-%201%20(%20Badminton%20gutting%20Service)!5e0!3m2!1sen!2sin!4v1750150684915!5m2!1sen!2sin"
              className="w-full h-72 rounded-md border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center pt-8 border-t border-gray-700 text-gray-400 text-sm">
          © {new Date().getFullYear()} A.M SPORTS · All rights reserved.
        </div>
      </div>
    </div>
  );
}
