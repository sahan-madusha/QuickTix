import React from "react";
import {
  ADDRESS,
  EMAIL,
  FACEBOOK,
  INSTERGRAM,
  WHATSAPP,
  IMAGE_URL,
} from "src/Constant/AppConstants";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../Lib/Utils";

export const Footer = () => {
  return (
    <footer
      className="bg-blue-950 text-white py-10"
      data-aos="fade-down"
      data-aos-delay="300"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between text-center md:text-left">
          {/* About Section */}
          <div className="md:w-1/2 mb-8 md:mb-0">
            <div className="mb-4" data-aos="fade-down" data-aos-delay="400">
              <img
                src={`${IMAGE_URL}/logo-transparent.png`}
                alt="Logo"
                className="w-32 mx-auto md:mx-0"
              />
              <p className="mt-4 text-lg">
                Your Trusted Platform for Seamless
                <br />
                Event Ticket Booking
              </p>
              <div className="mt-8">
                <h6 className="text-gray-400 mb-2">Get In Touch</h6>
                <ul>
                  <li className="my-3">Tel: {WHATSAPP}</li>
                  <li className="my-3">Email: {EMAIL}</li>
                  <li className="my-3">Address: {ADDRESS}</li>
                </ul>
              </div>
              <div className="mt-8 flex justify-center md:justify-start space-x-4">
                <Link to={FACEBOOK} target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-facebook text-gray-400 text-2xl"></i>
                </Link>
                <Link to={INSTERGRAM} target="_blank" rel="noopener noreferrer">
                  <i className="fa fa-instagram text-gray-400 text-2xl"></i>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Security & Info Section */}
          <div className="md:w-1/2">
            <div className="mb-8" data-aos="fade-down" data-aos-delay="400">
              <p className="mb-4 leading-relaxed">
                <strong>Our Commitment to Safety:</strong> Book with confidence on our secure ticketing platform, designed with your privacy in mind.
              </p>
              <p className="mb-4 leading-relaxed">
                <strong>Secure Payments:</strong> We utilize trusted payment processors to ensure all transactions are secure and your information remains safe.
              </p>
              <p className="mb-4 leading-relaxed">
                <strong>Data Protection:</strong> Your personal details are kept confidential and protected according to the latest industry standards.
              </p>
              <p>
                For full details, please review our 
                <Link
                  to={""}
                  onClick={scrollToTop}
                  className="text-blue-400"
                >
                  Terms & Conditions
                </Link>.
              </p>
            </div>
            <div className="text-center">
              <a
                href="https://www.payhere.lk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://www.payhere.lk/downloads/images/payhere_long_banner.png"
                  alt="PayHere"
                  className="mx-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 pt-4 mt-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <ul className="flex items-center justify-center md:justify-start space-x-4">
                <li>
                  <Link
                    to={""}
                    onClick={scrollToTop}
                    className="hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to={""}
                    onClick={scrollToTop}
                    className="hover:underline"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-gray-400">
                <a className="hover:underline" href={""} target="_blank">
                  &copy; {new Date().getFullYear()} Taprodev (PVT) LTD. All
                  rights reserved.
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
