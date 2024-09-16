import { Button } from "@/components/ui/button";
import type { IOrder } from "@/entities/Iorder";
import { useAuth } from "@/hooks/useAuth";
import { OrderServices } from "@/services/OrderServices";
import { useEffect, useState } from "react";

export function Home() {
  const { signOut } = useAuth();

  const [orders, setOrders] = useState<IOrder[]>([])

  useEffect(() => {
    OrderServices.getOrders()
    .then(setOrders)
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Button type="button" onClick={signOut} variant="secondary">
        Sair
      </Button>

      <main className="flex items-center gap-2 mt-10">
        {orders.map(order => (
          <div 
            key={order.id}
            className="flex items-center justify-center w-32 h-16 rounded-lg bg-zinc-700"
          >
            {order?.id.slice(0, 8)}
          </div>
        ))}

      </main>
    </div>
  );
}
