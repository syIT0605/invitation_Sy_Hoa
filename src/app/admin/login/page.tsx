import { LoginForm } from "./login-form";

export const metadata = {
  title: "Đăng nhập quản trị | Thiệp Cưới Online",
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-rose-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg ring-1 ring-rose-100">
        <h1 className="mb-1 text-center font-serif text-2xl text-rose-700">
          Trang quản trị
        </h1>
        <p className="mb-6 text-center text-sm text-stone-500">
          Đăng nhập để quản lý thiệp cưới online
        </p>
        <LoginForm />
      </div>
    </div>
  );
}
