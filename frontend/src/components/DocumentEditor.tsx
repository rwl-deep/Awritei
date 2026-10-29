import { useState } from 'react'
import { createId } from '../utils/id'
import type { DocumentModel, Paragraph } from '../types/editor'
import ParagraphList, { type ParagraphFocus } from './ParagraphList'

export default function DocumentEditor() {
  const [doc, setDoc] = useState<DocumentModel>(() => ({
    id: createId('doc'),
    title: 'Untitled Document',
    paragraphs: [{ id: createId('p'), text: '' }],
  }))
  const [focusRequest, setFocusRequest] = useState<ParagraphFocus | null>(null)

  function splitParagraph(id: string, selectionStart: number, selectionEnd: number) {
    const p: Paragraph = { id: createId('p'), text: '' }
    setDoc((d) => {
      const index = d.paragraphs.findIndex((paragraph) => paragraph.id === id)
      if (index === -1) return d

      const current = d.paragraphs[index]
      return {
        ...d,
        paragraphs: [
          ...d.paragraphs.slice(0, index),
          { ...current, text: current.text.slice(0, selectionStart) },
          { ...p, text: current.text.slice(selectionEnd) },
          ...d.paragraphs.slice(index + 1),
        ],
      }
    })
    setFocusRequest({ id: p.id, position: 0 })
  }

  function updateParagraph(id: string, text: string) {
    setDoc((d) => ({
      ...d,
      paragraphs: d.paragraphs.map((p) => (p.id === id ? { ...p, text } : p)),
    }))
  }

  function deleteEmptyParagraph(id: string) {
    const index = doc.paragraphs.findIndex((p) => p.id === id)
    if (index === -1 || doc.paragraphs[index].text !== '' || doc.paragraphs.length === 1) return

    const target = doc.paragraphs[index - 1] ?? doc.paragraphs[index + 1]
    setDoc((d) => ({ ...d, paragraphs: d.paragraphs.filter((p) => p.id !== id) }))
    setFocusRequest({ id: target.id, position: index > 0 ? target.text.length : 0 })
  }

  return (
    <main className="document-editor">
      <input
        className="document-title"
        aria-label="Document title"
        value={doc.title}
        onChange={(e) => setDoc((d) => ({ ...d, title: e.target.value }))}
        placeholder="Document title"
      />

      <ParagraphList
        paragraphs={doc.paragraphs}
        onChange={updateParagraph}
        onSplit={splitParagraph}
        onDeleteEmpty={deleteEmptyParagraph}
        focusRequest={focusRequest}
      />
    </main>
  )
}
