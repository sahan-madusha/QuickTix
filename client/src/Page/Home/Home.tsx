import React from "react";
import { Header } from "./common";
import { Link } from "react-router-dom";

const EventCard = ({ title, description }) => (
  <div className="event-card bg-gray-200 p-6 rounded-md shadow-md">
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-md text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="step bg-white p-6 rounded-md shadow-md">
    <div className="text-2xl font-bold mb-2">Step {number}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-md text-gray-600">{description}</p>
  </div>
);


export const HomePage = () => {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Your Tickets Easily</h1>
        <p className="text-lg mb-6">
          Discover and book tickets for unforgettable experiences, from concerts
          to attractions!
        </p>
        <Link
          to="/book-tickets"
          className="px-8 py-3 bg-blue-500 text-white rounded-md"
        >
          Get Started
        </Link>
      </section>

      <section className="featured-events py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-8">Featured Events</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <EventCard
            title="Music Concert"
            description="Join us for a live concert!"
          />
          <EventCard
            title="Sports Event"
            description="Catch the action live!"
          />
          <EventCard
            title="Theater Show"
            description="Enjoy an evening of drama!"
          />
        </div>
      </section>

      <section className="how-it-works bg-gray-100 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Step
            number="1"
            title="Browse Events"
            description="Find your desired event from a variety of options."
          />
          <Step
            number="2"
            title="Book Your Tickets"
            description="Secure your spot with just a few clicks."
          />
          <Step
            number="3"
            title="Enjoy the Experience"
            description="Get ready for an unforgettable event!"
          />
        </div>
      </section>
    </>
  );
};