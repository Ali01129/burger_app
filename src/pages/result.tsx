import { useNavigate } from "react-router-dom";
import type { store } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { Clear } from "../redux/slices/burgerSlice";

type RootState = ReturnType<typeof store.getState>;

interface User {
  email: string;
  password: string;
  orders: Order[];
}

interface Order {
  total: number;
  bacon: number;
  cheese: number;
  lettuce: number;
  meat: number;
}

function Result() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lettuce = useSelector((state: RootState) => state.burger.lettuce);
  const bacon = useSelector((state: RootState) => state.burger.bacon);
  const cheese = useSelector((state: RootState) => state.burger.cheese);
  const meat = useSelector((state: RootState) => state.burger.meat);
  const total = useSelector((state: RootState) => state.burger.total);
  const currentUser = useSelector((state: RootState) => state.user.email);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const AddOrder = () => {
    const users: User[] = JSON.parse(localStorage.getItem("Users") || "[]");
    const userIndex = users.findIndex((u) => u.email === currentUser);

    if (userIndex === -1) {
      setError("User not found");
      return;
    }

    users[userIndex].orders.push({
      lettuce: lettuce,
      meat: meat,
      cheese: cheese,
      bacon: bacon,
      total: total,
    });
    localStorage.setItem("Users", JSON.stringify(users));
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-bold text-2xl md:text-4xl my-6 text-center">
        We hope it tastes well!
      </div>

      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="h-16 w-[80%] bg-gradient-to-t from-[#e27b36] to-[#bc581e] rounded-t-full mb-2" />

        {lettuce === 0 && bacon === 0 && cheese === 0 && meat === 0 && (
          <div className="py-4 font-bold text-lg md:text-xl text-center">
            No Ingredients Added
          </div>
        )}

        {/* Lettuce */}
        {Array(lettuce)
          .fill(null)
          .map((_, index) => (
            <div
              key={`lettuce-${index}`}
              className="h-7 w-[90%] bg-gradient-to-t from-[#91ce50] to-[#228c1d] rounded-2xl mb-2"
            />
          ))}

        {/* Bacon */}
        {Array(bacon)
          .fill(null)
          .map((_, index) => (
            <div
              key={`bacon-${index}`}
              className="h-3 w-[80%] bg-[#c14621] mb-2"
            />
          ))}

        {/* Cheese */}
        {Array(cheese)
          .fill(null)
          .map((_, index) => (
            <div
              key={`cheese-${index}`}
              className="h-5 w-[90%] bg-gradient-to-t from-[#d6bb22] to-[#f4d004] rounded-2xl mb-2"
            />
          ))}

        {/* Meat */}
        {Array(meat)
          .fill(null)
          .map((_, index) => (
            <div
              key={`meat-${index}`}
              className="h-7 w-[80%] bg-[#783206] rounded-2xl mb-2"
            />
          ))}

        {/* Bottom bun */}
        <div className="h-12 w-[80%] bg-gradient-to-t from-[#e27b36] to-[#f08e4a] rounded-b-2xl" />
      </div>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-between mt-10 gap-4 w-full max-w-xs">
        <button
          className="px-4 py-2 bg-gray-100 text-[#966909] font-bold rounded"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-gray-100 text-green-600 font-bold rounded mb-10"
          onClick={() => setShow(true)}
        >
          Continue
        </button>
      </div>

      {show && (
        <div className="shadow-lg shadow-black-500 p-10 flex flex-col w-120 max-w-sm w-full my-20">
          <Formik
            initialValues={{
              name: "",
              street: "",
              zipcode: "",
              country: "",
              email: "",
              deliveryMethod: "",
            }}
            onSubmit={(_, { resetForm }) => {
              AddOrder();
              dispatch(Clear());
              navigate("/");
              resetForm();
            }}
          >
            {({ values }) => {
              const allEmpty = Object.values(values).every((val) => val === "");

              return (
                <Form className="flex flex-col items-center">
                  {error && (
                    <div className="text-red-500 font-semibold mb-4 text-center">
                      {error}
                    </div>
                  )}
                  <>
                    <div className="my-4 font-bold text-lg">
                      Enter your Contact Data
                    </div>
                    <Field
                      className="border border-[#cccccc] w-full px-2 py-1 mb-4"
                      type="text"
                      name="name"
                      placeholder="Name"
                    />
                    <Field
                      className="border border-[#cccccc] w-full px-2 py-1 mb-4"
                      type="text"
                      name="street"
                      placeholder="Street"
                    />
                    <Field
                      className="border border-[#cccccc] w-full px-2 py-1 mb-4"
                      type="text"
                      name="zipcode"
                      placeholder="Zip Code"
                    />
                    <Field
                      className="border border-[#cccccc] w-full px-2 py-1 mb-4"
                      type="text"
                      name="country"
                      placeholder="Country"
                    />
                    <Field
                      className="border border-[#cccccc] w-full px-2 py-1 mb-4"
                      type="email"
                      name="email"
                      placeholder="E-mail Address"
                    />
                    <Field
                      as="select"
                      name="deliveryMethod"
                      className="border border-[#cccccc] w-full px-2 py-1 mb-6"
                    >
                      <option value="fast">Fast</option>
                      <option value="cheap">Cheap</option>
                    </Field>

                    <button
                      className={`font-bold ${
                        allEmpty ? "text-gray-500" : "text-green-500"
                      }  my-2`}
                      type="submit"
                    >
                      Order
                    </button>
                  </>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Result;
