import { Queue, Worker } from 'bullmq'

const url = 'redis://127.0.0.1:6379'

export async function scheduler() {
  const queue = new Queue('app', { connection: { url } })

  await queue.drain()

  await queue.upsertJobScheduler('schedule', {
    pattern: '* * * * *',
  })

  const worker = new Worker(
    'app',
    async (jobs) => {
      console.log(jobs.id, jobs.name, jobs.data, new Date())
    },
    { connection: { url } },
  )

  worker.on('error', console.error)
  worker.on('failed', console.error)
}
