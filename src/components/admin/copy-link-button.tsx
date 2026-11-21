"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyLinkButton({ path }: { path: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const url = `${window.location.origin}${path}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      window.prompt("Sao chép link thiệp:", url);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 rounded-full border border-rose-200 px-2.5 py-1 text-xs text-rose-600 transition hover:bg-rose-50"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Đã sao chép" : "Sao chép link"}
    </button>
  );
}
