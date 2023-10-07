import express , {Request,response,Response} from "express"
import Sender from "./sender";
export const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
const sender = new Sender()
const cors = require('cors');
app.use(cors());
app.use        (express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    return res.send({
qr_code: sender.qrCode,
        connected: sender.isConnected,
    })
})

app.post('/sendText', async (req: Request, res: Response) => {
    const { number, message } = req.body
    try {
        await sender.sendText(number, message)
        
        return  res.status(200).json({ status: "Messagem enviada"})
    } catch (error) {
        console.error("error", error)
        res.status(500).json({status: "error", message:error})
    }
})

app.post('/sendImage', async (req: Request, res: Response) => {
    const { number, image, filename,caption } = req.body
     try {
        await sender.sendImage(number, image, filename,caption)
        
        return  res.status(200).json({ status: "Messagem enviada"})
    } catch (error) {
        console.error("error", error)
        res.status(500).json({status: "error", message:error})
    }
})

app.listen(5000, () => {
    console.log("💥 server started")
})

