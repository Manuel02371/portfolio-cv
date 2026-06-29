"use client";

import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { loginAction, type LoginState } from "@/app/actions/auth";

const initialState: LoginState = {};

type LoginFormProps = {
  demoMode: boolean;
};

export function LoginForm({ demoMode }: LoginFormProps) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-teal-700 text-white">
          <LockKeyhole aria-hidden="true" size={20} />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-950 dark:text-white">
            Panel administrador
          </h1>
          {demoMode ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              demo@portfolio.local / portfolio-demo
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Correo
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={demoMode ? "demo@portfolio.local" : ""}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Contrasena
          </span>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            defaultValue={demoMode ? "portfolio-demo" : ""}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </label>
      </div>
      {state.error ? (
        <p className="mt-4 rounded-md bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
}
