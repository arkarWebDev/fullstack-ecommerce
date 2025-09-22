import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { registerSchema } from "../../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRegisterMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

type formInputs = z.infer<typeof registerSchema>;

function Register() {
  const [registerMuatation, { isLoading }] = useRegisterMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const form = useForm<formInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      await registerMuatation(data).unwrap();
      form.reset();
      toast.success("Regsiter success.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <section className="flex h-[70vh] w-full justify-center items-center">
      <div className="w-1/3 border-2 border-gray-200 p-8 rounded-xl">
        <h2 className="font-bold text-center mb-4">FASH.COM</h2>
        <p className="text-xs font-medium text-gray-400 text-center mb-4">
          Enter your infomations to register.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@hello.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isLoading}>
              Register
            </Button>
          </form>
        </Form>
        <p className="text-xs text-center mt-6 font-medium">
          Already have an account?{" "}
          <Link to={"/login"} className="underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
