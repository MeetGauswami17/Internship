import { useState } from "react"

function RenderZero() {
  const [tasks, setTasks] = useState<string[]>([])

  return (
    <div className="p-5">

      {/* Wrong: tasks.length can return 0, and React renders that 0 */}
      {tasks.length && <p>Task List</p>}

      {/* Correct: use a boolean condition */}
      {tasks.length === 0 && (
        <p className="text-red-400">
          No tasks available
        </p>
      )}

    </div>
  )
}

export default RenderZero