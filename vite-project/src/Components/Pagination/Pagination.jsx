import React from "react";

export default function PaginationBar({ page, totalPages, setPage, isLoading }) {
  // Génère les 4 pages à afficher
  const pages = [];
  const maxButtons = 4;
  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, start + maxButtons - 1);

  // Ajuste le début si on est proche de la fin
  start = Math.max(1, end - maxButtons + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      {/* PAGINATION BUTTONS */}
      <div className="flex items-center gap-2">
        {/* Back */}
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30"
        >
          ←
        </button>

        {/* Pages */}
        <div className="flex gap-1">
          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1 rounded-lg transition ${
                page === p ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => setPage(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-30"
        >
          →
        </button>
      </div>

      {/* LOADER */}
      {isLoading && (
        <div className="flex gap-2 items-center text-blue-600">
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:.2s]"></div>
          <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce [animation-delay:.4s]"></div>
        </div>
      )}
    </div>
  );
}

