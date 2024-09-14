import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz';
    if (numAllowed) str += '1234567890';
    if (charAllowed) str += '!@#$%^&*{}[]';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

      setpassword(pass)
    }
  }, [length, numAllowed, charAllowed, setpassword])

  const copyPasswordToClipboard = useCallback( ()=> {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,9)
     window.navigator.clipboard.writeText(password)
  },[password]) 

  useEffect(() => {
    passwordGenerator()
  },[length,numAllowed,charAllowed])


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden my-3 mb-4'>
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref = {passwordRef} />
          <button onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white py-0.5 px-3 shrink-0'>
            Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input type="range"
              max={100}
              min={6}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className='cursor-pointer'
            />
            <label>Length: {length}</label>

            <input type="checkbox"
              defaultValue={numAllowed}
              onChange={() => { setNumAllowed((prev) => (!prev)) }} />
              <label>Numbers</label>

            <input type="checkbox"
              defaultValue={charAllowed}
              onChange={() => {setCharAllowed((prev) => (!prev)) }} />
              <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
