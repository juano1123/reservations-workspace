import { IService } from "@/interfaces/IService";
import { useState } from "react";
import ServiceList from "../ServiceList";
import ServiceDetail from "../ServiceDetail";

interface Props {
  services: IService[] | null;
}

const ServiceContainer = ({ services }: Props) => {
  const [serviceSelected, setServiceSelected] = useState<IService | null>(null);

  return (
    <div className="w-full min-h-full flex flex-col lg:flex-row gap-4 justify-start items-start">
      <ServiceList
        services={services ?? []}
        serviceSelected={serviceSelected}
        setServiceSelected={setServiceSelected}
      />
      <ServiceDetail service={serviceSelected} />
    </div>
  );
};

export default ServiceContainer;
