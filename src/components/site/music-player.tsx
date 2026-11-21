"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Pause } from "lucide-react";

export function MusicPlayer({ track }: { track: { url: string; title: string } | null }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [track]);

  if (!track) return null;

  const toggle = () => {
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
      <audio ref={audioRef} src={track.url} loop />
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc nền"}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg shadow-rose-300 transition hover:bg-rose-700"
      >
        {isPlaying ? (
          <Pause size={20} />
        ) : (
          <Music size={20} className="animate-pulse" />
        )}
      </button>
    </>
  );
}
