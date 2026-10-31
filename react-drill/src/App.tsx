import UserList from "./components/UsersList"

function App() {
  const users = [
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
  ]

  const loading = false

  return <UserList users={users} loading={loading} />
}

export default App