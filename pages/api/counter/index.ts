import type { NextApiRequest, NextApiResponse } from 'next'
import { CounterModel } from '../../../shared/models/Counter.model'
import faunadb from 'faunadb'
import { FAUNA_SECRET } from '../../../env'
import { v4 as uuidv4 } from 'uuid';

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
    const data = {...counter, id: uuidv4()}

    client.query(
      q.Create(
        q.Collection('counters'),
        { data },
      )
    ).then(console.error)
    
    res.status(201).json(counter)
}
