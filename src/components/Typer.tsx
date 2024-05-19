'use client'

import { generateWord } from '@/util/generateWords'
import { useEffect, useState } from 'react'
import RenderLetter from './LetterComponent'
import Pipe from './PipeComponent'

export default function Typer() {
  const [typed, setTyped] = useState<Array<boolean>>([])
  const [actualLetter, setActualLetter] = useState<number>(0)
  const word = generateWord().toLowerCase().split('')

  const increaseActualLetter = () => {
    setActualLetter((prev) => {
      return prev + 1
    })
  }

  const decreaseActualLetter = () => {
    setActualLetter((prev) => {
      return prev - 1
    })
  }

  const pushTyped = (newValue: boolean) => {
    setTyped((prev) => {
      increaseActualLetter()
      console.log(`Actual Index: ${actualLetter}`)
      console.log(`Letter with this index: ${word[actualLetter]}`)
      return [...prev, newValue]
    })
  }

  const popTyped = () => {
    if (!typed.length) return
    setTyped((prev) => {
      decreaseActualLetter()
      console.log(`Actual Index: ${actualLetter}`)
      const prevArray = [...prev]
      prevArray.pop()
      return prevArray
    })
  }

  function isLetter(letter: string) {
    if (letter.length > 1) return false
    return Boolean(letter.match(/[a-zA-Z]/))
  }

  const keyDownHandler = (e: KeyboardEvent) => {
    const letter = e.key.toLowerCase()
    console.log(`Letter pressed: ${letter}`)

    if (letter !== 'backspace' && letter !== ' ' && !isLetter(letter)) {
      return console.log('Invalid Input')
    }

    if (actualLetter === word.length && letter !== 'backspace') {
      return console.log('End of the word')
    }

    if (letter === 'backspace') {
      if (actualLetter === 0) return
      return popTyped()
    }

    if (letter.toLowerCase() === word[actualLetter]) {
      console.log(`Actual letter: ${word[actualLetter]}`)
      return pushTyped(true)
    }
    pushTyped(false)
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  })

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center p-8 bg-neutral-700">
      <div className="h-full max-w-full flex items-center justify-center -mt-24 gap-1 relative">
        {word.map((letter, i) => {
          if (i >= typed.length)
            return <RenderLetter key={i} color="neutral" letter={letter} />

          if (i < typed.length && typed[i])
            return <RenderLetter key={i} color="green" letter={letter} />

          return <RenderLetter key={i} color="red" letter={letter} />
        })}
        <Pipe
          index={actualLetter}
          className={'h-4 w-[1px] bg-neutral-300 animate-ping absolute'}
        />
      </div>
    </main>
  )
}
