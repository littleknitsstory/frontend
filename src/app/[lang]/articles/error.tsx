"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center mt-3">
      <h2 className="text text--md text--burgundy">
        <i>{error.message} </i>
      </h2>
    </div>
  );
}
