"use client"

import type { User } from "@/types/user"
import { X, MapPin, Phone, Globe, Building } from "lucide-react"
import { useEffect } from "react"

interface UserModalProps {
  user: User
  onClose: () => void
}

export function UserModal({ user, onClose }: UserModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [onClose])

  const getMapUrl = () => {
    const { lat, lng } = user.address.geo
    return `https://www.google.com/maps?q=${lat},${lng}`
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        {/* Modal panel - Responsive sizing */}
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 md:max-w-2xl lg:max-w-3xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 p-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg sm:text-xl leading-6 font-medium text-gray-900 mb-4 pr-8">User Details</h3>

              {/* Mobile-first responsive layout */}
              <div className="space-y-4 sm:space-y-6">
                {/* Basic Info */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{user.name}</h4>
                  <p className="text-sm sm:text-base text-gray-600">@{user.username}</p>
                  <p className="text-sm sm:text-base text-blue-600 break-all">{user.email}</p>
                </div>

                {/* Two-column layout on larger screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Address */}
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 text-sm sm:text-base">Address</h5>
                      <p className="text-sm text-gray-600 break-words">
                        {user.address.street}, {user.address.suite}
                      </p>
                      <p className="text-sm text-gray-600">
                        {user.address.city} {user.address.zipcode}
                      </p>
                      <a
                        href={getMapUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors inline-block mt-1"
                      >
                        View on Map →
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 text-sm sm:text-base">Phone</h5>
                      <p className="text-sm text-gray-600 break-all">{user.phone}</p>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 text-sm sm:text-base">Website</h5>
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors break-all"
                      >
                        {user.website}
                      </a>
                    </div>
                  </div>

                  {/* Company */}
                  <div className="flex items-start space-x-3">
                    <Building className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-gray-900 text-sm sm:text-base">Company</h5>
                      <p className="text-sm font-medium text-gray-800 break-words">{user.company.name}</p>
                      <p className="text-sm text-gray-600 italic break-words">"{user.company.catchPhrase}"</p>
                      <p className="text-sm text-gray-500 break-words">{user.company.bs}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-8 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
