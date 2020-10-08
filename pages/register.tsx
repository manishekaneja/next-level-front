import React from "react";
import RegsiterForm from "../components/register/RegisterForm";
import Layout from "../components/common/Layout";
import BackWallpaper from "../components/common/BackWallpaper";

interface RegisterProps {}
const Regsiter: React.FC<RegisterProps> = () => {
  return (
    <Layout title="Lireddit | Register">
      <BackWallpaper />
      <RegsiterForm />
    </Layout>
  );
};

export default Regsiter;
