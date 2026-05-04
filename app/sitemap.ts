import type { MetadataRoute } from 'next'
import { getSlugs } from '@/lib/ciudades-seo'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://reformareal.com'
  const now = new Date()

  const ciudades = getSlugs()

  const ciudadPages: MetadataRoute.Sitemap = ciudades.flatMap((slug) => [
    { url: `${base}/reformas-integrales/${slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/reforma-cocina/${slug}`,      lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
    { url: `${base}/reforma-bano/${slug}`,        lastModified: now, changeFrequency: 'monthly', priority: 0.80 },
  ])

  return [
    { url: base,                                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/reformas-integrales-madrid`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/reforma-cocina-madrid`,         lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/reforma-bano-madrid`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/reformistas`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/registro`,                      lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/login`,                         lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    ...ciudadPages,
  ]
}
