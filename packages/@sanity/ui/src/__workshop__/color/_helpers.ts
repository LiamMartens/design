export function ucfirst(str: string): string {
  return str.slice(0, 1).toUpperCase() + str.slice(1)
}

export const clipboard: {write: (text: string) => Promise<void>} = {
  write(text: string) {
    const type = 'text/plain'
    const blob = new Blob([text], {type})
    const data = [new ClipboardItem({[type]: blob as any})]

    return navigator.clipboard.write(data)
  },
}
