import { useLayoutEffect, useRef, type KeyboardEvent } from 'react'
import type { Paragraph } from '../types/editor'
import type { ParagraphFocus } from './ParagraphList'

type Props = {
  paragraph: Paragraph
  index: number
  onChange: (id: string, text: string) => void
  onSplit: (id: string, selectionStart: number, selectionEnd: number) => void
  onDeleteEmpty: (id: string) => void
  focusRequest: ParagraphFocus | null
}

export default function ParagraphItem({ paragraph, index, onChange, onSplit, onDeleteEmpty, focusRequest }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useLayoutEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    // Re-measure wrapped text when the value or available width changes.
    function resize() {
      if (!textarea) return
      textarea.style.height = '0px'
      textarea.style.height = `${textarea.scrollHeight}px`
    }

    resize()
    const observer = new ResizeObserver(resize)
    if (textarea.parentElement) observer.observe(textarea.parentElement)
    return () => observer.disconnect()
  }, [paragraph.text])

  useLayoutEffect(() => {
    if (!focusRequest || !textareaRef.current) return
    textareaRef.current.focus()
    textareaRef.current.setSelectionRange(focusRequest.position, focusRequest.position)
  }, [focusRequest])

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return

    const { selectionStart, selectionEnd, value } = event.currentTarget
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      onSplit(paragraph.id, selectionStart, selectionEnd)
    } else if (event.key === 'Backspace' && value === '' && selectionStart === 0 && selectionEnd === 0) {
      event.preventDefault()
      onDeleteEmpty(paragraph.id)
    }
  }

  return (
    <div className="paragraph-item" data-paragraph-id={paragraph.id}>
      <textarea
        ref={textareaRef}
        className="paragraph-input"
        value={paragraph.text}
        onChange={(e) => onChange(paragraph.id, e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder={index === 0 ? 'Start writing…' : undefined}
        aria-label={`Paragraph ${index + 1}`}
      />
    </div>
  )
}
