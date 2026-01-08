import { Helmet } from 'react-helmet-async';
import { APP } from '../../constants/app.constants';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}

export const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: SEOProps) => {
  const siteTitle = APP.NAME;
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || "Enterprise Admin Dashboard Kit";
  const metaKeywords = keywords?.join(', ') || "admin, dashboard, react, typescript";
  const metaImage = image || "/og-image.jpg"; // Default OG Image
  const metaUrl = url || window.location.href;

  return (
    <Helmet>
      {/* Basic Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Canonical */}
      <link rel="canonical" href={metaUrl} />
    </Helmet>
  );
};
