"use client";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-semibold mb-1 text-black">Link expired</h1>
      <p className="text-gray-500 mb-8">Timeout</p>
      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-8 border border-blue-500">
        <span className="text-blue-500 text-4xl">!</span>
      </div>

      <p className="text-gray-600 mb-2">
        Return to original window to request for a new link
      </p>
      <p className="text-gray-600">You can close this window</p>
    </div>
  );
};
export default Page;
