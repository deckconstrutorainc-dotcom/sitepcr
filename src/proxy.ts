import { NextResponse, type NextRequest } from "next/server";
import { enToInternal } from "@/i18n/config";

// PT fica na raiz ("/obras"), EN em "/en/projects". Internamente tudo vive em app/[lang]/<pasta-pt>.
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const parts = url.pathname.split("/").filter(Boolean);

  // /pt/... é só endereço interno: redireciona para a forma pública sem prefixo
  if (parts[0] === "pt") {
    url.pathname = "/" + parts.slice(1).join("/");
    return NextResponse.redirect(url, 308);
  }

  if (parts[0] === "en") {
    if (parts[1] && enToInternal[parts[1]]) {
      parts[1] = enToInternal[parts[1]];
      url.pathname = "/" + parts.join("/");
      return NextResponse.rewrite(url);
    }
    return NextResponse.next();
  }

  url.pathname = "/pt" + (url.pathname === "/" ? "" : url.pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  // arquivos estáticos (qualquer caminho com extensão), internos do Next e API não passam pelo proxy
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
