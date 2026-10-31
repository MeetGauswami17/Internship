import LoginSwitch from "./components/LoginSwitch"
import TaskList from "./components/TaskList"
import LevelBar from "./components/LevelBar"
import GuardClause from "./components/GuardClause"
import RenderZero from "./components/RenderZero"

function App() {
  return (
    <div className="min-h-screen space-y-8 bg-slate-900 p-8 text-white">

      <LoginSwitch />

      <TaskList />

      <LevelBar />

      <GuardClause />

      <RenderZero />

    </div>
  )
}

export default App