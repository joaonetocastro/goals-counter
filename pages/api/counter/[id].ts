import type { NextApiRequest, NextApiResponse } from 'next'
import { CounterModel } from '../../../shared/models/Counter.model'
import faunadb from 'faunadb'
import { FAUNA_SECRET } from '../../../env'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CounterModel[]>
) {
    const counter = JSON.parse(req.body)
    const q = faunadb.query
    const client = new faunadb.Client({
        secret: FAUNA_SECRET,
        domain: 'db.fauna.com',
        port: 443,
        scheme: 'https',
      })

    client.query(
      q.Update(
        q.Ref(q.Collection('counters'), counter.id),
        { data: counter },
      )
    ).then(console.error)
    res.status(200).json(counter)
}
