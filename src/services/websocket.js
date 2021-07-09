import SocketIO from 'socket.io-client'
import MediasoupService from './mediasoupService'

let socket
let mediasoupService

export async function connect() {
    const hostname = window.location.hostname
    const wss = `http://${hostname}:3000`

    socket = new SocketIO(wss)
    socket.request = (type, data = {}) => {
        return new Promise((resolve) => {
            socket.emit(type, data, resolve)
        })
    }

    socket.on('connect', () => {
        mediasoupService = new MediasoupService(socket)
        mediasoupService.createOffer()
    })

    socket.on('disconnect', () => {
        console.log('disconnected')
    })

    socket.on('connect_error', (err) => {
        console.error('connect_error', err)
    })
}
