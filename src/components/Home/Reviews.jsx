import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [people, setPeople] = useState([]);

  useEffect(() => {
 
    const fetchReviews = async () => {
      const response = await fetch("/reviews.json");
      const data = await response.json();
      setReviews(data);
    };
    fetchReviews();
  }, []);




  useEffect(() => {
    
    const fetchPeople = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        const data = await response.json();
        setPeople(data.results);
      } catch (error) {
        console.error("Error fetching random people:", error);
      }
    };

    fetchPeople();
  }, []);

  const peopleImages = people.map((person) => (person.picture.large)
  )

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-8">
        <span className="text-[#9d73f3]">Customer</span>{" "}
        <span className="text-[#FED12D]">Reviews</span>
      </h2>

      <Marquee
        gradient={true}
        speed={50}
        pauseOnHover={true}
        className=" py-2 md:py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:h-[400px]"
      >
        <div className="flex gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg border border-[#9d73f3]  p-6 flex flex-col items-center text-center transition-transform hover:scale-105 mx-2 hover:border-[#FED12D]"
              style={{
                minWidth: "280px",
                maxWidth: "280px",
                flexShrink: 0, 
              }}
            >
            
              <img
                src={peopleImages[index]}
                alt={review.username}
                className="w-20 h-20 rounded-full object-cover border-4 border-[#FED12D] mb-4"
                onError={(e) => (e.target.src = "/fallback-user.png")}
              />

            
              <h3 className="text-lg font-bold text-[#9d73f3]">
                {review.username}
              </h3>
              <p className="text-sm text-gray-500 italic mb-2">
                {review.occupation}
              </p>

             
              <p className="text-gray-700 mb-4 line-clamp-3">
                {review.description}
              </p>

             
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, starIndex) => (
                  <svg
                    key={starIndex}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={
                      starIndex < Math.floor(review.rating)
                        ? "#FED12D"
                        : "#E4E4E4"
                    }
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M12 .587l3.668 7.568L24 9.423l-6 5.834L19.336 24 12 20.146 4.664 24l1.336-8.743L0 9.423l8.332-1.268z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-700">
                  {review.rating.toFixed(1)}
                </span>
              </div>

             
              <p className="text-xs text-gray-400">
                {new Date(review.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default Reviews;
