import { youtube } from "./deps.ts"

Deno.cron("Youtube cron", "*/1 * * * *", () => {
  main()
})

const main = async () => {
  const { data } = await youtube.videos.list({
    id: ["y3XNsCrGdPU"],
    part: ["snippet", "statistics"],
  })

  const viewCount = data.items?.[0].statistics?.viewCount
  const likeCount = data.items?.[0].statistics?.likeCount

  const newTitle = `Bu videonun ${viewCount} görüntülenmesi ve ${likeCount} beğenisi var`

  const { data: updateData } = await youtube.videos.update({
    part: ["snippet", "statistics"],
    requestBody: {
      id: "y3XNsCrGdPU",
      snippet: {
        title: newTitle,
        categoryId: data.items?.[0].snippet?.categoryId,
      },
    },
  })
  console.log({ updateData })
}
