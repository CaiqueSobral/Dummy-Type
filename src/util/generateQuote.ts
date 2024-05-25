import { GET } from './http'

export async function generateQuote() {
  const randomQuote = await GET('https://api.quotable.io/quotes/random', {
    params: {
      minLength: 200,
      maxLength: 300,
    },
  })

  return randomQuote[0].content.replace(/[^\w\s\']|_/g, '').replace(/\s+/g, ' ')
}
