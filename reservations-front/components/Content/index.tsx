import Link from "next/link";

export default function Content() {
  const services = [
    {
      name: "Esmaltado semipermanente",
      description:
        "Esmaltado de secando inmediato y de larga duración (aprox: 20 dias)",
      href: "/agendar",
    },
    {
      name: "Kapping en gel",
      description:
        "Esta técnica fortalece superficialmente la uña, haciéndola más gruesa y resistente. El servicio incluye esmaltado semipermanente.",
      href: "/agendar",
    },
    {
      name: "Kapping de acrílico",
      description:
        "Está técnica es usada en nuestro salón para casos en que la uña no acepte  correctamente el kapping en gel, como segunda opción para lograr resistencia.",
      href: "/agendar",
    },
    {
      name: "Uñas en acrílico",
      description:
        "Debes elegir esta técnica siempre y cuando quieras alargar la uña, ya que es muy duradera y permite que crezca la uña natural por debajo. Se realiza mantenimiento  cada 15-20 días.",
      href: "/agendar",
    },
    {
      name: "Mantenimiento de uñas en acrílico",
      description:
        "Relleno que se realiza cuando la uña en acrílico tiene crecimiento.",
      href: "/agendar",
    },
    {
      name: "Pedicuria completa",
      description:
        "El servicio de Pedicuria incluye retiro de durezas y/o callosidades, también corte y arreglo de uñas, puede incluir esmaltado semipermanente si lo desea.",
      href: "/agendar",
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32 font-nunito">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl tracking-tight text-pink-100 sm:text-4xl font-nunito">
            Servicios
          </h2>
        </div>
        <div className="mx-auto mt-6 max-w-2xl sm:mt-16 lg:mt-12 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-xl  leading-7 text-pink-100 font-nunito">
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <Link
                      href={feature.href}
                      className="text-sm  leading-6 text-pink-100"
                    >
                      Agendar <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
