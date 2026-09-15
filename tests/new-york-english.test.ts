import { describe, expect, it } from 'vitest'
import { auditNewYorkEnglish } from '../lib/new-york-english-audit'

describe('New York English bank',()=>{
  it('covers all 150 stable questions with aligned choices',()=>{
    expect(auditNewYorkEnglish()).toEqual({total:150,covered:150,invalid:0})
  })
})
