import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useCurrentUserQuery,
  useUploadAvatarMutation,
} from "@/store/slices/userApi";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import Loader from "@/components/Loader";

function Profile() {
  const { data: user, refetch, isLoading } = useCurrentUserQuery();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploadAvatarMutation, { isLoading: isMutating }] =
    useUploadAvatarMutation();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const imageOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
      }
    };

    reader.readAsDataURL(e.target.files![0]);
  };

  const avatarUploadHandler = async () => {
    if (!avatar) {
      toast.warning("Please select your avatar first.");
      return;
    }
    try {
      await uploadAvatarMutation({ image_url: avatar });
      setAvatar(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      refetch();
      toast.success("Avatar Uploaded.");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                You can upload own avator and edit your infomation.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <Avatar className="w-12 h-12">
                  <AvatarImage src={avatar ?? user?.avatar?.[0].url ?? ""} />
                  {!user?.avatar?.[0]?.url && (
                    <AvatarFallback className="text-2xl">
                      {user?.name.slice(0, 1)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <Input
                  type="file"
                  accept="images/*"
                  onChange={imageOnChangeHandler}
                  className="mt-2"
                  ref={inputRef}
                />
              </div>
              <Button
                onClick={avatarUploadHandler}
                disabled={isMutating || !avatar}
              >
                Upload
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Email address</CardTitle>
              <CardDescription>
                You can view or edit your email address here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailUpdateForm email={user?.email!} />
            </CardContent>
          </Card>
        </section>
      )}
    </>
  );
}

export default Profile;
