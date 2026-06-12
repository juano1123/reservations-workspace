import { IService } from "@/interfaces/IService";
import ServiceList from "../ServiceList";
import ServiceDetail from "../ServiceDetail";

interface Props {
  services: IService[];
  selectedService: IService | null;
  onSelectService: (service: IService) => void;
}

const ServiceContainer = ({ services, selectedService, onSelectService }: Props) => {
  return (
    <div className="w-full min-h-full flex flex-col lg:flex-row gap-4 justify-start items-start">
      <ServiceList
        services={services}
        serviceSelected={selectedService}
        setServiceSelected={onSelectService}
      />
      <ServiceDetail service={selectedService} />
    </div>
  );
};

export default ServiceContainer;
