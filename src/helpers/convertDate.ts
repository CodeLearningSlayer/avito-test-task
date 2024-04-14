export const convertDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("ru-RU", {
    dateStyle: "medium"
  })
}
