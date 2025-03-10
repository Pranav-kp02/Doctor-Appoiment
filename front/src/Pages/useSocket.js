// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// // Create a singleton socket instance
// let socket;

// export const useSocket = (userId) => {
//   const [isConnected, setIsConnected] = useState(false);

//   useEffect(() => {
//     // Initialize socket if it doesn't exist
//     if (!socket) {
//       console.log('Creating new socket connection');
//       socket = io('http://localhost:5000', {
//         reconnection: true,
//         reconnectionAttempts: 5,
//         reconnectionDelay: 1000,
//       });
//     }

//     // Connection event handlers
//     const onConnect = () => {
//       console.log('Socket connected with ID:', socket.id);
//       setIsConnected(true);

//       // Register user when connected
//       if (userId) {
//         socket.emit('register', userId);
//         console.log(`User ${userId} registered on connect`);
//       }
//     };

//     const onDisconnect = () => {
//       console.log('Socket disconnected');
//       setIsConnected(false);
//     };

//     const onError = (error) => {
//       console.error('Socket error:', error);
//     };

//     // Set up event listeners
//     socket.on('connect', onConnect);
//     socket.on('disconnect', onDisconnect);
//     socket.on('connect_error', onError);

//     // If socket is already connected, register user
//     if (socket.connected && userId) {
//       socket.emit('register', userId);
//       console.log(`User ${userId} registered (already connected)`);
//       setIsConnected(true);
//     }

//     // Cleanup
//     return () => {
//       socket.off('connect', onConnect);
//       socket.off('disconnect', onDisconnect);
//       socket.off('connect_error', onError);
//     };
//   }, [userId]);

//   return { socket, isConnected };
// };
