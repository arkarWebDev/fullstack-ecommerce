import { Button } from "../ui/button";
import { useForgotPasswordMutation } from "@/store/slices/userApi";
import { toast } from "sonner";

interface ResetPasswordProps {
  email: string;
}
function ResetPasswordForm({ email }: ResetPasswordProps) {
  const [forgotPasswordMutation, { isLoading }] = useForgotPasswordMutation();

  const changePasswordHandler = async () => {
    try {
      const res = await forgotPasswordMutation({
        email,
      }).unwrap();

      toast.success(res.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
      console.log(err);
    }
  };
  return (
    <Button
      onClick={changePasswordHandler}
      disabled={isLoading}
      className="w-full"
    >
      Change password
    </Button>
  );
}

export default ResetPasswordForm;
