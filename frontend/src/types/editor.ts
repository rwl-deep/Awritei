export type Paragraph = {
  id: string
  text: string
}

export type DocumentModel = {
  id: string
  title: string
  paragraphs: Paragraph[]
}
