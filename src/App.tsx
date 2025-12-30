import './App.css'
import Chat from './components/Chat'
import Home from './components/common/Home'

function App() {
  return (
    <main className='min-h-screen flex justify-center items-center w-screen'>
      <div className='w-full min-h-screen max-w-400 flex flex-col lg:flex-row justify-center items-center bg-[url(/images/bg.webp)] bg-no-repeat bg-cover'>
        <Home />
        <Chat />
      </div>
    </main>
  )
}

export default App
