import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignUpController } from "./useSignUpController";
import { Link } from "react-router-dom";

export function SignUp() {
  const { register, handleSubmit } = useSignUpController();

  return (
    <div className="flex items-center justify-center w-full h-full ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-96">
        <h1 className="text-xl font-semibold">Crie sua conta gratuitamente!</h1>

        <Link to="/sign-in">
          <small className="text-sm text-zinc-300 font-medium">
            Já possui uma conta?
            <strong className="text-zinc-100"> Fazer login </strong>
          </small>
        </Link>

        <Input placeholder="Usuário" {...register("username")} />

        <Input placeholder="E-mail" {...register("email")} />

        <Input placeholder="Senha" {...register("password")} />

        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
}
