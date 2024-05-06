export function getBookList(
  list: string[],
  index: number,
  separator: string,
  callback: (bookList: string) => void,
  result: string = ""
) {
  if (index === list.length) {
    callback(result)
    return
  }

  const book = list[index]
  result += index === list.length - 1 ? book : book + separator

  setTimeout(() => {
    getBookList(list, index + 1, separator, callback, result)
  }, 100)
}

export function saveItemOnDatabase(name: string, callback: () => void) {
  setTimeout(
    () => {
      callback()
    },
    Math.random() * name.length * 10
  )
}
