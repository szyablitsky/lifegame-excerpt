import React from 'react'

function splitLines(paragraph) {
  const lines = paragraph.split(/\r?\n/g)
  const linesWithBreaks = []
  lines.forEach((line, i) => {
    linesWithBreaks.push(<span key={i}>{line}</span>)
    linesWithBreaks.push(<br key={`br${i}`}/>)
  })
  linesWithBreaks.pop()
  return linesWithBreaks
}

export default function simpleFormat(text) {
  const paragraphs = text.split(/\r?\n\r?\n/g)
  return paragraphs.map((paragraph, i) => <p key={i}>{splitLines(paragraph)}</p>)
}
