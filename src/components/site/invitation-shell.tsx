"use client";

import { useRef, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Music, Pause } from "lucide-react";
import { weddingConfig } from "@/lib/config";
import { FloralSpray } from "./floral-spray";

export function InvitationShell({
  children,
  track,
}: {
  children: React.ReactNode;
  track: { url: string; title: string } | null;
}) {
  const [opened, setOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const date = new Date(weddingConfig.weddingDate);

  const handleOpen = () => {
    setOpened(true);
    const audio = audioRef.current;
    if (audio) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => undefined);
    }
  };

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true));
    }
  };

  return (
    <>
      {track && <audio ref={audioRef} src={track.url} loop />}

      <AnimatePresence>
        {!opened && (
          <motion.div
            key="cover"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-rose-800 px-4"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-rose-900/40 via-transparent to-rose-900/60" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-sm rounded-2xl bg-[var(--color-cream)] px-8 py-10 text-center shadow-2xl"
            >
              <FloralSpray className="pointer-events-none absolute -left-14 top-6 h-44 w-28 opacity-90" />
              <FloralSpray
                className="pointer-events-none absolute -right-14 top-6 h-44 w-28 opacity-90"
                mirrored
              />

              <div className="relative mx-auto -mt-16 mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rose-700 text-white shadow-lg">
                <Heart size={18} fill="white" />
              </div>

              <h1 className="font-heading text-3xl leading-tight text-rose-700">
                {weddingConfig.groom.shortName}
                <span className="mx-2 font-script text-2xl text-rose-500">&</span>
                {weddingConfig.bride.shortName}
              </h1>

              <div className="mx-auto my-4 flex items-center justify-center gap-2 text-rose-400">
                <span className="h-px w-10 bg-rose-300" />
                <span className="text-xs">❦</span>
                <span className="h-px w-10 bg-rose-300" />
              </div>

              <p className="text-sm text-rose-500">
                {format(date, "d 'tháng' M, yyyy", { locale: vi })}
              </p>
              <p className="mt-3 text-xs uppercase tracking-[0.2em] text-stone-400">Thân Mời</p>

              <button
                type="button"
                onClick={handleOpen}
                className="mt-7 rounded-full bg-rose-700 px-9 py-2.5 text-sm font-medium text-[var(--color-cream)] shadow-md transition hover:bg-rose-800"
              >
                Mở thiệp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {opened && children}

      {opened && track && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc nền"}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-rose-700 text-[var(--color-cream)] shadow-lg transition hover:bg-rose-800"
        >
          {isPlaying ? <Pause size={20} /> : <Music size={20} className="animate-pulse" />}
        </button>
      )}
    </>
  );
}
