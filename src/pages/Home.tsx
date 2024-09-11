import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export function Home() {
  const { signOut } = useAuth();

  useEffect(() => {
    console.log("home renderized");
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Button type="button" onClick={signOut} variant="secondary">
        Sair
      </Button>

      <main className="flex items-center gap-2 mt-10">
        <div className="flex items-center justify-center w-32 h-16 rounded-lg bg-zinc-700">
          name 1
        </div>

        <div className="flex items-center justify-center w-32 h-16 rounded-lg bg-zinc-700">
          name 2
        </div>

        <div className="flex items-center justify-center w-32 h-16 rounded-lg bg-zinc-700">
          name 3
        </div>
      </main>
    </div>
  );
}
