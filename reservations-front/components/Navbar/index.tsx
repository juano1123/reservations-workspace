import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export default function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="bg-white lg:fixed inset-x-0 top-0 py-1.5 z-50 "
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">
              <DisclosureButton as="a" href="/">
                <Image
                  alt="logo"
                  src="/images/logo.png"
                  height={32}
                  width={90}
                  className="cursor-pointer"
                />
              </DisclosureButton>
            </div>
          </div>
          <div className="flex lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-pink-100">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel className="lg:hidden">
        <div className="space-y-1 px-2 pb-3 pt-4">
          <DisclosureButton
            as="a"
            href="/"
            className="block rounded-md px-3 py-2.5 text-base font-semibold leading-7 text-pink-100 hover:bg-gray-50"
          >
            Home
          </DisclosureButton>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
