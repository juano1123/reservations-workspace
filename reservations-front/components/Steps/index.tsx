export type Step = {
  id: string;
  name: string;
  nextStep?: string | null;
  afterStep?: string | null;
};

interface Props {
  steps: Step[];
  stepSelected: Step;
}

const Steps = ({ steps, stepSelected }: Props) => {
  return (
    <nav
      aria-label="Progress"
      className="w-full lg:w-3/5 mt-8 mb-4 font-nunito px-3"
    >
      <ol role="list" className="space-y-4 md:flex md:space-x-8 md:space-y-0">
        {steps.map((step, sIndex) => (
          <li key={`${step.name}_${sIndex}`} className="md:flex-1">
            {step.id === stepSelected.id && (
              <div className="group flex flex-col border-l-4 border-pink-100 py-2 pl-4  md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-pink-100 ">
                  {step.name}
                </span>
                {/* <span className="text-sm font-medium">{step.name}</span> */}
              </div>
            )}
            {step.id !== stepSelected.id && (
              <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4  md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-gray-500 ">
                  {step.name}
                </span>
                {/* <span className="text-sm font-medium">{step.name}</span> */}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Steps;
