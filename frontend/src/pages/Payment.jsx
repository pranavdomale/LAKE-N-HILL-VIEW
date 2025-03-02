// import React, { useState } from "react"
// import { BanknotesIcon, QrCodeIcon } from "@heroicons/react/24/solid"
// import { QRCodeSVG } from "qrcode.react"

// const PaymentOption = ({ icon, title, description, selected, onClick }) => (

//   <div
//     className={`border rounded-lg p-4 cursor-pointer transition-all ${
//       selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
//     }`}
//     onClick={onClick}
//   >
//     <div className="flex items-center space-x-3">
//       <div className={`p-2 rounded-full ${selected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}>
//         {icon}
//       </div>
//       <div>
//         <h3 className="font-semibold text-lg">{title}</h3>
//         <p className="text-sm text-gray-600">{description}</p>
//       </div>
//     </div>
//   </div>
// )

// const QRCodeDisplay = ({ value }) => (
//   <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
//     <QRCodeSVG value={value} size={200} level="H" />
//     <p className="mt-4 text-sm text-gray-600">Scan this QR code to pay</p>
//   </div>
// )

// const PaymentForm = () => {
//   const [paymentMethod, setPaymentMethod] = useState("")
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState(false)

//   const hotelPaymentInfo = require("../assets/QRCode.jpg"); // Replace with actual hotel payment link or info

//   const handleSubmit = (event) => {
//     event.preventDefault()
//     setError("")

//     if (!paymentMethod) {
//       setError("Please select a payment method")
//       return
//     }

//     console.log("Payment submitted:", { paymentMethod })
//     setSuccess(true)
//   }

//   if (success) {
//     return (
//       <div
//         className="text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
//         role="alert"
//       >
//         <h2 className="font-bold text-xl mb-2">Payment Successful!</h2>
//         <p>Thank you for your purchase. Your order has been processed.</p>
//       </div>
//     )
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="space-y-4">
//         <PaymentOption
//           icon={<BanknotesIcon className="h-6 w-6" />}
//           title="Cash"
//           description="Pay with cash upon arrival"
//           selected={paymentMethod === "cash"}
//           onClick={() => setPaymentMethod("cash")}
//         />
//         <PaymentOption
//           icon={<QrCodeIcon className="h-6 w-6" />}
//           title="QR Code Payment"
//           description="Scan QR code to pay online"
//           selected={paymentMethod === "qr"}
//           onClick={() => setPaymentMethod("qr")}
//         />
//       </div>

//       {paymentMethod === "qr" && (
//         <div className="mt-4">
//           <QRCodeDisplay value={hotelPaymentInfo} />
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
//           <span className="block sm:inline">{error}</span>
//         </div>
//       )}

//       <button
//         type="submit"
//         className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//       >
//         Confirm Payment
//       </button>
//     </form>
//   )
// }

// const App = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Choose Payment Method</h2>
//           <p className="mt-2 text-center text-sm text-gray-600">Select your preferred payment option below</p>
//         </div>
//         <PaymentForm />
//       </div>
//     </div>
//   )
// }

// export default App;

import React, { useState } from "react"
import { BanknotesIcon, QrCodeIcon } from "@heroicons/react/24/solid"

const PaymentOption = ({ icon, title, description, selected, onClick }) => (
  <div
    className={`border rounded-lg p-4 cursor-pointer transition-all ${
      selected ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-full ${selected ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600"}`}>
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
)

const QRCodeDisplay = ({ imageSrc }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
    <img src={imageSrc} alt="QR Code" className="w-52 h-52 rounded-lg shadow" />
    <p className="mt-4 text-sm text-gray-600">Scan this QR code to pay</p>
  </div>
)

const PaymentForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const qrCodeImagePath = require("../assets/QRCode.jpg"); // Make sure the image is inside the public/ folder

  const handleSubmit = (event) => {
    event.preventDefault()
    setError("")

    if (!paymentMethod) {
      setError("Please select a payment method")
      return
    }

    console.log("Payment submitted:", { paymentMethod })
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="text-center bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <h2 className="font-bold text-xl mb-2">Payment Successful!</h2>
        <p>Thank you for your purchase. Your order has been processed.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PaymentOption
          icon={<BanknotesIcon className="h-6 w-6" />}
          title="Cash"
          description="Pay with cash upon arrival"
          selected={paymentMethod === "cash"}
          onClick={() => setPaymentMethod("cash")}
        />
        <PaymentOption
          icon={<QrCodeIcon className="h-6 w-6" />}
          title="QR Code Payment"
          description="Scan QR code to pay online"
          selected={paymentMethod === "qr"}
          onClick={() => setPaymentMethod("qr")}
        />
      </div>

      {paymentMethod === "qr" && (
        <div className="mt-4">
          <QRCodeDisplay imageSrc={qrCodeImagePath} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Confirm Payment
      </button>
    </form>
  )
}

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Choose Payment Method</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Select your preferred payment option below</p>
        </div>
        <PaymentForm />
      </div>
    </div>
  )
}

export default App;