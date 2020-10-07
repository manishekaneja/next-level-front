import React from "react";
import Link from "next/link";

interface ErrorProps {}
const Error: React.FC<ErrorProps> = () => {
  return (
    <div>
      <p>Landed on Error Page</p>
      <Link href="/"> Go back to home page</Link>
    </div>
  );
};

export default Error;
