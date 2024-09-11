import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignInController } from "./useSignInController";
import { Link } from "react-router-dom";

export function SignIn() {
  const { register, handleSubmit } = useSignInController();

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-96">
        <h1 className="text-xl font-semibold"> Acessar conta </h1>

        <Link to="/sign-up">
          <small className="text-sm text-zinc-300 font-medium">
            Ainda não possui uma conta?
            <strong className="text-zinc-100"> Criar conta </strong>
          </small>
        </Link>

        <Input placeholder="E-mail" {...register("email")} />

        <Input placeholder="Senha" {...register("password")} />

        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
