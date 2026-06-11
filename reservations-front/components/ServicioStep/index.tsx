"use client";

import { IService } from "@/interfaces/IService";
// import { getServicesByBusiness } from "@/store/services/serviceApi";
// import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import ServiceContainer from "../ServiceContainer";

const ServicioStep = () => {
  // const [services, setServices] = useState<IService[]>([]);

  //Todo: Uncomment this code when the API is ready
  // useEffect(() => {
  //   async function fetchData() {
  //     const result = await getServicesByBusiness(); // async operation
  //     setServices(result);
  //   }

  //   fetchData();
  // }, []);

  const harcodedServices: IService[] = [
    {
      id: "8f60ed9a-9400-41a1-9c68-30fc6488b635",
      name: "Uñas en acrílico",
      description:
        "Debes elegir esta técnica siempre y cuando quieras alargar la uña, ya que es muy duradera y permite que crezca la uña natural por debajo. Se realiza mantenimiento cada 15-20 días.",
      price: 1000,
    },
    {
      id: "e37bfec5-92dd-40f3-897c-66a9ac778401",
      name: "Mantenimiento de uñas en acrílico",
      description:
        "Relleno que se realiza cuando la uña en acrílico tiene crecimiento.",
      price: 220,
    },
    {
      id: "06766e15-bf37-473d-b572-2bc0960888bd",
      name: "Pedicuria completa",
      description:
        "El servicio de Pedicuria incluye retiro de durezas y/o callosidades, también corte y arreglo de uñas, puede incluir esmaltado semipermanente si lo desea.",
      price: 980,
    },
    {
      id: "470a2f08-0779-4c15-b177-aa5b940f9c4e",
      name: "Esmaltado semipermanente",
      description:
        "Esmaltado de secando inmediato y de larga duración (aprox: 20 dias)",
      price: 100,
    },
    {
      id: "d86d0c13-559f-452a-83f8-627692696bd4",
      name: "Kapping de acrílico",
      description:
        "Está técnica es usada en nuestro salón para casos en que la uña no acepte correctamente el kapping en gel, como segunda opción para lograr resistencia.",
      price: 300,
    },
    {
      id: "8d69604e-871e-49ea-ba7d-717c3efc06cb",
      name: "Kapping en gel",
      description:
        "Esta técnica fortalece superficialmente la uña, haciéndola más gruesa y resistente. El servicio incluye esmaltado semipermanente.",
      price: 200,
    },
  ];

  return (
    <StepContainer>
      <div className="flex flex-col gap-2 items-start p-3">
        <ServiceContainer services={harcodedServices} />
      </div>
    </StepContainer>
  );
};

export default ServicioStep;
