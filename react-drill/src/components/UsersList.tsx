import { useState } from "react"

type User = {
  id: number
  name: string
  email: string
}

type UserListProps = {
  users: User[]
  loading: boolean
}

function Spinner() {
  return (
    <div className="flex justify-center py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-600 border-t-indigo-400" />
    </div>
  )
}

function UserList({ users, loading }: UserListProps) {
  const [search, setSearch] = useState("")

  // Compute the filtered list during render
  const q = search.trim().toLowerCase()

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
  )

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">
        User List
      </h1>

      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="mb-6 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Dynamic result count */}
          <p className="mb-4 text-sm text-slate-500">
            Showing {filtered.length} of {users.length} users
          </p>

          {/* Empty messages */}
          {filtered.length === 0 && (
            <p className="p-8 text-center text-slate-400">
              {users.length === 0
                ? "No users found on the server."
                : "No users match your search - try another name."}
            </p>
          )}

          {/* Filtered user list */}
          <div className="space-y-3">
            {filtered.map((user) => (
              <div
                key={user.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <h2 className="font-semibold text-slate-800">
                  {user.name}
                </h2>

                <p className="text-sm text-slate-500">
                  {user.email}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default UserList