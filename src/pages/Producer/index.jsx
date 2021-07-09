import { Card, Button } from 'react-bootstrap'
import { Container } from './styles'
import { useEffect, useRef } from 'react'
import MediaSoupService from '../../services/mediasoupService'
import { useSocket } from '../../hooks/useSocket'
import { useState } from 'react'
import offline from '../../assets/offline.jpeg'

export default function Producer() {
    const { socket } = useSocket()
    const transmissionVideoRef = useRef()
    const [stream, setStream] = useState()
    const [screen, setScreen] = useState(false)
    const [isLive, setIsLive] = useState(false)

    useEffect(() => {
        if (isLive) {
            if (screen) {
                navigator.mediaDevices
                    .getDisplayMedia({ video: true })
                    .then((stream) => {
                        setStream(stream)
                        transmissionVideoRef.current.srcObject = stream
                    })
                    .catch((err) => console.log(err))
            } else {
                navigator.mediaDevices
                    .getUserMedia({ video: true })
                    .then((stream) => {
                        setStream(stream)
                        transmissionVideoRef.current.srcObject = stream
                    })
                    .catch((err) => console.log(err))
            }
        } else {
            if (stream) {
                setStream(null)
                stream.getTracks().forEach((track) => track.stop())
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLive, screen])

    useEffect(() => {
        if (socket.connected && stream) {
            const mediaSoup = new MediaSoupService(socket, stream)
            socket.on('connect', mediaSoup.createOffer())
        }
    }, [socket, socket.connected, stream])

    useEffect(() => {
        if (screen && isLive) {
            stream.oninactive = () => setScreen(false)
        }
    }, [screen, stream, isLive])

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>
                        {isLive ? 'Transmissão Ativa' : 'Transmissão Inativa'}
                    </Card.Title>
                    {stream && <video autoPlay ref={transmissionVideoRef} />}
                    {!stream && <img src={offline} alt="Offline" />}
                    <Card.Text>
                        Transmitindo a {screen ? 'Tela' : 'Câmera'}
                    </Card.Text>
                    <div className="footer">
                        <Button
                            variant={isLive ? 'danger' : 'success'}
                            onClick={() => setIsLive(!isLive)}
                        >
                            {isLive ? 'Parar' : 'Iniciar'} Transmissão
                        </Button>
                        <Button
                            variant="warning"
                            onClick={() => setScreen(!screen)}
                        >
                            Compartilhar {screen ? 'Câmera' : 'Tela'}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
