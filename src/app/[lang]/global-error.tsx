"use client";

export default function errorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return <div>{error.message}</div>;
}
