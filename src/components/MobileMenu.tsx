import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
}

const MobileMenu = ({ isOpen }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black/40 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
    >
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <a
          href="/"
          className="text-white hover:text-gray-300 transition-colors text-xl"
          aria-label="Home"
        >
          Home
        </a>
        <a
          href="/ai-solutions"
          className="text-gray-400 hover:text-gray-300 transition-colors text-xl"
          aria-label="AI Solutions"
        >
          AI Solutions
        </a>
        <a
          href="/product-development"
          className="text-gray-400 hover:text-gray-300 transition-colors text-xl"
          aria-label="Product Development"
        >
          Product Development
        </a>
        <a
          href="/about-us"
          className="text-gray-400 hover:text-gray-300 transition-colors text-xl"
          aria-label="About Us"
        >
          About Us
        </a>
        <a
          href="/contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors text-xl"
          aria-label="Get In Touch"
        >
          Get In Touch
        </a>
      </div>
    </div>
  );
};

export default MobileMenu;
