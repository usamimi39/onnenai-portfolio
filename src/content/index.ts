import { personal } from './personal'
import {  workYears } from './types'
import type {Work} from './types';
import { works } from './works'

// order 昇順 → year 降順（SPEC 3.2）。複数年の作品はいちばん新しい年で比べる
export function sortWorks(list: Work[]): Work[] {
  return [...list].sort((a, b) => a.order - b.order || Math.max(...workYears(b)) - Math.max(...workYears(a)))
}

// works と personal から featured を order 順に（SPEC 3.2）
export function getFeatured(): Work[] {
  return sortWorks([...works, ...personal].filter((work) => work.featured))
}
