import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-[1024px] px-4 sm:px-6 lg:px-0">
            <div className="flex items-center justify-between h-20">
              <div className="flex-shrink-0 flex items-center">
                <Link href="/">
                  <div className="font-mono font-bold text-gray-900 text-xl">
                    FlyEasy
                  </div>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-2">
                  <Link
                    href="/order"
                    className="transition-all duration-200 py-2 px-3 rounded text-gray-900 hover:bg-gray-100"
                  >
                    Flight Reservation
                  </Link>
                  <Link
                    href="/#faq"
                    className="transition-all duration-200 py-2 px-3 rounded text-gray-900 hover:bg-gray-100"
                  >
                    FAQ
                  </Link>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <FontAwesomeIcon
                    icon={isOpen ? faTimes : faBars}
                    className="block h-6 w-6"
                    aria-hidden="true"
                  />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden" unmount={false}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/order"
                className="block py-2 px-3 rounded text-base font-medium text-gray-900 hover:bg-gray-800 w-full hover:text-white"
              >
                Flight Reservation
              </Link>
              <Link
                href="/#faq"
                className="block py-2 px-3 rounded text-base font-medium text-gray-900 hover:bg-gray-800  w-full hover:text-white"
              >
                FAQ
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
