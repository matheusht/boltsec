import { useState } from "react";
import MobileMenu from "./MobileMenu";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md rounded-md px-10 py-5 border border-gray-800 w-full max-w-5xl
        flex justify-between items-center lg:hidden md:max-w-xl sm:max-w-md max-w-xs mx-auto"
      >
        <a href="/" className="text-white text-xl font-bold" aria-label="Home">
          BoltSec
        </a>
        <button
          onClick={toggleMenu}
          className="text-white hover:text-gray-300 transition-colors"
          aria-label="Open menu"
          aria-expanded={isOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
      <MobileMenu isOpen={isOpen} />
    </>
  );
};

export default MobileNavigation;
