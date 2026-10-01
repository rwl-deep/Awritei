import React from 'react'
import type { Paragraph } from '../types/editor'

type Props = {
  paragraph: Paragraph
  onChange: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export default function ParagraphItem({ paragraph, onChange, onDelete }: Props) {
  return (
    <div className="paragraph-item" style={{ marginBottom: 12 }}>
      <textarea
        value={paragraph.text}
        onChange={(e) => onChange(paragraph.id, e.target.value)}
        rows={3}
        style={{ width: '100%', fontSize: 14, padding: 8 }}
        aria-label={`Paragraph ${paragraph.id}`}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
        <button
          type="button"
          onClick={() => onDelete(paragraph.id)}
          style={{ background: '#e55353', color: 'white', border: 'none', padding: '6px 10px', borderRadius: 4 }}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
