"use client";

import { useAuth } from "@/contexts/AuthContext";
import { authFetch } from "@/utils/authFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Reservation {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
  service: { name: string };
  professional: {
    user?: { firstName: string; lastName: string };
  };
}

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }
    const currentUser = user;
    async function fetchReservations() {
      try {
        const res = await authFetch(
          `${apiUrl}/reservation/client/${currentUser.id}`,
        );
        const data = await res.json();
        setReservations(data);
      } catch {
        console.error("Error fetching reservations");
      } finally {
        setLoading(false);
      }
    }
    fetchReservations();
  }, [apiUrl, user, authLoading, router]);

  const formatTime = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    const period = h >= 12 ? "pm" : "am";
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}${period}`;
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${styles[status] ?? "bg-gray-100 text-gray-800"}`}
      >
        {status}
      </span>
    );
  };

  const totalAppointments = reservations.length;
  const pendingCount = reservations.filter(
    (r) => r.status === "pending",
  ).length;
  const completedCount = reservations.filter(
    (r) => r.status === "completed",
  ).length;

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-pink-100 mb-6 font-nunito">
          Mis Reservas
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Total de reservas
            </h3>
            <p className="text-3xl font-bold text-pink-600 mt-2">
              {loading ? "-" : totalAppointments}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Pendientes</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">
              {loading ? "-" : pendingCount}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">
              Completadas
            </h3>
            <p className="text-3xl font-bold text-green-500 mt-2">
              {loading ? "-" : completedCount}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-700">
              Reservas recientes
            </h2>
          </div>
          {loading ? (
            <div className="p-6 text-center text-gray-400">Cargando...</div>
          ) : reservations.length === 0 ? (
            <div className="p-6 text-center text-gray-400">
              No tienes reservas aún
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                      Servicio
                    </th>
                    <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                      Profesional
                    </th>
                    <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                      Fecha
                    </th>
                    <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                      Horario
                    </th>
                    <th className="text-left px-6 py-3 text-gray-600 font-semibold">
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">{r.service?.name}</td>
                      <td className="px-6 py-4">
                        {r.professional?.user?.firstName ?? "-"}
                      </td>
                      <td className="px-6 py-4">{r.date.split("-").reverse().join("/")}</td>
                      <td className="px-6 py-4">
                        {formatTime(r.startTime)} - {formatTime(r.endTime)}
                      </td>
                      <td className="px-6 py-4">{statusBadge(r.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
  );
}
