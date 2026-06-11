import { IService } from "@/interfaces/IService";

export async function getServicesByBusiness(): Promise<IService[]> {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const businessId = process.env.NEXT_PUBLIC_BUSINESS_ID;
    const res = await fetch(`${apiUrl}/service/business/${businessId}`, {
        cache: "no-cache",
    });
    return res.json();
}
