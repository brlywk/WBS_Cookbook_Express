/* eslint-disable react/prop-types */
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const Error = ({ errorMessage }) => {
  return (
    <div className="">
      <div className="">
        <div className="">
          <ExclamationCircleIcon className="" />
        </div>
        <div>
          <div>
            <div className="">An error has occured</div>
            <div>{errorMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
