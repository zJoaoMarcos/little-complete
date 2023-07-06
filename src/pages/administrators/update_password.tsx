import { UpdateAdminPasswordForm } from "@/components/Forms/UpdateAdminPasswordForm";
import { Logo } from "@/components/Logo";
import { setupApiClient } from "@/services/apiClient";
import { withSSRAuth } from "@/utils/withSSRAuth";

interface UpdatePasswordProps {
  displayName: string;
  email: string;
}

export default function UpdatePassword({
  displayName,
  email,
}: UpdatePasswordProps) {
  return (
    <div className="w-screen h-screen flex flex-col sm:flex-row items-center sm:justify-center gap-20 mt-20 sm:mt-0 ">
      <div className="flex flex-col items-center sm:items-start justify-center gap-4 p-2 sm:p-20">
        <Logo />

        <h2 className=" font-semibold text-xl sm:text-2xl text-purple-400">
          Altere a sua senha {displayName} Ademar 🚀
        </h2>
      </div>

      <div className="flex flex-col items-start justify-center p-2">
        <UpdateAdminPasswordForm />
      </div>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const api = setupApiClient(ctx);

  const response = await api.get("auth/me");

  const { email, displayName } = response.data;

  return {
    props: { email, displayName },
  };
});
