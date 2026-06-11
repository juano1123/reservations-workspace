import { Nunito } from "next/font/google";

export const nunitoInit = Nunito({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-nunito",
    weight: "300",
});

export const nunito = nunitoInit.variable;