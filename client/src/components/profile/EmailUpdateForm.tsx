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
import { emailUpdateSchema } from "@/schema/user";
import { Button } from "../ui/button";

import { useEmailUpdateMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";

interface EmailUpdateFormProps {
  email: string;
}

type formInput = z.infer<typeof emailUpdateSchema>;

function EmailUpdateForm({ email }: EmailUpdateFormProps) {
  const form = useForm<z.infer<typeof emailUpdateSchema>>({
    resolver: zodResolver(emailUpdateSchema),
    defaultValues: {
      email,
    },
  });
  const watchedEmail = form.watch("email");

  const [emailUpdateMutation, { isLoading }] = useEmailUpdateMutation();

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const res = await emailUpdateMutation(data).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    form.reset({ email });
  }, [email]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={email === watchedEmail || isLoading} className="mt-4">
          Update
        </Button>
      </form>
    </Form>
  );
}

export default EmailUpdateForm;
