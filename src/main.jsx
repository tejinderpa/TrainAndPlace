import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', textAlign: 'center' }}>
      <h1>Hello World</h1>
      <p>This is a simple React app.</p>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)