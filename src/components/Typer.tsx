'use client'

import { generateWord } from '@/util/generateWords'
import { useEffect, useState } from 'react'
import RenderLetter from './LetterComponent'
import type { colorType } from '@/types/color'

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
      return [...prev, newValue]
    })
  }

  const popTyped = () => {
    if (!typed.length) return
    setTyped((prev) => {
      decreaseActualLetter()
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

  const showPipe = (index: number) => {
    return index === actualLetter
  }

  const renderLetter = (i: number, letter: string) => {
    let color: colorType = 'wrong'
    if (i >= typed.length) color = 'neutral'
    if (i < typed.length && typed[i]) color = 'hit'

    return (
      <RenderLetter
        key={i}
        color={color}
        letter={letter}
        showPipe={showPipe(i)}
      />
    )
  }

  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center p-16 bg-primary">
      <div
        className="max-w-full grid justify-center gap-1 relative"
        style={{ gridTemplateColumns: 'repeat(auto-fit, 15px)' }}
      >
        {word.map((letter, i) => {
          return renderLetter(i, letter)
        })}
      </div>
    </main>
  )
}
