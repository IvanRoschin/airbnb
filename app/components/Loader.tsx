"use client";

import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
  h-[70vh]
  flex
  flec-col
  justify-center
  items-center
  "
    >
      <PuffLoader size={100} color="red" />
    </div>
  );
};

export default Loader;
