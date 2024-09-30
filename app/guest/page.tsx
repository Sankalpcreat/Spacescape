import GuestLoginForm from "@/components/GuestLoginForm";

export default function GuestPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">Guest Login</h1>
      <GuestLoginForm />
    </div>
  );
}
