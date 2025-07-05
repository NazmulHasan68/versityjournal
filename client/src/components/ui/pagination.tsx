import * as React from "react";

export function Pagination({ children }: { children: React.ReactNode }) {
  return <nav className="flex items-center justify-between">{children}</nav>;
}

export function PaginationContent({ children }: { children: React.ReactNode }) {
  return <ul className="flex items-center gap-1">{children}</ul>;
}

export function PaginationItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

export function PaginationPrevious({ onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 ${className}`}
    >
      ← Prev
    </button>
  );
}

export function PaginationNext({ onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100 ${className}`}
    >
      Next →
    </button>
  );
}
