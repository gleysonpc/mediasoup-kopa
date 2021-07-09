import { Fragment } from 'react'
import { BrowserRouter } from 'react-router-dom'
import TopBar from './shared/TopBar'
import Routes from './Routes'
import { SocketProvider } from './hooks/useSocket'

function App() {
    return (
        <Fragment>
            <BrowserRouter>
                <TopBar />
                <SocketProvider>
                    <Routes />
                </SocketProvider>
            </BrowserRouter>
        </Fragment>
    )
}

export default App
