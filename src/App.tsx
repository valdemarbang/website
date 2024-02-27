import { useState } from 'react'
import Button from '@mui/material/Button';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return <Button variant="contained" onClick={() => setCount(count + 1)}>Counter: {count}</Button>;
}

export default App