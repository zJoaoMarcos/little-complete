import { CreateNewUserForm } from "@/components/Forms/CreateNewUserForm";
import { Layout } from "@/components/Layout";
import Head from "next/head";
import { ReactElement } from "react";
import { NextPageWithLayout } from "../_app";

const NewDepartment: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Novo usuário</title>
      </Head>

      <CreateNewUserForm />
    </>
  );
};

NewDepartment.getLayout = function getLayout(chidren: ReactElement) {
  return <Layout>{chidren}</Layout>;
};

export default NewDepartment;
