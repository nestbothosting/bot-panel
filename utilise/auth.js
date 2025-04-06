import axios from "axios"
import querystring from "querystring"
import { config } from '@/config'

export async function getAccessToken(code) {
    const data = querystring.stringify({
        client_id: config.Client_ID,
        client_secret: config.Client_Secret,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: config.Redirect_URL,
        scope: "identify email"
    });

    try {
        const response = await axios.post("https://discord.com/api/oauth2/token", data, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        });

        return response.data.access_token; 
    } catch (error) {
        console.error("Error getting access token:", error.response?.data || error.message);
    }
}

export async function getDiscordUser(accessToken) {
    try {
        const response = await axios.get("https://discord.com/api/users/@me", {
            headers: { Authorization: `Bearer ${accessToken}` }
        });

        return response.data; // Returns user details
    } catch (error) {
        console.error("Error fetching Discord user data:", error.response?.data || error.message);
    }
}
