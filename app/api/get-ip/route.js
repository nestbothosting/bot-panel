import axios from "axios";

export async function GET(req) {
  try {
    // Option A: Use ipify
    const response = await axios.get("https://api64.ipify.org?format=json");
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

    // Option B: Without ipify (just from request headers)
    // const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
    // return new Response(JSON.stringify({ ip }), {
    //   status: 200,
    //   headers: { "Content-Type": "application/json" },
    // });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
