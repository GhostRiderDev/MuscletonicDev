import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FadeLoader } from "react-spinners";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { register } from "@/services/auth";
import registerSchema from "@/zod/registerSchema";
import { IUserRegister } from "@/interfaces/IUserRegister";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import loginSchema from "@/zod/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setLogedUser } from "@/reducers/userReducer";
import ICredential from "@/interfaces/ICredential";
import { unwrapResult } from "@reduxjs/toolkit";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  const handleRegisterSubmit = async (
    values: z.infer<typeof registerSchema>
  ) => {
    setIsLoading(true);
    const { email, firstName, lastName, dni, password } = values;

    const userToRegister: IUserRegister = {
      user: {
        email,
        firstName,
        lastName,
        dni,
      },
      credentials: password,
    };
    register(userToRegister)
      .then(() => {
        setTab("signin");
        toast({
          variant: "default",
          title: "Register Success",
          description: "User was registered with exit",
          className: "bg-green-800 text-white",
          duration: 2000,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Invalid User",
          description: error.response.data.error,
          duration: 3000,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsLoading(false);
      });
  };

  const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;

    const userToLogin: ICredential = {
      email,
      password,
    };
    setIsLoading(true);
    dispatch(setLogedUser(userToLogin))
      .then(unwrapResult)
      .then(() => {
        setIsLoading(false);
        toast({
          variant: "default",
          title: "Login Success",
          description: "User was logged with exit",
          className: "bg-green-800 text-white",
          duration: 1000,
        });
        navigate("/user");
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error,
          description: "",
          duration: 3000,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      });
  };

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dni: "",
    },
  });

  return (
    <div className="flex flex-row my-auto justify-between">
      <div className="hidden md:w-6/12 md:block bg-slate-800"></div>
      <Card className="w-full flex flex-col mt-4 mx-auto justify-center  md:w-5/12 items-center">
        <Tabs defaultValue={tab} value={tab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger onClick={() => setTab("signin")} value="signin">
              Sign in
            </TabsTrigger>
            <TabsTrigger onClick={() => setTab("signup")} value="signup">
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="signin"
            className="flex-col justify-between items-end min-h-[85vh]"
          >
            <CardHeader className="space-y-1">
              <CardDescription>
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...loginForm}>
                <form
                  method="post"
                  onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
                  className="space-y-8 block mx-auto "
                >
                  <div className=" md:block mx-auto  w-4/5 ">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-9/12 mx-auto">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="maria@gmail.com"
                              type="text"
                              {...field}
                              className="max-w-1/2"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your personal email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="w-9/12 mx-auto">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="***********************"
                              type="password"
                              {...field}
                              className="max-w-1/2"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your private key.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="w-1/2 mx-auto block" type="submit">
                    Login
                  </Button>
                </form>
              </Form>
              <CardFooter className="flex flex-col">
                <p className="mt-2 text-xs text-center text-gray-700">
                  Don't have an account?
                  <button
                    className=" text-blue-600 hover:underline"
                    onClick={() => {
                      setTab("signup");
                    }}
                  >
                    Sign up
                  </button>
                </p>
              </CardFooter>
            </CardContent>
          </TabsContent>
          <TabsContent value="signup">
            <CardHeader className="space-y-1">
              <CardDescription>
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...registerForm}>
                <form
                  onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
                  className="space-y-8"
                >
                  <div className="block md:flex w-full  justify-around">
                    <FormField
                      control={registerForm.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="maria"
                              type="text"
                              {...field}
                              className="max-w-1/3"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your first name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Rodriguez"
                              type="text"
                              {...field}
                              className="max-w-1/3"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your last name
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="block md:flex w-full  justify-around">
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="maria@gmail.com"
                              type="text"
                              {...field}
                              className="max-w-1/3"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your personal email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="dni"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>DNI</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="10543432"
                              type="text"
                              {...field}
                              className="max-w-1/3"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your DNI number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="block md:flex w-full  justify-around">
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="***********************"
                              type="password"
                              {...field}
                              className="max-w-1/3"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your private key.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="***********************"
                              type="password"
                              {...field}
                              className="max-w-1/3"
                            />
                          </FormControl>
                          <FormDescription>
                            This is your private key.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button className="w-1/2 block mx-auto" type="submit">
                    Sign up
                  </Button>
                </form>
              </Form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
          <FadeLoader className="text-center" />
        </div>
      ) : null}
      -
    </div>
  );
};

export default Register;
