import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Painel Magrão da Rádio" },
      {
        name: "description",
        content: "Acesso restrito ao painel de administração do portal do vereador Éder Magrão.",
      },
      { property: "og:title", content: "Entrar — Painel Magrão da Rádio" },
      {
        property: "og:description",
        content: "Acesso restrito ao painel de administração do portal do vereador Éder Magrão.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Conta criada! Verifique seu e-mail para confirmar.");
          return;
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin", replace: true });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setLoading(false);
      toast.error("Não foi possível entrar com o Google.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin", replace: true });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-container-low px-6 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-outline-variant/40 bg-surface p-8 shadow-lg">
        <h1 className="font-display text-2xl font-extrabold text-primary">Painel administrativo</h1>
        <p className="mt-2 font-body text-sm text-on-surface-variant">
          {mode === "signin"
            ? "Entre para gerenciar o conteúdo do site."
            : "Crie seu acesso ao painel."}
        </p>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              autoComplete="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              id="password"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </div>
          <Button disabled={loading} type="submit">
            {mode === "signin" ? "Entrar" : "Criar conta"}
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-on-surface-variant/70">
          <span className="h-px flex-1 bg-outline-variant/40" />
          ou
          <span className="h-px flex-1 bg-outline-variant/40" />
        </div>

        <Button className="w-full" disabled={loading} onClick={handleGoogle} variant="outline">
          Entrar com Google
        </Button>

        <button
          className="mt-6 w-full text-center font-body text-sm text-primary underline-offset-4 hover:underline"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          type="button"
        >
          {mode === "signin" ? "Não tenho conta ainda" : "Já tenho uma conta"}
        </button>
      </div>
    </div>
  );
}