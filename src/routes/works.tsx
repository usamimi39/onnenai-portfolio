import { createFileRoute } from '@tanstack/react-router'
import { CardGrid } from '../components/CardGrid'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import { sortWorks } from '../content'
import { site } from '../content/site'
import { works } from '../content/works'

export const Route = createFileRoute('/works')({
  head: () => ({
    meta: [{ title: `${site.pages.works.title} | ${site.name}` }],
  }),
  loader: () => sortWorks(works),
  component: WorksPage,
})

function WorksPage() {
  const items = Route.useLoaderData()
  return (
    <>
      <PageHeader page={site.pages.works} />
      <Container className="pb-12 md:pb-16">
        <CardGrid items={items} />
      </Container>
    </>
  )
}
