export default function SubscribeError() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-700 mb-4">❌ Subscription Failed</h1>
        <p className="text-gray-700 mb-6">
          Something went wrong while processing your subscription. Please try again later.
        </p>
        <a
          href="/blog"
          className="inline-block bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          ← Back to Blog
        </a>
      </div>
    </div>
  )
}
