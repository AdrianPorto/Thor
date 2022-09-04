import parsePhoneNumber,{isValidPhoneNumber } from "libphonenumber-js"
import { type } from "os"
import { start } from "repl" 
import { create, Whatsapp, Message, SocketState } from "venom-bot"

export type QRCode = { 
    base64Qr: string
    attempts: string
}

class sender{
    private client: Whatsapp
    private connected: boolean
    private qr: QRCode
    
    
     get isConnected() : boolean {
        return this.connected
    }
    get qrCode(): QRCode{
        return this.qr
    }
    constructor() {
        
        this.initialize()
      
    }

    async sendText(to: string, body: string) {
        //(44) 91756930
        //554491756930@c.us

        if (!isValidPhoneNumber(to, "BR")) {
            throw new Error('this number is not valid')
        }

        let phoneNumber = parsePhoneNumber(to,"BR")?.format("E.164").replace("+" , "").replace("-"," ") as string

        phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`
        console.log("phoneNumber" , phoneNumber)
        await this.client.sendText(phoneNumber,body)
    } 

    
        async sendImage(to: string, body: string , filename: string,caption: string) {
        //(44) 91756930
        //554491756930@c.us

        if (!isValidPhoneNumber(to, "BR")) {
            throw new Error('this number is not valid')
        }

        let phoneNumber = parsePhoneNumber(to,"BR")?.format("E.164").replace("+" , "").replace("-"," ") as string

        phoneNumber = phoneNumber.includes("@c.us") ? phoneNumber : `${phoneNumber}@c.us`
        console.log("phoneNumber" , phoneNumber)
        await this.client.sendImage(phoneNumber,body, filename,caption)
    } 

    private initialize() {
        const qr = (base64Qr : string, attempts: string) => { 
            this.qr = { base64Qr ,attempts}
        }
        const status = (statusSession: string, session: string) => {
            this.connected = ["isLogged", "qrReadSuccess","chatsAvailable"].includes(statusSession)
         } 
        const start = (client: Whatsapp) => {
            this.client = client
            

            client.onStateChange((state) => {
              this.connected = state === SocketState.CONNECTED
          })  
        }
        
        create("Eita", qr,status).then((client) => start(client)).catch((error) => console.error(error))
    }
    
    
}
export default sender