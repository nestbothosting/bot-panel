import { getAccessToken, getDiscordUser } from '@/utilise/auth'
import { SaveUser } from '@/utilise/index'

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const accessToken = await getAccessToken(code)
    const user = await getDiscordUser(accessToken)
    const savedUser = await SaveUser(user);
    return Response.redirect(
      new URL(
        `${process.env.PROURL ? process.env.PROURL : `localhost:${process.env.PORT ? process.env.PORT : 3000}`}/dashboard?username=${encodeURIComponent(savedUser.user.username)}&id=${encodeURIComponent(savedUser.user._id)}&uid=${encodeURIComponent(savedUser.user.uid)}&avatar=${encodeURIComponent(savedUser.user.avatar)}`,
        request.url
      ),
      302
    );
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: `Oops Server Error! ${error.message}` }), {
      status: 400,
    });
  }
}
