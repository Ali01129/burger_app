import React, { useEffect, useState } from "react";
import type { store } from "../redux/store";
import { useSelector } from "react-redux";

type RootState = ReturnType<typeof store.getState>;

interface Order {
  total: number;
  bacon: number;
  cheese: number;
  lettuce: number;
  meat: number;
}

interface User {
  email: string;
  password: string;
  orders: Order[];
}

function Orders() {
  const currentUser = useSelector((state: RootState) => state.user.email);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const users: User[] = JSON.parse(localStorage.getItem("Users") || "[]");

      const user = users.find((u) => u.email === currentUser);

      if (user) {
        setOrders(user.orders || []);
      } else {
        setOrders([]);
      }

      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [currentUser]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
          <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Loading please wait
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-md p-4 border rounded">
              <div className="mb-2 font-medium">Ingredients:</div>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="border px-3 py-1 rounded text-sm">
                  Bacon ({order.bacon})
                </span>
                <span className="border px-3 py-1 rounded text-sm">
                  Cheese ({order.cheese})
                </span>
                <span className="border px-3 py-1 rounded text-sm">
                  Lettuce ({order.lettuce})
                </span>
                <span className="border px-3 py-1 rounded text-sm">
                  Meat ({order.meat})
                </span>
              </div>
              <div className="text-lg">
                Price{" "}
                <span className="font-bold">USD {order.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
