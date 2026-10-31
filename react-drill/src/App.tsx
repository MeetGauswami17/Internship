import { useEffect, useState } from "react"
import UserList from "./components/UsersList"

type User = {
  id: number
  name: string
  email: string
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading users from a server
    const timer = setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "Meet Gauswami",
          email: "meet@example.com",
        },
        {
          id: 2,
          name: "Rahul Patel",
          email: "rahul@example.com",
        },
        {
          id: 3,
          name: "Priya Shah",
          email: "priya@example.com",
        },
      ])

      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <UserList users={users} loading={loading} />
    </div>
  )
}

export default App