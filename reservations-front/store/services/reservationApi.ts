import { IBookingState } from "@/interfaces/IBooking";

function authHeaders(): Record<string, string> {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function createReservation(
  booking: IBookingState,
  clientId?: string,
): Promise<unknown> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const dateStr = booking.date
    ? new Date(booking.date).toISOString().split("T")[0]
    : "";

  const body: Record<string, unknown> = {
    professionalId: booking.professional?.id,
    serviceId: booking.service?.id,
    businessId: process.env.NEXT_PUBLIC_BUSINESS_ID,
    date: dateStr,
    startTime: booking.time?.startTime,
    endTime: booking.time?.endTime,
    status: "pending",
  };

  if (clientId) {
    body.clientId = clientId;
  }

  const res = await fetch(`${apiUrl}/reservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message ?? "Error creating reservation");
  }

  return res.json();
}

export async function getReservationsByBusiness(): Promise<unknown[]> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;
  const res = await fetch(`${apiUrl}/reservation/business/${businessId}`, {
    headers: authHeaders(),
  });
  return res.json();
}
