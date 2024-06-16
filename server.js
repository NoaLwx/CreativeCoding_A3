import { serve } from "https://deno.land/std@0.158.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.158.0/http/file_server.ts"
import { getNetworkAddr } from "https://deno.land/x/local_ip/mod.ts"
// import { gzip } from "https://deno.land/std@0.114.0/zlib/mod.ts";
// import { GzipStream } from "https://deno.land/x/compress@v0.4.5/mod.ts";


const kv = await Deno.openKv();
// const gzip = new GzipStream();

// await kv.put("canvasData", canvasDataUrl);


const local_ip = await getNetworkAddr()
console.log (`local area network IP: ${ local_ip }`)

serve (handler, { port: 80 })

let sockets = []

function handler (incoming_req) {

    let req = incoming_req

    const upgrade = req.headers.get ("upgrade") || ""

    if (upgrade.toLowerCase() == "websocket") {

        const { socket, response } = Deno.upgradeWebSocket (req)

        socket.onopen  = async () => {
            sockets.push (socket)

            console.log (`server WebSocket opened`)
            const data = await kv.get([`canvas`]);
            // console.log (data);
            socket.send (data.value)
            
        }

        socket.onclose = () => {
            console.log (`server WebSocket closed`)

            // filters closed sockets (ie. sockets without
            // a .readyState of 1) out of the array
            sockets = sockets.filter (s => s.readyState == 1)
        }

        socket.onerror = e => console.dir (e)

        socket.onmessage = async e => {
            console.log (`incoming message: ${ e.data }`)
            
            // const compressedImageData = await gzip.compress(e.data);

            kv.set ([`canvas`], e.data)           

            // kv.set ([`canvas`], compressedImageData)


            // send the message data back out 
            // to each of the sockets in the array
            sockets.forEach (s => s.send (e.data))
        }

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