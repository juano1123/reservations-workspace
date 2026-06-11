import { IService } from "@/interfaces/IService";
import { cn } from "@/utils";

interface Props {
  services: IService[] | [];
  serviceSelected: IService | null;
  setServiceSelected: (service: IService) => void;
}

const ServiceList = ({
  services,
  serviceSelected,
  setServiceSelected,
}: Props) => {
  return (
    <nav
      aria-label="Sidebar"
      className="flex w-2/5 min-w-fit flex-col mt-3 lg:mt-0 lg:border-r-2 border-gray-50 px-2"
    >
      <ul role="list" className="-mx-2">
        {services.map((service) => (
          <li key={service.name}>
            <div
              onClick={() => setServiceSelected(service)}
              className={cn(
                serviceSelected?.id === service.id
                  ? "bg-gray-50 text-pink-100"
                  : "text-pink-100 hover:bg-gray-50 hover:text-pink-100",
                "group flex gap-x-3 rounded-md p-1.5 pl-3 text-sm font-semibold leading-6 cursor-pointer font-nunito"
              )}
            >
              {service.name}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ServiceList;
