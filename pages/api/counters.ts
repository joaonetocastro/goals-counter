// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { CounterModel } from '../../shared/models/Counter.model'
import faunadb from 'faunadb'
import { FAUNA_SECRET } from '../../env'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CounterModel[]>
) {
    const q = faunadb.query
    const client = new faunadb.Client({
        secret: FAUNA_SECRET,
        domain: 'db.fauna.com',
        port: 443,
        scheme: 'https',
      })

    const response: {data: any[]} = await client.query(
        q.Map(
            q.Paginate(q.Documents(q.Collection('counters'))),
            q.Lambda(x => q.Get(x))
            ),
    )
    const counters: CounterModel[] = response.data.map((counter: any) => ({
        id: counter.ref.id,
        name: counter.data.name,
        counter: counter.data.counter,
        goal: counter.data.goal,
    }))
    
    res.status(200).json(counters)
}
