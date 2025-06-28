let progressStore = {};

export async function POST(request) {
  const body = await request.json();
  const { userId = "default", currentPage, isCompleted = false } = body;

  progressStore[userId] = {
    currentPage,
    isCompleted,
    updatedAt: new Date().toISOString(),
  };

  return Response.json({
    message: "Progress saved",
    data: progressStore[userId],
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId") || "default";
  const data = progressStore[userId] || { currentPage: 0, isCompleted: false };
  return Response.json({ data });
}
