import { serve } from "https://deno.land/std@0.157.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.157.0/http/file_server.ts"

serve (handler, { port: 80 })

function handler (incoming_req) {
    let req = incoming_req

    // if the requested url does not specify a filename
    if (req.url.endsWith (`/`)) {

        // add 'index.html' to the url
        req = new Request (`${ req.url }index.html`, req)
    }

    const options = {

        // route requests to this
        // directory in the file system
        fsRoot: `public`
    }

    return serveDir (req, options)
}