"use client"

import { useState, useEffect } from "react"
import type { User } from "@/types/user"
import { UserTable } from "@/components/UserTable"
import { UserModal } from "@/components/UserModal"
import { fetchUsers } from "@/lib/api"

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const userData = await fetchUsers()
        setUsers(userData)
      } catch (err) {
        setError("Failed to load users")
        console.error("Error loading users:", err)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
  }

  const handleCloseModal = () => {
    setSelectedUser(null)
  }

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId))
    if (selectedUser?.id === userId) {
      setSelectedUser(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-red-600 text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Directory</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Manage and view user information from our directory</p>
          <div className="mt-2 text-sm text-gray-500">Total users: {users.length}</div>
        </div>

        <UserTable users={users} onUserSelect={handleUserSelect} onDeleteUser={handleDeleteUser} />

        {selectedUser && <UserModal user={selectedUser} onClose={handleCloseModal} />}
      </div>
    </div>
  )
}
