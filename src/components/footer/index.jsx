import Link from "next/link";

const Footer = () => {
  return (
    <footer className="max-w-[1024px] mx-auto py-8 px-4 text-gray-600 text-sm flex justify-between items-center">
      <div>
        <Link href="/terms">Terms of Service</Link>
        <span className="mx-2">|</span>
        <Link href="/privacy">Privacy Policy</Link>
        <span className="mx-2">|</span>
        <Link href="/contacts">Contacts</Link>
        <span className="mx-2">|</span>
        <Link href="/about">About</Link>
      </div>
      <div>&copy; 2023 Easy Flight. All rights reserved.</div>
    </footer>
  );
};

export default Footer;
