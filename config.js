const production = false;

export const config = {
    // server type
    production,

    // discord
    AuthURL: process.env.NEXT_PUBLIC_AUTH_URL
        ? process.env.NEXT_PUBLIC_AUTH_URL
        : "https://discord.com/oauth2/authorize?client_id=1217010278835683460&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback&scope=identify+connections+guilds.join+email+guilds.members.read+guilds",

    Client_ID: process.env.NEXT_PUBLIC_CLIENT_ID
        ? process.env.NEXT_PUBLIC_CLIENT_ID
        : "1217010278835683460",

    Client_Secret: process.env.NEXT_PUBLIC_CLIENT_SECRET
        ? process.env.NEXT_PUBLIC_CLIENT_SECRET
        : "r4Y3kpjSSlt_L2UgJiO1-VGiKYyuMv2F",

    Redirect_URL: process.env.NEXT_PUBLIC_REDIRECT_URL
        ? process.env.NEXT_PUBLIC_REDIRECT_URL
        : "http://localhost:3000/api/callback",

    // mongodb
    Mongo_URL: process.env.NEXT_PUBLIC_MONGO_URL
        ? process.env.NEXT_PUBLIC_MONGO_URL
        : "mongodb://127.0.0.1:27017/dc_acs",

    // Admin user uid
    Admin: ["931912476906377247"],
};
