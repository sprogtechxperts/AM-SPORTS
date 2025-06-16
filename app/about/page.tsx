export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About A.M SPORTS</h1>
          <p className="text-lg text-gray-400">
            Elevating Your Game – One Gutting, One Gear at a Time.
          </p>
        </div>

        {/* Brand Story */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Our Story</h2>
          <p className="text-gray-300">
            Founded in Hinjawadi Phase 1, A.M SPORTS started as a passion project to support local
            badminton enthusiasts with expert gutting services and quality gear. Over time, we&rsquo;ve
            grown into a trusted name, known for precision, service, and a genuine love for the sport.
          </p>
          <p className="text-gray-300">
            We understand what athletes need — not just gear, but reliability and support. Whether
            you&apos;re gearing up for your first match or you&rsquo;re a seasoned player, we&rsquo;re here to help
            you perform your best.
          </p>
        </div>

        {/* Vision and Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">🎯 Our Mission</h3>
            <p className="text-gray-300">
              To empower athletes at all levels by providing access to top-tier sporting equipment,
              expert badminton gutting, and personalized support — all in one place.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">🌟 Our Vision</h3>
            <p className="text-gray-300">
              To be the most trusted local brand in sports gear and services, nurturing grassroots
              talent and encouraging fitness in the community.
            </p>
          </div>
        </div>

        {/* What We Offer */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>🎾 Professional Badminton Gutting Service with premium strings</li>
            <li>🛍️ A curated collection of rackets, shoes, and accessories</li>
            <li>🤝 Friendly, sports-passionate customer service</li>
            <li>⚡ Fast turnaround and same-day gutting for most requests</li>
            <li>🎯 Custom advice for string tension, racket choice, and care tips</li>
          </ul>
        </div>

        {/* Location Highlight */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Visit Us</h2>
          <p className="text-gray-300">
            📍 Located in the heart of <strong>Hinjawadi Phase 1</strong>, Pune — easily accessible
            to all sports lovers in the area. Our workshop is equipped with professional-grade tools
            for stringing and gutting.
          </p>
          <p>
            🌐 Find us on{" "}
            <a
              href="https://g.co/kgs/mv6ecdc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              Google Maps
            </a>
          </p>
        </div>

        {/* Final Note */}
        <div className="text-center pt-8 border-t border-gray-700 text-gray-400 text-sm">
          © {new Date().getFullYear()} A.M SPORTS · Passion. Precision. Performance.
        </div>
      </div>
    </div>
  );
}
