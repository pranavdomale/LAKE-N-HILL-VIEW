import React from "react"

export function Card({ className, children }) {
  return <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
}

