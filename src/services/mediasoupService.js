import * as mediasoup from 'mediasoup-client'

class MediaSoupService {
    constructor(webSocketInstance, stream) {
        this._socket = webSocketInstance
        this._mediaDevice = null
        this._producer = null
        this._stream = stream
    }

    async loadDevice(routerRtpCapabilities) {
        try {
            this._mediaDevice = new mediasoup.Device()
        } catch (error) {
            console.log('## 2', error, mediasoup)
            if (error.name === 'UnsupportedError') {
                console.error('browser not supported')
            }
        }
        await this._mediaDevice.load({ routerRtpCapabilities })
    }

    async createOffer() {
        const serverRtpParameters = await this._socket?.request(
            'getRouterRtpCapabilities'
        )
        await this.loadDevice(serverRtpParameters)

        let data = await this._socket.request('createProducerTransport', {
            forceTcp: false,
            rtpCapabilities: this._mediaDevice.rtpCapabilities,
        })

        const transport = this._mediaDevice.createSendTransport(data)
        transport.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
                try {
                    const res = await this._socket.request(
                        'connectProducerTransport',
                        { dtlsParameters }
                    )
                    callback(res)
                } catch (err) {
                    errback(err)
                }
            }
        )

        transport.on(
            'produce',
            async ({ kind, rtpParameters }, callback, errback) => {
                try {
                    const { id } = await this._socket.request('produce', {
                        transportId: transport.id,
                        kind,
                        rtpParameters,
                    })
                    callback({ id })
                } catch (err) {
                    errback(err)
                }
            }
        )

        transport.on('connectionstatechange', async (state) => {
            switch (state) {
                case 'failed':
                    transport.close()
                    break

                default:
                    break
            }
        })

        try {
            const track = this._stream.getVideoTracks()[0]
            const params = { track }
            params.encodings = [
                { maxBitrate: 100000 },
                { maxBitrate: 300000 },
                { maxBitrate: 900000 },
            ]

            this._producer = await transport.produce(params)
        } catch (err) {
            console.error('stream error', err)
        }
    }
}

export default MediaSoupService
