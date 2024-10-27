import { Link } from "react-router-dom";
import logo from "../assets/images/logo.jpeg";

const AboutSection = () => {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 lg:flex lg:items-center">
          {/* Image Section */}
          <div className="lg:w-1/2 lg:mr-8 mb-8 lg:mb-0">
            <img
              src={logo}
              alt="Collab Campus Logo"
              className="w-full h-auto object-cover"
            />
          </div>
  
          {/* Text and Button Section */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-green-700 mb-6">What We Do at Collab Campus</h2>
            <p className="text-lg text-green-700 mb-6">
              Collab Campus provides students the opportunity to collaborate across different engineering disciplines. 
              Whether you're building industry-level projects or forming study groups, we help you connect and grow.
            </p>
  
            <ul className="list-disc list-inside text-lg text-green-700 mb-6 space-y-2">
              <li>Form teams with students from multiple engineering fields</li>
              <li>Work on real-world projects to gain industry experience</li>
              <li>Participate in study groups and learn from peers</li>
              <li>Build your network and collaborate with future engineers</li>
            </ul>
  
            <button className="px-6 py-3 bg-green-700 text-white text-lg rounded-lg shadow hover:bg-green-600 transition-all">
                <Link to='/register'>Join Now</Link>
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default AboutSection;
 