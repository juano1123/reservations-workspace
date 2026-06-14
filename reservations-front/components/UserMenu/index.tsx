"use client";

import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { CalendarIcon, HomeIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function UserMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <Link
        href="/login"
        className="text-sm font-semibold leading-6 text-pink-100 hover:text-pink-300 transition-colors"
      >
        Iniciar sesión <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 rounded-full p-0.5 hover:bg-white/20 transition-colors">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-xs font-bold text-white">
          {getInitials(user.fullName || user.email)}
        </div>
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        <div className="px-4 py-3 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800 truncate">
            {user.fullName || "Usuario"}
          </p>
          <p className="text-xs text-gray-400 truncate">{user.email}</p>
        </div>

        <div className="py-1">
          <MenuItem>
            <Link
              href="/agendar"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-100 transition-colors"
            >
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              Agendar
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-pink-100 transition-colors"
            >
              <HomeIcon className="h-5 w-5 text-gray-400" />
              Mis Reservas
            </Link>
          </MenuItem>
        </div>

        <div className="border-t border-gray-100 py-1">
          <MenuItem>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-5 w-5" />
              Cerrar sesión
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
}
