import React from "react";
import RegsiterForm from "../components/register/RegisterForm";
import Layout from "../components/common/Layout";

interface RegisterProps {}
const Regsiter: React.FC<RegisterProps> = () => {
  return (
    <Layout title="Lireddit | Register">
      <RegsiterForm />
    </Layout>
  );
};

export default Regsiter;
