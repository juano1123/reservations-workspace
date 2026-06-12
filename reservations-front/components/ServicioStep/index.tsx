"use client";

import { IService } from "@/interfaces/IService";
import { getServicesByBusiness } from "@/store/services/serviceApi";
import { useEffect, useState } from "react";
import StepContainer from "../StepContainer";
import ServiceContainer from "../ServiceContainer";

interface Props {
  selectedService: IService | null;
  onSelectService: (service: IService) => void;
}

const ServicioStep = ({ selectedService, onSelectService }: Props) => {
  const [services, setServices] = useState<IService[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getServicesByBusiness();
        setServices(result);
      } catch {
        console.error("Error fetching services");
      }
    }

    fetchData();
  }, []);

  return (
    <StepContainer>
      <div className="flex flex-col gap-2 items-start p-3">
        <ServiceContainer
          services={services}
          selectedService={selectedService}
          onSelectService={onSelectService}
        />
      </div>
    </StepContainer>
  );
};

export default ServicioStep;
