'use client'

import { useEffect, useState } from 'react'
import RenderLetter from './LetterComponent'
import type { colorType } from '@/types/color'
import { generateQuote } from '@/util/generateQuote'

export default function Typer() {
  const [typed, setTyped] = useState<Array<boolean>>([])
  const [actualLetter, setActualLetter] = useState<number>(0)
  const [quote, setQuote] = useState<Array<string>>([])
  const [words, setWords] = useState<Array<string>>([])

  const setRandomQuote = async () => {
    const randomQuote = await generateQuote()
    setQuote(randomQuote.toLowerCase().split(''))
    setWords(randomQuote.toLowerCase().split(' '))
  }

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

    if (actualLetter === quote.length && letter !== 'backspace') {
      return console.log('End of the quote')
    }

    if (letter === 'backspace') {
      if (actualLetter === 0) return
      return popTyped()
    }

    if (letter.toLowerCase() === quote[actualLetter]) {
      console.log(`Actual letter: ${quote[actualLetter]}`)
      return pushTyped(true)
    }
    pushTyped(false)
  }

  const showPipe = (index: number) => {
    return index === actualLetter
  }

  useEffect(() => {
    if (!quote.length) setRandomQuote()
    window.addEventListener('keydown', keyDownHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
    }
  })

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
      <div className="max-w-full grid gap-1 relative grid-cols-[repeat(auto-fit,15px)]">
        {quote.map((letter, i) => {
          return renderLetter(i, letter)
        })}
      </div>
    </main>
  )
}
