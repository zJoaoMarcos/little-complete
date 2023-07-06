import { Input } from "@/components/Form/input";
import { Spinner } from "@chakra-ui/react";
import { useSignIn } from "./hooks/useSignIn";

export function SignInForm() {
  const {
    handleSignIn,
    handleSubmit,
    register,
    isSubmitting,
    errors,
    isDirty,
  } = useSignIn();

  return (
    <form
      onSubmit={handleSubmit(handleSignIn)}
      className="flex flex-col bg-gray-200 gap-4 rounded-md p-6 sm:p-10 w-full sm:w-3/4 "
    >
      <Input
        {...register("email")}
        type="string"
        label="E-mail"
        error={errors.email}
      />
      <Input
        {...register("password")}
        type="password"
        label="Senha"
        error={errors.password}
      />

      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="w-full py-3 bg-purple-500 rounded-md dtext-white font-semibold text-white text-lg hover:bg-purple-600 active:bg-purple-700"
      >
        {isSubmitting ? <Spinner /> : "Entrar"}
      </button>
    </form>
  );
}
