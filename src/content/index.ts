import { personal } from './personal'
import type { Work } from './types'
import { works } from './works'

// order 昇順 → year 降順（SPEC 3.2）
export function sortWorks(list: Work[]): Work[] {
  return [...list].sort((a, b) => a.order - b.order || b.year - a.year)
}

// works と personal から featured を order 順に（SPEC 3.2）
export function getFeatured(): Work[] {
  return sortWorks([...works, ...personal].filter((work) => work.featured))
}
