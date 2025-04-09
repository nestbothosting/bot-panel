import { SaveNode } from '@/utilise/api'

export async function POST(request) {
  try {
    const body = await request.json(); // parse JSON body

    await SaveNode(body.apiKey,body.nodeUrl)

    return new Response(JSON.stringify({ message: 'Successfully Add New Node!', status:true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Oops Server Error', status:false }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}
