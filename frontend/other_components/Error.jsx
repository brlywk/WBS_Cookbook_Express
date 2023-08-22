/* eslint-disable react/prop-types */
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const Error = ({ errorMessage }) => {
  return (
    <div className="flex justify-center items-center">
      <div className=" w-1/2 text-red-600 border border-red-600  flex gap-4 p-4">
        <div className="self-start">
          <ExclamationCircleIcon className=" w-14 h-14" />
        </div>
        <div>
          <div>
            <div className="font-bold">An error has occured</div>
            <div>{errorMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
