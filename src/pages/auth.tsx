import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux';
import {login} from '../redux/slices/loginSlice';

interface LoginFormValues {
  email: string;
  password: string;
}

interface User {
  email: string;
  password: string;
  orders: Order[];
}

interface Order {
  total:number;
  bacon:number;
  cheese:number;
  lettuce:number;
  meat:number;
}


function Auth() {

    const dispath=useDispatch();
    const [btnTxt, setBtnTxt] = useState('SIGNIN');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const Register = (values: LoginFormValues, setError: (msg: string) => void) => {
        const users: User[] = JSON.parse(localStorage.getItem('Users') || "[]");
        const userExists = users.some((u) => u.email === values.email);
        if (userExists) {
            setError("User already exists");
            return;
        }
        const newUser: User = {
            email: values.email,
            password: values.password,
            orders: []
        };

        localStorage.setItem("Users", JSON.stringify([...users, newUser]));
    };

    const Login = (values: LoginFormValues, setError: (msg: string) => void) => {
        const users: User[] = JSON.parse(localStorage.getItem('Users') || "[]");
        const result = users.find(user => user.email === values.email);
        if (!result) {
            setError("User does not exist");
            return;
        }
        if (result.password !== values.password) {
            setError("Wrong email or password");
            return;
        }
        const a={
            email:values.email
        }
        dispath(login(a))
    };


  return (
    <>
      <div className="flex justify-center items-center my-8 px-4">
        <div className="shadow-lg shadow-black-500 p-10 flex flex-col w-120 max-w-sm w-full">
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={values => {
              const errors: Partial<Record<keyof LoginFormValues, string>> = {};
              if (!values.email) {
                errors.email = "Email is required";
              }
              if (!values.password) {
                errors.password = "Password is required";
              }
              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              setLoading(true);
              setError(""); // clear error on new submit
              setTimeout(() => {
                if (btnTxt === "REGISTER") {
                  Register(values, setError);
                } else {
                  Login(values, setError);
                }
                setLoading(false);
                resetForm();
              }, 1000);
            }}
          >
            {({ errors }) => (
              <Form className="flex flex-col items-center">
                {error && (
                  <div className="text-red-500 font-semibold mb-4 text-center">
                    {error}
                  </div>
                )}
                {loading ? (
                  <>
                    <div className="text-center">
                      <div
                        className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
                      ></div>
                      <h2 className="text-zinc-900 dark:text-white mt-4">Loading...</h2>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Loading please wait
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <Field
                      className={errors.email
                        ? "border bg-[#fa8072] border-red-500 w-full px-2 py-1"
                        : "border border-[#cccccc] w-full px-2 py-1 mb-8"}
                      type="email"
                      name="email"
                      placeholder="E-mail Address"
                    />
                    <ErrorMessage component="div" className='text-red-500 mb-4 mt-2' name='email' />

                    <Field
                      className={errors.password
                        ? "border bg-[#fa8072] border-red-500 w-full px-2 py-1"
                        : "border border-[#cccccc] w-full px-2 py-1"}
                      type="password"
                      name="password"
                      placeholder="Password"
                    />
                    <ErrorMessage component="div" className='text-red-500 mb-2 mt-2' name='password' />

                    <button className="font-bold text-green-500 mb-8 mt-6" type="submit">SUBMIT</button>
                    <button
                      className="font-bold text-orange-800"
                      type="button"
                      onClick={() => {
                        setBtnTxt(btnTxt === "SIGNIN" ? "REGISTER" : "SIGNIN");
                        setError(""); // clear error when switching
                      }}
                    >
                      {btnTxt}
                    </button>
                  </>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Auth;