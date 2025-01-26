import { Star } from "lucide-react"


const rooms = [
  {
    type: "Luxury Rooms",
    price: "250",
    info: "Lorem ipsum dolor sit amet constur adipisicing elit sed do eiusmtem por incid.",
    image: "https://via.placeholder.com/400x300",
    rating: 5,
  },
  {
    type: "Delux Rooms",
    price: "250",
    info: "Lorem ipsum dolor sit amet constur adipisicing elit sed do eiusmtem por incid.",
    image: "https://via.placeholder.com/400x300",
    rating: 5,
  },
  {
    type: "Super Delux Rooms",
    price: "250",
    info: "Lorem ipsum dolor sit amet constur adipisicing elit sed do eiusmtem por incid.",
    image: "https://via.placeholder.com/400x300",
    rating: 5,
  },
]

const RoomCards = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <h1 className="text-4xl font-bold text-gray-800">Our Rooms</h1>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room, index) => (
          <div key={index} className="overflow-hidden border rounded-lg shadow-lg">
            <img src={room.image || "/placeholder.svg"} alt={room.type} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{room.type}</h2>
              <div className="flex mb-4">
                {[...Array(room.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-pink-400 text-pink-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{room.info}</p>
              <div className="flex items-center justify-between">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2 rounded">BOOK NOW</button>
                <div className="text-right">
                  <span className="text-pink-500 text-2xl font-bold">${room.price}</span>
                  <p className="text-gray-600 text-sm">Per Night</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RoomCards

