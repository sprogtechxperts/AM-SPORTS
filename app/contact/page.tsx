"use client";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Heading Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact A.M SPORTS</h1>
          <p className="text-gray-400 text-lg md:text-xl">
            Hinjawadi Phase 1 · Badminton Gutting Service
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Get In Touch</h2>
              <p className="text-gray-300">
                We&rsquo;d love to hear from you! Whether it&rsquo;s for gutting requests, sports gear, or any general inquiries — reach out anytime.
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
                📍 Address: A.M SPORTS, Hinjawadi Phase - 1, Stadium Road, India
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

          {/* Map or Image Placeholder */}
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.1059784043683!2d73.74151207506466!3d18.520430882577943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bbb1822e59a7%3A0xc097d35e04f7a4a4!2sA.M%20SPORTS%20-%20Hinjawadi%20Phase%20-%201%20(Badminton%20gutting%20Service)!5e0!3m2!1sen!2sin!4v1718532741492!5m2!1sen!2sin"
              width="100%"
              height="300"
              loading="lazy"
              allowFullScreen
              className="w-full h-72 rounded-md border-0"
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
