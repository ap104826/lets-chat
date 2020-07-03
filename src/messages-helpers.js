export const getMessagesForRoom = (messages = [], room_id) => (
    (!room_id)
        ? messages
        : messages.filter(message => message.room_id === room_id)
)
