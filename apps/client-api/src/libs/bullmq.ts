import { Queue, Worker } from 'bullmq'

export async function scheduler() {
  const NAME = 'TEST'

  const queue = new Queue(NAME, {
    connection: { url: 'redis://127.0.0.1:6379' },
  })

  await queue.add('test', {})

  const worker = new Worker(
    NAME,
    async (jobs) => {
      console.log(jobs.id, jobs.name, jobs.data, new Date())
    },
    {
      connection: { url: 'redis://127.0.0.1:6379' },
    },
  )

  worker.on('failed', console.error)
}
