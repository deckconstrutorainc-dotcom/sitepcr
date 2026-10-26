import { site } from "@/lib/site";

// Só aparece quando NEXT_PUBLIC_WHATSAPP estiver configurado (número ainda pendente).
export function WhatsAppButton({ label, message }: { label: string; message: string }) {
  if (!site.whatsapp) return null;
  const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-[calc(env(safe-area-inset-right,0px)+20px)] bottom-[calc(env(safe-area-inset-bottom,0px)+20px)] z-30 grid size-14 place-items-center rounded-full bg-success text-white shadow-[0_8px_24px_rgb(15_25_35/0.22)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      {/* Marca do WhatsApp: glifo oficial, não há equivalente no Lucide */}
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-7">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z" />
      </svg>
    </a>
  );
}
