export default function SubscribeSuccess() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">✅ You are now subscribed!</h1>
        <p className="text-gray-700 mb-6">
          Thanks for joining our newsletter. Check your inbox for updates and tips!
        </p>
        <a
          href="/blog"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          ← Back to Blog
        </a>
      </div>
    </div>
  )
}
