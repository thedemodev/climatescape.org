import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUsers,
  faBuilding,
  faLocationArrow,
  faTag,
} from "@fortawesome/free-solid-svg-icons"

import OrganizationSocial from "../components/OrganizationSocial"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Section from "../components/Section"

const OrganizationTemplate = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const orgData = data.airtable.data

  const sector = orgData.Sector && orgData.Sector[0]?.data
  const org = {
    logo: orgData.Logo?.localFiles?.[0]?.childImageSharp?.fixed,
    title: orgData.Name,
    sector: sector && {
      name: sector.Name,
      slug: sector.Slug,
    },
    tagline: orgData.Tagline,
    about: orgData.About && orgData.About.replace(orgData.Tagline, ""),
    location: orgData.HQ_Location,
    headcount: orgData.Headcount,
    orgType: orgData.Organization_Type,
    homepage: orgData.Homepage,
    linkedIn: orgData.LinkedIn,
    twitter: orgData.Twitter,
    tags: orgData.Tags,
  }

  return (
    <Layout contentClassName="bg-gray-200">
      <SEO title={`${org.title} on ${siteTitle}`} description={org.tagline} />

      <div className="max-w-4xl mx-auto pb-4">
        {org.sector && (
          <Link
            to={`/sectors/${org.sector.slug}`}
            className="inline-block text-lg pt-3 px-2 text-gray-700 hover:text-teal-900"
          >
            &laquo; {org.sector.name}
          </Link>
        )}

        <Section>
          <div className="flex items-center text-gray-900">
            {org.logo && <Img fixed={org.logo} className="mr-3 w-16 h-16" />}

            <h1 className="flex-grow text-xl font-semibold">{org.title}</h1>
          </div>

          <h2 className="my-5 pl-3 lg:my-6 border-l-4 border-teal-500 border-solid font-semibold">
            {org.tagline}
          </h2>

          {org.about && org.about !== org.tagline && (
            <div className="my-3">{org.about}</div>
          )}

          <ul>
            {org.location && (
              <li>
                <span className="w-8 inline-block">
                  <FontAwesomeIcon
                    icon={faLocationArrow}
                    className="mx-1 text-gray-700"
                  />
                </span>
                {org.location}
              </li>
            )}
            {org.headcount && (
              <li>
                <span className="w-8 inline-block">
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="mx-1 text-gray-700"
                  />
                </span>
                {org.headcount} employees
              </li>
            )}
            {org.orgType && (
              <li>
                <span className="w-8 inline-block">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    className="mx-1 text-gray-700"
                  />
                </span>
                {org.orgType}
              </li>
            )}
            {org.tags && org.tags.length && (
              <li>
                <span className="w-8 inline-block">
                  <FontAwesomeIcon
                    icon={faTag}
                    className="mx-1 text-gray-700"
                  />
                </span>
                {org.tags.join(", ")}
              </li>
            )}
          </ul>
        </Section>

        <Section>
          <OrganizationSocial
            homepage={org.homepage}
            linkedIn={org.linkedIn}
            twitter={org.twitter}
          />
        </Section>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query OrganizationPageQuery($id: Int) {
    site {
      siteMetadata {
        title
      }
    }

    airtable(table: { eq: "Organizations" }, data: { ID: { eq: $id } }) {
      data {
        Logo {
          localFiles {
            childImageSharp {
              fixed(width: 64, height: 64, fit: CONTAIN, background: "white") {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
        Name
        Sector {
          data {
            Name
            Slug
          }
        }
        Tagline
        About
        HQ_Location
        Headcount
        Organization_Type
        Homepage
        LinkedIn
        Twitter
        Tags
      }
    }
  }
`

export default OrganizationTemplate
