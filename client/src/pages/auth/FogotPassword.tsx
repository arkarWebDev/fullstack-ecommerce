import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { forgotPasswordSchema } from "../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

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
import {
  useForgotPasswordMutation,
  useLoginMutation,
} from "@/store/slices/userApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useEffect } from "react";

type formInputs = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      await forgotPasswordMutation(data).unwrap();
      form.reset();
      toast.success("Email send.");
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
        <h2 className="font-bold text-center mb-4 ">FASH.COM</h2>
        <p className="text-xs font-medium text-gray-400 text-center mb-4">
          Enter your email get password reset mail.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button className="w-full" disabled={isLoading}>
              Forgot password
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}

export default ForgotPassword;
