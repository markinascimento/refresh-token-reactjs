import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemaForm, type FormSchema } from "./schema";
import { useAuth } from "@/hooks/useAuth";

export function useSignUpController() {
  const { signIn } = useAuth();

  const { register, handleSubmit: handleFormSubmit } = useForm<FormSchema>({
    resolver: zodResolver(schemaForm),
  });

  const handleSubmit = handleFormSubmit(async (data) => {
    try {
      await signIn(data);
    } catch (error) {
      console.log({ error });
    }
  });

  return {
    register,
    handleSubmit,
  };
}
