import { AuthGoogleProvider } from "./contexts/auth"
import Routes from "./routes"

function App() {
  return (
    <div className="App">
      <AuthGoogleProvider>
        <Routes />
      </AuthGoogleProvider>
    </div>
  )
}

export default App
