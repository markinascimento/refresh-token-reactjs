import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemaForm, type FormSchema } from "./schema";

export function useSignInController() {
  const { signIn } = useAuth();

  const { register, handleSubmit: handleFormSubmit } = useForm<FormSchema>({
    resolver: zodResolver(schemaForm),
  });

  const handleSubmit = handleFormSubmit(async (data) => {
    await signIn(data);
  });

  return {
    register,
    handleSubmit,
  };
}
