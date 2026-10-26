
import ClickPosition from "./components/ClickPosition"
import DoubleIncrement from "./components/DoubleIncrement"
import FAQCard from "./components/FAQCard"
import FAQCard2 from "./components/FAQCard2"
import FAQCard3 from "./components/FAQCard3"
import ResetButton from "./components/ResetButton"

function App() {
  return (
    <div className="min-h-screen space-y-6 bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold">
        React Events Practice
      </h1>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">1. Click Position</h2>
        <ClickPosition />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">2. Double Increment</h2>
        <DoubleIncrement />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">3–4. FAQ Cards</h2>
        <div className="grid gap-3">
          <FAQCard />
          <FAQCard2 />
          <FAQCard3 />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">5. Reset Button</h2>
        <ResetButton />
      </section>
    </div>
  )
}

export default App
