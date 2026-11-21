import { Gift } from "lucide-react";
import { weddingConfig } from "@/lib/config";

export function GiftBox() {
  if (weddingConfig.bankAccounts.length === 0) return null;

  return (
    <section className="bg-rose-50/60 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <Gift className="mx-auto mb-3 text-rose-400" size={28} />
        <p className="font-script text-2xl text-rose-500">Hộp mừng cưới</p>
        <h2 className="mt-2 font-heading text-3xl text-rose-800 sm:text-4xl">Gửi lời chúc phúc</h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-stone-600">
          Sự hiện diện của bạn là niềm hạnh phúc của chúng mình. Nếu bạn muốn gửi quà mừng cưới từ
          xa, chúng mình xin chân thành cảm ơn.
        </p>
      </div>

      <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
        {weddingConfig.bankAccounts.map((account) => (
          <div
            key={account.accountNumber}
            className="rounded-xl bg-white/80 p-5 text-center shadow-sm ring-1 ring-rose-100"
          >
            <p className="font-heading text-base text-rose-700">{account.owner}</p>
            <p className="mt-1 text-sm text-stone-500">{account.bank}</p>
            <p className="mt-2 font-mono text-sm tracking-wider text-stone-700">
              {account.accountNumber}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
