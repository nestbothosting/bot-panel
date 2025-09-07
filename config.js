const production = false;

export const config = {
    // server type
    production,
    Mongo_URL: process.env.NEXT_PUBLIC_MONGO_URL
        ? process.env.NEXT_PUBLIC_MONGO_URL
        : "mongodb://127.0.0.1:27017/dc_acs",

    // Admin user uid
    Admin: ["931912476906377247"],
};
