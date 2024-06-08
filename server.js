import { serve } from "https://deno.land/std@0.157.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.157.0/http/file_server.ts"

serve (handler, { port: 80 })

function handler (incoming_req) {

    let req = incoming_req

    const upgrade = req.headers.get ("upgrade") || ""

    // check if it is an upgrade request
    if (upgrade.toLowerCase() == "websocket") {
        const { socket, response } = Deno.upgradeWebSocket (req)
        return response
    }

    if (req.url.endsWith (`/`)) {
        req = new Request (`${ req.url }index.html`, req)
    }

    const options = {
        fsRoot: `public`
    }

    return serveDir (req, options)
}