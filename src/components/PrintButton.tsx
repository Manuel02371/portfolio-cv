"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex h-11 items-center justify-center rounded-md bg-[#2563EB] px-4 text-sm font-semibold text-[#F8FAFC] transition hover:bg-[#38BDF8] hover:text-[#0F172A]"
    >
      Imprimir / guardar PDF
    </button>
  );
}
