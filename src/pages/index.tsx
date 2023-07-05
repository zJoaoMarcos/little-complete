import { Input } from "@/components/Form/input";
import { Logo } from "@/components/Logo";
import { AuthContext } from "@/contexts/Auth";
import { withSSRGuest } from "@/utils/withSSRGuest";
import Head from "next/head";
import { FormEvent, useContext, useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="w-screen h-screen flex flex-col justify-center sm:flex-row gap-8 p-4">
        <div className="flex flex-col gap-2 p-2 items-center sm:items-start justify-center">
          <Logo />

          <p className="font-semibold md:text-3xl mt-4 flex-wrap text-purple-500 sm:w-80">
            De tudo um pouco, de pouco um tudo. O mió dos miores
          </p>
        </div>

        <div className="flex flex-col items-center justify-center sm:w-full sm:max-w-[660px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col bg-gray-200 gap-4 rounded-md p-6 sm:p-10 w-full sm:w-3/4 "
          >
            <Input
              name="email"
              type="string"
              label="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full py-3 bg-purple-500 rounded-md dtext-white font-semibold text-white text-lg hover:bg-purple-600"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
