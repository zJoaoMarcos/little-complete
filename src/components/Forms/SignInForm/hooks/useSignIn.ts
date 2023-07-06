import { useAuth } from "@/contexts/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignInSchema } from "./schema";
import { SignInData } from "./types";

export const useSignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<SignInData>({
    resolver: zodResolver(SignInSchema),
  });

  console.log(errors);

  const { signIn } = useAuth();

  const handleSignIn: SubmitHandler<SignInData> = async (data, event) => {
    event?.preventDefault();

    await signIn(data);
  };

  return {
    register,
    handleSubmit,
    handleSignIn,
    isDirty,
    isSubmitting,
    errors,
  };
};
