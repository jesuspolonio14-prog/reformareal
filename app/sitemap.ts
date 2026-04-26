import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://reformareal.com'
  return [
    { url: base,                                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/reformas-integrales-madrid`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/reforma-cocina-madrid`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/reforma-bano-madrid`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/reformistas`,                   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/registro`,                      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/login`,                         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
  ]
}
