import StepContainer from "../StepContainer";

const horarios = [
  {
    id: 1,
    hora: "08:00am - 09:00am",
  },
  {
    id: 2,
    hora: "09:00am - 10:00am",
  },
  {
    id: 3,
    hora: "10:00am - 11:00am",
  },
  {
    id: 4,
    hora: "11:00am - 12:00pm",
  },
  {
    id: 7,
    hora: "02:00pm - 03:00pm",
  },
  {
    id: 8,
    hora: "03:00pm - 04:00pm",
  },
  {
    id: 9,
    hora: "04:00pm - 05:00pm",
  },
  {
    id: 10,
    hora: "05:00pm - 06:00pm",
  },
  {
    id: 11,
    hora: "06:00pm - 07:00pm",
  },
];

const HoraStep = () => {
  return (
    <StepContainer>
      <div className="h-full flex flex-1 flex-col items-center">
        <div className="mt-2 w-full">
          {horarios &&
            horarios.map((horario, index) => (
              <div key={`${horario}_${index}`}>
                {index > 0 && <hr key={`${index}_${horario}`} />}
                <div className="flex items-center justify-between w-full m-1.5">
                  <div className="text-sm  leading-7 text-gray-600">
                    {horario.hora}
                  </div>
                  <button className="text-sm  leading-7 text-pink-100  cursor-pointer px-3 p-1 hover:scale-105">
                    Agendar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </StepContainer>
  );
};

export default HoraStep;
