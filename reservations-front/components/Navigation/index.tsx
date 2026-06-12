"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePendingBooking } from "@/contexts/PendingBookingContext";

const clientNavigation = [
  { name: "Agendar", href: "/agendar", icon: CalendarIcon },
  { name: "Mis Reservas", href: "/dashboard", icon: HomeIcon },
];

const adminNavigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon },
  { name: "Servicios", href: "#", icon: UsersIcon },
  { name: "Calendario", href: "#", icon: CalendarIcon },
];

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

interface NavigationProps {
  children: React.ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navConfirmHref, setNavConfirmHref] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { hasPendingBooking } = usePendingBooking();

  if (!user) {
    return <>{children}</>;
  }

  const isAdmin = user.role === "admin";
  const navItems = isAdmin ? adminNavigation : clientNavigation;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isCurrent = (href: string) => pathname === href;

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (hasPendingBooking && !isCurrent(href)) {
      e.preventDefault();
      setNavConfirmHref(href);
    }
  };

  const confirmNavigation = () => {
    if (navConfirmHref) {
      setNavConfirmHref(null);
      router.push(navConfirmHref);
    }
  };

  const cancelNavigation = () => {
    setNavConfirmHref(null);
  };

  return (
    <>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative flex w-full flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="absolute top-6 right-6 z-50 cursor-pointer -m-2.5 p-2.5 bg-gray-800 rounded-full text-white shadow-md"
            >
              <span className="sr-only">Close sidebar</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 py-5 pb-2 ring-1 ring-white/10">
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-3 mt-14 md:mt-0">
                      {navItems.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            onClick={handleNavClick(item.href)}
                            className={classNames(
                              isCurrent(item.href)
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-md font-semibold leading-6 items-center",
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className="h-8 w-8 shrink-0"
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={handleLogout}
                          className="w-full text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-md font-semibold leading-6 items-center"
                        >
                          <ArrowRightOnRectangleIcon
                            aria-hidden="true"
                            className="h-8 w-8 shrink-0"
                          />
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex my-4 shrink-0 w-full justify-center items-center">
            <div className="w-fit rounded-full bg-white p-0.5">
              <Image
                alt="logo"
                src="/images/logo.png"
                height={32}
                width={100}
              />
            </div>
          </div>
          <div className="text-center text-white text-sm font-semibold -mt-2 mb-2">
            {user.fullName || user.email}
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={handleNavClick(item.href)}
                        className={classNames(
                          isCurrent(item.href)
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-800 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-gray-400 hover:bg-gray-800 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                    >
                      <ArrowRightOnRectangleIcon
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0"
                      />
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          {isAdmin ? "Dashboard" : "Mis Reservas"}
        </div>
      </div>

      <div className="py-10 lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </div>

      {/* Navigation confirmation modal */}
      {navConfirmHref && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm mx-4 p-6 text-center">
            <p className="text-gray-800 font-semibold mb-2">
              ¿Perder la reserva en curso?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Si continúas, perderás los datos de la reserva que estás armando.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelNavigation}
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmNavigation}
                className="px-4 py-2 text-sm font-semibold text-white bg-pink-100 rounded-md hover:opacity-80"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
