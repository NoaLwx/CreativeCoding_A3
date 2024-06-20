import { serve } from "https://deno.land/std@0.158.0/http/server.ts"
import { serveDir } from "https://deno.land/std@0.158.0/http/file_server.ts"
import { getNetworkAddr } from "https://deno.land/x/local_ip/mod.ts"
// import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";



// A BroadcastChannel used by all isolates
const channel = new BroadcastChannel("all_messages");

// When a new message comes in from other instances, add it
channel.onmessage = async (e) => {
    console.log('Message received on BroadcastChannel:', e.data);
    const entry = await kv.get ([`canvasData`]);
    sockets.forEach (s => s.send (entry))
};


const kv = await Deno.openKv();

const local_ip = await getNetworkAddr()
console.log (`local area network IP: ${ local_ip }`)

serve (handler, { port: 80 })
// serve (handler, { port: 8080 })
// serve (handler, { port: 8081 })

let sockets = []

async function handler (incoming_req) {
  
    let req = incoming_req

    const upgrade = req.headers.get ("upgrade") || ""

    if (upgrade.toLowerCase() === "websocket") {

        const { socket, response } = Deno.upgradeWebSocket (req)

        socket.onopen  = async () => {
            sockets.push (socket)

            console.log (`server WebSocket opened`)
            const data = await kv.get([`canvasData`]);
            // console.log (data)
            
        }

        socket.onclose = () => {
            console.log (`server WebSocket closed`)

            // filters closed sockets (ie. sockets without
            // a .readyState of 1) out of the array
            sockets = sockets.filter (s => s.readyState == WebSocket.OPEN)
        }

        socket.onerror = e => console.dir (e)

        socket.onmessage = async e => {
            console.log (e.data);
            kv.set ([`canvasData`], e.data);        
            sockets.forEach (s => s.send (e.data))
            channel.postMessage ("all_messages")
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