export const getMessagesForRoom = (messages = [], room_id) => (
    (!room_id)
        ? messages
        : messages.filter(message => message.room_id === room_id)
)

//given rooms and a roomId return the room matching the roomId
export const getRoomFromRoomId = (rooms = [], room_id) => (
    rooms.find(room => room.id === room_id)
)