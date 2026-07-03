export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-white" aria-label="Loading">
      <div
        className="w-10 h-10 rounded-full border-2 border-[#4F052B] border-t-transparent animate-spin"
        role="status"
      />
      <p className="mt-4 text-sm text-[#7a7a7a]">Loading...</p>
    </div>
  );
}
