import { createFileRoute } from '@tanstack/react-router'
import { CardGrid } from '../components/CardGrid'
import { Hero } from '../components/Hero'
import { ProfileLists } from '../components/ProfileLists'
import { Section } from '../components/Section'
import { SkillList } from '../components/SkillList'
import { getFeatured } from '../content'
import { profile } from '../content/profile'
import { site } from '../content/site'

export const Route = createFileRoute('/')({
  loader: () => getFeatured(),
  component: Home,
})

// Figma: Top / Desktop・Top / Mobile（SPEC 6）
function Home() {
  const featured = Route.useLoaderData()
  return (
    <>
      <Hero profile={profile} />
      <Section title={site.sections.featured}>
        <CardGrid items={featured} />
      </Section>
      <ProfileLists
        columns={[
          { title: site.sections.positions, items: profile.positions },
          { title: site.sections.awards, items: profile.awards },
        ]}
      />
      <Section title={site.sections.skills}>
        <SkillList skills={profile.skills} />
      </Section>
      {/* <Section title={site.sections.aboutSite}>
        <AboutSite notes={profile.aboutSite} />
      </Section> */}
    </>
  )
}
