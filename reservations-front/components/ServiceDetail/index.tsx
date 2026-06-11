import { IService } from "@/interfaces/IService";
interface Props {
  service: IService | null;
}

const ServiceDetail = ({ service }: Props) => {
  if (!service) return null;
  return (
    <div className="flex w-full flex-col items-center bg-white md:flex-row md:max-w-xl px-3 font-nunito">
      <div className="flex flex-col justify-between leading-normal gap-4">
        <div className="w-full ">
          <h5 className="pb-2 w-full text-2xl font-bold tracking-tight text-pink-100 border-b-2 border-gray-100 ">
            {service.name}
          </h5>
          <p className="mb-3 mt-3 font-normal text-gray-400 text-pretty">
            {service.description}
          </p>
        </div>
        <div className="flex flex-col">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-pink-100 ">
            Duración
          </h5>
          <p className="mb-3 font-normal text-gray-400">45 minutos</p>
        </div>
        <div className="flex flex-col">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-pink-100 ">
            Precio
          </h5>
          <p className="mb-3 font-bold text-gray-700">$ {service.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
