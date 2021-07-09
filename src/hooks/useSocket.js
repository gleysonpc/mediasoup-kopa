import React, { createContext, useContext, useRef } from 'react'
import SocketIO from 'socket.io-client'

const SocketContext = createContext()

export function SocketProvider({ children }) {
    const hostname = process.env.REACT_APP_WS
    const socket = useRef()

    socket.current = new SocketIO(hostname)
    socket.current.request = (type, data = {}) => {
        return new Promise((resolve) => {
            socket.current.emit(type, data, resolve)
        })
    }

    return (
        <SocketContext.Provider value={{ socket: socket.current }}>
            {children}
        </SocketContext.Provider>
    )
}

export function useSocket() {
    const context = useContext(SocketContext)
    return context
}
