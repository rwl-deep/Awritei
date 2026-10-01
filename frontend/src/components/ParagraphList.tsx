import React from 'react'
import type { Paragraph } from '../types/editor'
import ParagraphItem from './ParagraphItem'

type Props = {
  paragraphs: Paragraph[]
  onChange: (id: string, text: string) => void
  onDelete: (id: string) => void
}

export default function ParagraphList({ paragraphs, onChange, onDelete }: Props) {
  return (
    <div>
      {paragraphs.map((p) => (
        <ParagraphItem key={p.id} paragraph={p} onChange={onChange} onDelete={onDelete} />
      ))}
    </div>
  )
}
