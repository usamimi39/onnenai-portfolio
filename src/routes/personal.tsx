import { createFileRoute } from '@tanstack/react-router'
import { CardGrid } from '../components/CardGrid'
import { Container } from '../components/Container'
import { PageHeader } from '../components/PageHeader'
import { sortWorks } from '../content'
import { site } from '../content/site'
import { personal } from '../content/personal'

export const Route = createFileRoute('/personal')({
  head: () => ({
    meta: [{ title: `${site.pages.personal.title} | ${site.name}` }],
  }),
  loader: () => sortWorks(personal),
  component: PersonalPage,
})

function PersonalPage() {
  const items = Route.useLoaderData()
  return (
    <>
      <PageHeader page={site.pages.personal} />
      <Container className="pb-12 md:pb-16">
        <CardGrid items={items} />
      </Container>
    </>
  )
}
