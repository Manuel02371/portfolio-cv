"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex h-11 items-center justify-center rounded-md bg-[#1d2424] px-4 text-sm font-semibold text-white transition hover:bg-[#2d3a3a]"
    >
      Imprimir / guardar PDF
    </button>
  );
}
