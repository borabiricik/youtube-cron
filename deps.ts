import { google } from "npm:googleapis@129"
import { load } from "https://deno.land/std@0.208.0/dotenv/mod.ts"
const env = await load()

const authClient = new google.auth.OAuth2({
  clientId: env["CLIENT_ID"],
  clientSecret: env["CLIENT_SECRET"],
  redirectUri: env["REDIRECT_URI"],
})

authClient.setCredentials({ refresh_token: env["REFRESH_TOKEN"] })

const youtube = google.youtube({ version: "v3", auth: authClient })
// youtube.videos.update({requestBody:{snippet:{title}}})

export { youtube }
