import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm, type SubmitHandler } from "react-hook-form";
import type { z } from "zod";
import { resetPasswordSchema } from "../schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  useLogoutMutation,
  useResetPasswordMutation,
} from "@/store/slices/userApi";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/slices/auth";

type formInputs = z.infer<typeof resetPasswordSchema>;

function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [resetPasswordMutation, { isLoading }] = useResetPasswordMutation();
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<formInputs> = async (data) => {
    try {
      const res = await resetPasswordMutation({
        newPassword: data.newPassword,
        token: params.id!,
      }).unwrap();
      await logoutMutation({});
      dispatch(clearUserInfo());
      form.reset();
      toast.success(res.message);
      navigate("/login");
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  return (
    <Card className="max-w-2/5 mx-auto mt-40">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isLoading}>
              Change password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ResetPassword;
