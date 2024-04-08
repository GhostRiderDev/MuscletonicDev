import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import loginSchema from "@/zod/loginSchema";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { setLogedUser } from "@/reducers/userReducer";
import { AppDispatch } from "@/store/store";
import { unwrapResult } from "@reduxjs/toolkit";
import ICredential from "@/interfaces/ICredential";
import z from "zod";
import { NavigateFunction } from "react-router";

const LoginForm = ({
  navigate,
  loginForm,
}: {
  navigate: NavigateFunction;
  loginForm: UseFormReturn<z.infer<typeof loginSchema>>;
}) => {
  const { toast } = useToast();
  const dispatch: AppDispatch = useDispatch();

  const handleLoginSubmit = async (values: z.infer<typeof loginSchema>) => {
    const { email, password } = values;

    const userToLogin: ICredential = {
      email,
      password,
    };

    dispatch(setLogedUser(userToLogin))
      .then(unwrapResult)
      .then(() => {
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
        });
      });
  };

  return (
    <form
      onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
      className="space-y-8 block mx-auto"
    >
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
            <FormDescription>This is your personal email</FormDescription>
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
            <FormDescription>This is your private key.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button
        className="w-1/2 mx-auto block bg-sky-600 hover:bg-sky-400"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
