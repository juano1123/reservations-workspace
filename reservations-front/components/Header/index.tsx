"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 font-nunito">
        <nav
          aria-label="Global"
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Candelaria nails</span>
              <Image
                alt="logo"
                src="/images/logo.png"
                height={32}
                width={120}
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-pink-100"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link href="/agendar" className="text-sm  leading-6 text-pink-100">
              Agendar <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">Candelaria nails</span>
                <Image
                  alt="logo"
                  src="/images/logo.png"
                  height={32}
                  width={120}
                />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-pink-100"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6">
                  <Link
                    href="/agendar"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base leading-7 text-pink-100 hover:bg-gray-50"
                  >
                    Agendar
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-14">
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1
              className={`max-w-2xl text-4xl  tracking-tight text-pink-100 sm:text-6xl lg:col-span-2 xl:col-auto font-nunito`}
            >
              Candelaria nails
            </h1>
            <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
              <p className="text-lg leading-8 text-gray-600 font-nunito">
                Bienvenida a nuestra agenda web! Somos un centro estético donde
                tenemos muchos servicios para brindarte. En Candelaria nails
                tenemos 10 años de experiencia, y siempre buscamos mejorar y
                sumar cosas nuevas para brindarles lo mejor! Cualquier duda o
                consulta sobre la agenda podes escribirnos a nuestras redes
                sociales o wpp!
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  href="/agendar"
                  className="text-[22px] leading-7 text-pink-100 bg-pink-50 hover:scale-110 hover:text-pink-300 hover:bg-pink-100 transition-transform duration-300 ease-in-out px-12 py-4 rounded-lg shadow-md"
                >
                  Agendar aquí
                </Link>
              </div>
            </div>
            <Image
              alt="home"
              src="/images/home.jpeg"
              width={450}
              height={200}
              className="mt-10 aspect-[6/5] w-full max-w-lg lg:w-[450px] rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-16"
            />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
    </>
  );
}
