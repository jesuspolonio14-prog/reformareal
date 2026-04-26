import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://reformareal.com'
  return [
    { url: base,                    lastModified: new Date(), changeFrequency: 'weekly',  priority: 1 },
    { url: `${base}/reformistas`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/registro`,      lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/login`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]
}
