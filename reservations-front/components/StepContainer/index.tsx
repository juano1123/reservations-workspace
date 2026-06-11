interface Props {
  children: React.ReactNode;
}

const StepContainer = ({ children }: Props) => {
  return (
    <div className="w-full h-full min-h-[500px] lg:w-3/5 flex flex-col border border-gray-50 shadow shado-lg px-4 py-2 rounded-lg">
      {children}
    </div>
  );
};

export default StepContainer;
