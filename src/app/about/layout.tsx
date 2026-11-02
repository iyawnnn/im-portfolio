import { JsonLd } from "@/components/json-ld";
import { PERSON_ID, absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: "Learn about Ian Macabulos, a full-stack developer and Information Technology student in the Philippines, his background, approach to software, and the work he cares about.",
  path: "/about",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": `${absoluteUrl("/about")}#profile`,
          url: absoluteUrl("/about"),
          name: "About Ian Macabulos",
          mainEntity: { "@id": PERSON_ID },
        }}
      />
      {children}
    </>
  );
}
