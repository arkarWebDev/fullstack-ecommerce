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
import { nameUpdateSchema } from "@/schema/user";
import { Button } from "../ui/button";

import { useNameUpdateMutation } from "@/store/slices/userApi";
import { toast } from "sonner";
import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface NameUpdateFormProps {
  name: string;
}

type formInput = z.infer<typeof nameUpdateSchema>;

function NameUpdateForm({ name }: NameUpdateFormProps) {
  const form = useForm<z.infer<typeof nameUpdateSchema>>({
    resolver: zodResolver(nameUpdateSchema),
    defaultValues: {
      name,
    },
  });
  const watchedEmail = form.watch("name");

  const [nameUpdateMutation, { isLoading }] = useNameUpdateMutation();

  const onSubmit: SubmitHandler<formInput> = async (data) => {
    try {
      const res = await nameUpdateMutation(data).unwrap();
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };

  useEffect(() => {
    form.reset({ name });
  }, [name]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile name</CardTitle>
        <CardDescription>
          {" "}
          You can view or edit your profile name here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
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
            <Button
              disabled={name === watchedEmail || isLoading}
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

export default NameUpdateForm;
