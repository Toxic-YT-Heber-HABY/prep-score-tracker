import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. "/guide"
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({ title, description, path, jsonLd }: SEOProps) => {
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={path} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={path} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(b)}</script>
      ))}
    </Helmet>
  );
};

export default SEO;
