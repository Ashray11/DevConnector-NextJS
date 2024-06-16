import { Fragment } from "react";
import Image from "next/image";

const Spinner = () => {
  return (
    <Fragment>
      <Image
        src={"/assets/img/snake.gif"}
        style={{ width: "80px", margin: "auto", display: "block" }}
        width="80"
        height="80"
        alt="Loading..."
      />
    </Fragment>
  );
};

export default Spinner;
