"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  CalendarIcon,
  HomeIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { usePendingBooking } from "@/contexts/PendingBookingContext";

const clientNavigation = [
  { name: "Agendar", href: "/agendar", icon: CalendarIcon },
  { name: "Mis Reservas", href: "/dashboard", icon: HomeIcon },
];

function classNames(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navConfirmHref, setNavConfirmHref] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { hasPendingBooking } = usePendingBooking();

  if (!user) return null;

  const navItems = clientNavigation;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isCurrent = (href: string) => pathname === href;

  const handleNavClick = (href: string) => (e: React.MouseEvent) => {
    if (isCurrent(href)) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    if (hasPendingBooking) {
      setNavConfirmHref(href);
    } else {
      setMobileMenuOpen(false);
      router.push(href);
    }
  };

  const confirmNavigation = () => {
    const href = navConfirmHref;
    setNavConfirmHref(null);
    setMobileMenuOpen(false);
    if (href) router.push(href);
  };

  const cancelNavigation = () => {
    setNavConfirmHref(null);
  };

  const sidebarContent = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-center pt-8 pb-4">
        <a href="/" onClick={(e) => { e.preventDefault(); router.push("/"); }}>
          <Image
            alt="Candelaria Nails"
            src="/images/logo.png"
            height={36}
            width={120}
            className="h-auto"
          />
        </a>
      </div>

      {user.fullName && (
        <div className="flex items-center gap-3 px-6 py-4 mx-4 mb-4 bg-gray-50 rounded-xl">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-white">
            {getInitials(user.fullName)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {user.fullName}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
      )}

      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={handleNavClick(item.href)}
                className={classNames(
                  isCurrent(item.href)
                    ? "bg-pink-100 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
                  "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                )}
              >
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    isCurrent(item.href)
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-600",
                    "h-6 w-6 shrink-0 transition-colors duration-200",
                  )}
                />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-100 px-4 py-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 shrink-0" />
          Cerrar sesión
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <span className="sr-only">Abrir menú</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6" />
        </button>
        <a href="/" onClick={(e) => { e.preventDefault(); router.push("/"); }}>
          <Image
            alt="Candelaria Nails"
            src="/images/logo.png"
            height={24}
            width={80}
            className="h-auto"
          />
        </a>
        <div className="w-10" />
      </div>

      {/* Mobile drawer */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300 ease-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-out data-[closed]:-translate-x-full"
          >
            <TransitionChild
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-6 right-0 z-50 flex h-8 w-8 -mr-10 items-center justify-center rounded-full bg-white shadow-lg"
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon aria-hidden="true" className="h-5 w-5 text-gray-500" />
              </button>
            </TransitionChild>
            <div className="flex grow flex-col bg-white shadow-xl">
              {sidebarContent}
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col bg-white border-r border-gray-100 shadow-sm">
          {sidebarContent}
        </div>
      </div>

      {/* Navigation confirmation modal */}
      {navConfirmHref && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm mx-4 p-6 text-center">
            <p className="text-gray-800 font-semibold mb-2">
              ¿Perder la reserva en curso?
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Si continúas, perderás los datos de la reserva que estás armando.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelNavigation}
                className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmNavigation}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-pink-100 rounded-xl hover:opacity-80 transition-opacity"
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
