"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, ArrowRight, Check, Loader2 } from "lucide-react";

type Labels = {
  nome: string;
  email: string;
  telefone: string;
  tipo: string;
  tipoPlaceholder: string;
  mensagem: string;
  enviar: string;
  enviando: string;
  privacidade: string;
  privacidadeLink: string;
  sucesso: string;
  erro: string;
  semChave: string;
  erros: Record<"nome" | "email" | "telefone" | "tipo" | "mensagem", string>;
};

type Campo = keyof Labels["erros"];
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

function validar(data: FormData): Partial<Record<Campo, true>> {
  const e: Partial<Record<Campo, true>> = {};
  const v = (k: string) => String(data.get(k) ?? "").trim();
  if (v("nome").length < 2) e.nome = true;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v("email"))) e.email = true;
  if (v("telefone").replace(/\D/g, "").length < 10) e.telefone = true;
  if (!v("tipo")) e.tipo = true;
  if (v("mensagem").length < 10) e.mensagem = true;
  return e;
}

export function ContactForm({ labels, servicos, privacyHref, tel, siteName }: { labels: Labels; servicos: string[]; privacyHref: string; tel: string; siteName: string }) {
  const [erros, setErros] = useState<Partial<Record<Campo, true>>>({});
  const [estado, setEstado] = useState<"idle" | "enviando" | "ok" | "erro" | "semChave">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const e = validar(data);
    setErros(e);
    const primeiro = Object.keys(e)[0];
    if (primeiro) {
      form.querySelector<HTMLElement>(`[name="${primeiro}"]`)?.focus();
      return;
    }
    if (data.get("botcheck")) return; // honeypot preenchido: robô
    if (!ACCESS_KEY) {
      setEstado("semChave");
      return;
    }
    setEstado("enviando");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Contato pelo site: ${data.get("tipo")}`,
          from_name: siteName,
          nome: data.get("nome"),
          email: data.get("email"),
          telefone: data.get("telefone"),
          tipo_de_servico: data.get("tipo"),
          mensagem: data.get("mensagem"),
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (!res.ok || !json.success) throw new Error("falha no envio");
      setEstado("ok");
      form.reset();
    } catch {
      setEstado("erro");
    }
  }

  const campo = (name: Campo, label: string, input: React.ReactNode, full = false) => (
    <div className={`grid gap-0.5 ${full ? "md:col-span-2" : ""}`}>
      <label htmlFor={`f-${name}`} className="label">
        {label}
      </label>
      {input}
      <p id={`f-${name}-erro`} className={`mt-1.5 items-center gap-1.5 text-[13.5px] font-semibold text-error ${erros[name] ? "flex" : "hidden"}`}>
        <AlertCircle size={14} strokeWidth={2} aria-hidden="true" />
        {labels.erros[name]}
      </p>
    </div>
  );

  const base =
    "w-full min-h-[52px] rounded-none border-0 border-b bg-transparent py-3 text-base font-medium text-ink outline-none focus-visible:border-b-2 focus-visible:border-primary focus-visible:shadow-[0_2px_0_0_var(--color-primary)]";
  const borda = (name: Campo) => (erros[name] ? "border-b-2 border-error" : "border-hairline-strong");
  const aria = (name: Campo) => ({ "aria-invalid": erros[name] ? true : undefined, "aria-describedby": erros[name] ? `f-${name}-erro` : undefined });

  if (estado === "ok") {
    return (
      <div role="status" className="flex items-start gap-3 rule-strong bg-paper p-6">
        <Check size={22} strokeWidth={2} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
        <p className="font-display text-title font-semibold">{labels.sucesso}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
      {campo("nome", labels.nome, <input id="f-nome" name="nome" autoComplete="name" required className={`${base} ${borda("nome")}`} {...aria("nome")} />)}
      {campo("email", labels.email, <input id="f-email" name="email" type="email" autoComplete="email" spellCheck={false} autoCapitalize="off" required className={`${base} ${borda("email")}`} {...aria("email")} />)}
      {campo("telefone", labels.telefone, <input id="f-telefone" name="telefone" type="tel" autoComplete="tel" inputMode="tel" required className={`${base} ${borda("telefone")}`} {...aria("telefone")} />)}
      {campo(
        "tipo",
        labels.tipo,
        <select id="f-tipo" name="tipo" required defaultValue="" className={`${base} ${borda("tipo")} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='14'%20height='14'%20fill='none'%20stroke='%23151A20'%20stroke-width='1.6'%3E%3Cpath%20d='m3%205%204%204%204-4'/%3E%3C/svg%3E")] bg-[right_4px_center] bg-no-repeat`} {...aria("tipo")}>
          <option value="" disabled>
            {labels.tipoPlaceholder}
          </option>
          {servicos.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>,
      )}
      {campo("mensagem", labels.mensagem, <textarea id="f-mensagem" name="mensagem" rows={4} required className={`${base} ${borda("mensagem")} min-h-[110px] resize-y`} {...aria("mensagem")} />, true)}

      {/* honeypot: invisível para pessoas e fora da árvore de acessibilidade */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Empresa
          <input type="text" name="botcheck" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-2">
        <button type="submit" disabled={estado === "enviando"} className="btn-primary">
          {estado === "enviando" ? (
            <>
              <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              {labels.enviando}
            </>
          ) : (
            <>
              {labels.enviar}
              <ArrowRight size={18} strokeWidth={1.75} aria-hidden="true" />
            </>
          )}
        </button>
        <small className="text-[13px] text-ink-subtle">
          {labels.privacidade}{" "}
          <Link href={privacyHref} className="underline underline-offset-2">
            {labels.privacidadeLink}
          </Link>
        </small>
      </div>

      <div aria-live="assertive" className="md:col-span-2">
        {(estado === "erro" || estado === "semChave") && (
          <p className="flex items-start gap-2 border-l-2 border-error bg-paper p-4 font-semibold text-ink">
            <AlertCircle size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-error" aria-hidden="true" />
            {(estado === "erro" ? labels.erro : labels.semChave).replace("{tel}", tel)}
          </p>
        )}
      </div>
    </form>
  );
}
