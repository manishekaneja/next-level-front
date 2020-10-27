import Link from "next/link";
import React from "react";
import RoutesEndpoints from "../utils/constants/routes";

interface ErrorProps {}
const Error: React.FC<ErrorProps> = () => {
  return (
    <div>
      <p>Landed on Error Page</p>
      <Link href={RoutesEndpoints.NEWS_FEED}> Go back to home page</Link>
    </div>
  );
};

export default Error;
