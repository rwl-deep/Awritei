import React, { useState } from 'react'
import { createId } from '../utils/id'
import type { DocumentModel, Paragraph } from '../types/editor'
import ParagraphList from './ParagraphList'

export default function DocumentEditor() {
  const [doc, setDoc] = useState<DocumentModel>(() => ({
    id: createId('doc'),
    title: 'Untitled Document',
    paragraphs: [{ id: createId('p'), text: '' }],
  }))

  function addParagraph() {
    const p: Paragraph = { id: createId('p'), text: '' }
    setDoc((d) => ({ ...d, paragraphs: [...d.paragraphs, p] }))
  }

  function updateParagraph(id: string, text: string) {
    setDoc((d) => ({
      ...d,
      paragraphs: d.paragraphs.map((p) => (p.id === id ? { ...p, text } : p)),
    }))
  }

  function deleteParagraph(id: string) {
    setDoc((d) => ({ ...d, paragraphs: d.paragraphs.filter((p) => p.id !== id) }))
  }

  return (
    <main style={{ maxWidth: 800, margin: '24px auto', padding: '0 16px' }}>
      <input
        value={doc.title}
        onChange={(e) => setDoc((d) => ({ ...d, title: e.target.value }))}
        placeholder="Document title"
        style={{ width: '100%', fontSize: 20, padding: 8, marginBottom: 12 }}
      />

      <ParagraphList paragraphs={doc.paragraphs} onChange={updateParagraph} onDelete={deleteParagraph} />

      <div style={{ marginTop: 12 }}>
        <button type="button" onClick={addParagraph} style={{ padding: '8px 12px' }}>
          Add paragraph
        </button>
      </div>
    </main>
  )
}
