import axios from 'axios'

export async function POST(req: Request) {
  const body = await req.text()
  const params = new URLSearchParams(body)
  const email = params.get('email')

  const origin = req.headers.get('origin') || 'https://publish.itan.app' // fallback in prod

  if (!email) {
    return Response.redirect(`${origin}/subscribe/error`, 302)
  }

  try {
    const API_KEY = process.env.KIT_API_KEY!
    const FORM_ID = process.env.KIT_FORM_ID!

    const response = await axios.post(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        api_key: API_KEY,
        email: email,
      }
    )

    return Response.redirect(`${origin}/subscribe/success`, 302)
  } catch (err) {
    console.error(err)
    return Response.redirect(`${origin}/subscribe/error`, 302)
  }
}
