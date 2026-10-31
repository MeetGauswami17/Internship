function NeverRenderZero() {
  const tasks: string[] = []

  return (
    <div className="p-5">
      {/* Wrong: tasks.length returns 0, which React renders */}
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

export default NeverRenderZero