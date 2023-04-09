import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-[1024px] mx-auto py-8 px-4 text-gray-600 text-sm flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div className="flex gap-3 md:items-center md:gap-4">
        <Link href="/terms">
          <span className="text-gray-400 hover:text-gray-300">
            Terms of Service
          </span>
        </Link>

        {/* <Link href="/privacy">
          <span className="text-gray-400 hover:text-gray-300">
            Privacy Policy
          </span>
        </Link> */}

        <Link href="/contacts">
          <span className="text-gray-400 hover:text-gray-300">Contacts</span>
        </Link>

        {/* <Link href="/about">
          <span className="text-gray-400 hover:text-gray-300">About</span>
        </Link> */}
      </div>
      <div className="mt-4 md:mt-0">
        &copy; {new Date().getFullYear()} Easy Flight. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
