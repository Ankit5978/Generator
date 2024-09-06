import { useState, useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false);
  const [characters, setCharacters] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (number) str += "0123456789"
    if (characters) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, number, characters])

  const copyPasswordToClipboard = useCallback(() => {
   
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, number, characters, passwordGenerator])
  return (
    <>
       <div className='text-orange-500 w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-red-900 '>Test</div>
       <input type='text'
       value={password}
       placeholder='password'
        className='outline-none w-full py-1 px-3'
          ref={passwordRef}>
       </input>

       <button
       onClick={copyPasswordToClipboard}
className='outline-none bg-blue-700 Itext-white
px-3 py-0.5 shrink-0'
>copy</button>
<div className='flex text-sm gap-x-2'>
<div className='flex items-center gap-x-1'>

<input type="range"
       min={8}
       max={100}
       value={length}
       className='cursor-pointer'
       onChange={(e)=>{setLength(e.target.value)}} />
    
    <label >length: {length}</label>

    <input type="checkbox"
    defaultChecked={characters}
    id='inputcharacter'
    onChange={()=>{
    setNumber((prev)=>!prev)
    }} />
    <label htmlFor="inputcharacter">chracter</label>

    <input type="checkbox"
    defaultChecked={number}
    id='inputnumber'
    onChange={()=>{
    setCharacters((prev)=>!prev)
    }} />
    <label htmlFor="inputnumber">number</label>
    </div>
    </div>
    </>
  )
}

export default App
