
import { Injectable } from '@nestjs/common'
import { getManager } from 'typeorm'
import { searchResourceUnicode } from '../utils/search-engine.util'



@Injectable()
export class ApisService {
  constructor(

  ) { }

  private readonly notFoundEntityErrorMsg = 'Entity not found';

  async search(resource: string, key: string) {
    const records = await getManager().queryRunner.query(`
      SELECT * FROM ${resource} WHERE given_name = ${key}
    `)
    const result = searchResourceUnicode(key, records, 'name')

  }

}