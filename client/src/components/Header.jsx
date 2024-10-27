import React, { useEffect, useState } from 'react';

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 300); // Delay to make the fade-in noticeable
  }, []);

  return (
    <div className="bg-white">
      <header className={`text-center py-32 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-8xl font-bold text-green-700 font-impact-fantasy">
          COLLAB CAMPUS 
        </h1>
        <p className="text-lg mt-6 text-green-600 max-w-2xl mx-auto">
          Collaborate with students of multiple Engineering disciplines and build industry level projects or study groups 
          to help improve. make connections with other students 
        </p>
      </header>
    </div>
  );
};

export default Header;
