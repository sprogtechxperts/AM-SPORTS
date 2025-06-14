export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-white">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <p className="mb-4 text-gray-300">
        We`d love to hear from you! Reach out with any questions, feedback, or custom requests.
      </p>

      <ul className="space-y-2 text-gray-300">
        <li>Email: <a href="mailto:support@amsports.com" className="text-blue-400 underline">support@amsports.com</a></li>
        <li>Phone: <a href="tel:+911234567890" className="text-blue-400 underline">+91 12345 67890</a></li>
        <li>Address: 123, Stadium Road, Sports City, India</li>
      </ul>
    </div>
  );
}
