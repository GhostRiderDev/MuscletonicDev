import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Form } from "./ui/form";
import { FadeLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import registerSchema from "@/zod/registerSchema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import loginSchema from "@/zod/loginSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");

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
      <div className="hidden overflow-hidden md:w-6/12 md:block bg-slate-800 max-h-screen">
        <img src="/b2.jpg" className="" />
      </div>
      <Card className="w-full flex flex-col mt-4 mx-auto justify-center  md:w-5/12 items-center">
        <Tabs defaultValue={tab} value={tab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 top-0">
            <TabsTrigger
              onClick={() => setTab("signin")}
              value="login"
              className={tab === "signin" ? "bg-sky-500 text-white" : ""}
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setTab("signup")}
              value="register"
              className={tab === "signup" ? "bg-sky-500 text-white" : ""}
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <CardHeader className="space-y-1">
              <CardDescription>
                Enter your information to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...registerForm}>
                <RegisterForm setTab={setTab} setIsLoading={setIsLoading} />
              </Form>
            </CardContent>
          </TabsContent>
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
                <LoginForm navigate={navigate} />
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
        </Tabs>
      </Card>
      {isLoading ? (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100 bg-opacity-50 z-50">
          <FadeLoader className="text-center" />
        </div>
      ) : null}
    </div>
  );
};

export default Auth;
