import { youtube } from "./deps.ts"

Deno.cron("Youtube cron", "*/1 * * * *", () => {
  main()
})

const main = async () => {
  const { data } = await youtube.videos.list({
    id: ["cggrTpEex2k"],
    part: ["snippet", "statistics"],
  })
  const newTitle = `Bu videonun ${data.items?.[0].statistics?.viewCount} izlenmesi var`
  console.log({ data })
  const { data: responseData } = await youtube.videos.update({
    part: ["snippet"],
    requestBody: {
      id: "cggrTpEex2k",
      snippet: {
        title: newTitle,
        categoryId: data.items?.[0].snippet?.categoryId,
      },
    },
  })
  console.log({ responseData })
}

main()
