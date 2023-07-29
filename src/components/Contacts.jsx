import { useNavigate } from "react-router-dom";

const ContactLocation = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <div className="mb-4">
        <p className="text-lg font-semibold">Address:</p>
        <p className="text-gray-600">123 California Street</p>
        <p className="text-gray-600">Los Angeles, CA 90001</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Email:</p>
        <p className="text-gray-600">contact@example.com</p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Phone:</p>
        <p className="text-gray-600">(555) 123-4567</p>
      </div>
      <div>
        <p className="text-lg font-semibold">Working Hours:</p>
        <p className="text-gray-600">Monday to Friday: 9:00 AM - 5:00 PM</p>
        <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
        <p className="text-gray-600">Sunday: Closed</p>
      </div>

      <button
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleGoBack}
      >
        Back
      </button>
    </div>
  );
};

export default ContactLocation;