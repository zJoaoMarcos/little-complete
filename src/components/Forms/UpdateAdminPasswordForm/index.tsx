import { Input } from "@/components/Form/input";
import { Spinner } from "@chakra-ui/react";
import { useUpdatePassword } from "./hooks/useUpdatePassword";

export function UpdateAdminPasswordForm() {
  const {
    handleSubmit,
    handleUdpatePassword,
    isDirty,
    isSubmitting,
    register,
    errors,
  } = useUpdatePassword();

  return (
    <form
      onSubmit={handleSubmit(handleUdpatePassword)}
      className="min-w-[320px] flex flex-col gap-4 p-6 bg-gray-200 rounded-md"
    >
      <Input
        {...register("currentPassword")}
        error={errors.currentPassword}
        label="Senha atual"
        type="password"
      />
      <Input
        {...register("newPassword")}
        error={errors.newPassword}
        label="Nova senha"
        type="password"
      />
      <Input
        {...register("confirmPassword")}
        error={errors.confirmPassword}
        label="Confirmar senha"
        type="password"
      />

      <button
        disabled={!isDirty || isSubmitting}
        type="submit"
        className="bg-purple-400 py-2 rounded-md text-white font-semibold text-xl hover:bg-purple-500"
      >
        {isSubmitting ? <Spinner /> : "Alterar"}
      </button>
    </form>
  );
}
