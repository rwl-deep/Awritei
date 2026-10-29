import type { Paragraph } from '../types/editor'
import ParagraphItem from './ParagraphItem'

export type ParagraphFocus = { id: string; position: number }

type Props = {
  paragraphs: Paragraph[]
  onChange: (id: string, text: string) => void
  onSplit: (id: string, selectionStart: number, selectionEnd: number) => void
  onDeleteEmpty: (id: string) => void
  focusRequest: ParagraphFocus | null
}

export default function ParagraphList({ paragraphs, onChange, onSplit, onDeleteEmpty, focusRequest }: Props) {
  return (
    <div className="document-body" role="group" aria-label="Document paragraphs">
      {paragraphs.map((p, index) => (
        <ParagraphItem
          key={p.id}
          paragraph={p}
          index={index}
          onChange={onChange}
          onSplit={onSplit}
          onDeleteEmpty={onDeleteEmpty}
          focusRequest={focusRequest?.id === p.id ? focusRequest : null}
        />
      ))}
    </div>
  )
}
