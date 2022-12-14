const io = require('socket.io')(5001, {
    cors: {
        origin: "192.168.31.11:3000/",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
      }
})

io.on("error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });

io.on('connection', socket => {
    const id = socket.handshake.query.id;

    console.log(id)

    socket.join(id);

    socket.on('send-message', ({
        recipients,
        text
    }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient)
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                recipients: newRecipients,
                sender: id,
                text
            })
        })
    })
})