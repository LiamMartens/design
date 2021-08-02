import Head from 'next/head'
import {imageUrlBuilder} from '$sanity'

export function SEO({seo, title}: {seo: any; title: any}) {
  // 1200x630
  const ogImage =
    seo?.og?.image && imageUrlBuilder.image(seo?.og?.image).width(1200).height(630).url()

  return (
    <Head>
      {/* Twitter */}
      <meta name="twitter:card" content={seo?.twitter?.cardType || 'summary_large_image'} />

      {/* OpenGraph */}
      <meta property="og:type" content={seo?.og?.type || 'website'} />
      <meta property="og:title" content={seo?.og?.title || title || 'Sanity UI'} />
      <meta
        property="og:description"
        content={seo?.og?.description || 'An ergonomic toolkit to design with code.'}
      />

      {ogImage && <meta property="og:image" content={ogImage} />}
    </Head>
  )
}
