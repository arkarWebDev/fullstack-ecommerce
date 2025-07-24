import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { passwordUpdateSchema } from "@/schema/user";
import { Button } from "../ui/button";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { usePasswordUpdateMutation } from "@/store/slices/userApi";

type formInput = z.infer<typeof passwordUpdateSchema>;

function PasswordUpdateForm() {
  const form = useForm<z.infer<typeof passwordUpdateSchema>>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const watchedNewPassword = form.watch("newPassword");
  const watchedConfirmassword = form.watch("confirmPassword");

  const [passwordUpdateMutation, { isLoading }] = usePasswordUpdateMutation();

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const res = await passwordUpdateMutation({
        oldPassword: data.oldPassword,
        newPassword: data.confirmPassword,
      }).unwrap();
      form.reset();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Update Pssword</CardTitle>
        <CardDescription>You can update your password here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Old password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Confirm new password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={
                watchedNewPassword !== watchedConfirmassword || isLoading
              }
              className="mt-4"
            >
              Update
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default PasswordUpdateForm;
