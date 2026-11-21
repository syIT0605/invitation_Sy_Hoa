import { Trash2 } from "lucide-react";
import { prisma } from "@/lib/db";
import { ConfirmSubmitButton } from "@/components/admin/confirm-submit-button";
import { MusicUploadForm } from "./music-upload-form";
import { deleteMusicTrackAction, setActiveMusicTrackAction } from "./actions";

export const metadata = { title: "Nhạc nền | Quản trị" };

export default async function AdminMusicPage() {
  const tracks = await prisma.musicTrack.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 font-heading text-2xl text-rose-800">Nhạc nền</h1>

      <div className="mb-8">
        <MusicUploadForm />
      </div>

      {tracks.length === 0 ? (
        <p className="text-sm text-stone-400">Chưa có bản nhạc nào.</p>
      ) : (
        <div className="space-y-3">
          {tracks.map((track) => (
            <div
              key={track.id}
              className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-rose-100 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-stone-800">{track.title}</p>
                  {track.isActive && (
                    <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">
                      Đang phát trên thiệp
                    </span>
                  )}
                </div>
                <audio controls src={track.url} className="mt-2 h-8 w-full max-w-xs" />
              </div>

              <div className="flex items-center gap-2">
                {!track.isActive && (
                  <form action={setActiveMusicTrackAction.bind(null, track.id)}>
                    <button
                      type="submit"
                      className="rounded-full border border-rose-200 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50"
                    >
                      Đặt làm nhạc chính
                    </button>
                  </form>
                )}
                <form action={deleteMusicTrackAction.bind(null, track.id)}>
                  <ConfirmSubmitButton
                    confirmMessage={`Xóa bản nhạc "${track.title}"?`}
                    className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} /> Xóa
                  </ConfirmSubmitButton>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
