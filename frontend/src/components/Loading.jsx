import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Loading = () => {
  return (
    <div className="w-full m-8 flex justify-center items-center">
      <ArrowPathIcon className="w-24 h-24 animate-spin" />
    </div>
  );
};

export default Loading;
