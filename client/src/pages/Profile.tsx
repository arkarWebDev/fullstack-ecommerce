import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { RootState } from "@/store";
import { useSelector } from "react-redux";

function Profile() {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  return (
    <section className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>
            You can upload own avator and edit your infomation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>name - {userInfo?.name}</p>
          <p>email - {userInfo?.email}</p>
          <p>role - {userInfo?.role}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold mb-4">🎓 Task</h1>
          <p className="mb-4 text-lg">
            To receive your <strong>course certificate</strong>, you must
            implement the following features by yourself using the concepts
            you've already learned.
          </p>
        </CardHeader>
        <CardContent>
          <h2 className="text-2xl font-semibold mt-6 mb-2">
            ✅ Required Features
          </h2>

          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>Email Update:</strong> Students can update their email
              with validation and uniqueness checks.
              <br />
              <span className="text-sm text-gray-600">
                Use <code>shadcn/ui</code> form components.
              </span>
            </li>

            <li>
              <strong>Password Update:</strong> Securely change password with
              old password verification. New password must be hashed.
              <br />
              <span className="text-sm text-gray-600">
                Use <code>shadcn/ui</code> form and input with validation.
              </span>
            </li>

            <li>
              <strong>Forgot Password:</strong> Token-based reset via email.
              Token should expire after 10–15 minutes.
              <br />
              <span className="text-sm text-gray-600">
                Include a reset form built with <code>shadcn/ui</code>.
              </span>
            </li>

            <li>
              <strong>Avatar Upload:</strong> Upload and display profile photo
              (jpg/png/webp). Store locally or on Cloudinary.
              <br />
              <span className="text-sm text-gray-600">
                Show avatar inside a <code>shadcn/ui</code> card component.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">
            💡 UI Requirements
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Must use <code>shadcn/ui</code> form and card components.
            </li>
            <li>Use Tailwind CSS for clean, responsive design.</li>
            <li>Add user feedback (e.g., toast, error messages).</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6 mb-2">📩 Submission</h2>
          <p className="mb-6">
            Submit your GitHub link (with README), and optionally a live demo.
            <br />
            <strong>Submission is required to receive your certificate.</strong>
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

export default Profile;
