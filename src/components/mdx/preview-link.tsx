import Link from "next/link";
import Image from "next/image";

const previewMap: Record<string, string> = {
  // Project Previews
  "/projects/kodasync": "/projects/kodasync/kodasync-cover.webp",
  "/projects/subvantage": "/projects/subvantage/subvantage-cover.webp",
  "/projects/grit": "/projects/grit/grit-cover.webp",
  "/projects/climaph": "/projects/climaph/climaph-cover.webp",
  "/projects/ac-core": "/projects/ac-core/accore-cover.webp",
  "/projects/kusinago": "/projects/kusinago/kusinago-cover.webp",
  "/projects/mamars": "/projects/mamars/mamars-cover.webp",
  "/projects/movieloom": "/projects/movieloom/movieloom-cover.webp",
  "/projects/thryve": "/projects/thryve/thryve-cover.webp",

  // Blog Previews: Architecting Lazada
  "https://www.credly.com/badges/96846437-3bb4-48cd-95f2-a9b4540fb83e/public_url": "/blog/architecting-lazada/aws-badge-preview.webp",
  
  // Blog Previews: AC-Core Insights
  "https://github.com/MMPA-Works": "/blog/ac-core-insights/mmpa-works-preview.webp",
  
  // Blog Previews: Better Bacolod
  "https://bettergov.ph/": "/blog/better-bacolod/better-gov-preview.webp",
  "https://betterbacolod.org/": "/blog/better-bacolod/better-bacolod-preview.webp",
  
  // Blog Previews: Academic Reality Check
  "https://gsap.com/": "/blog/academic-reality-check/gsap-preview.webp",
  "https://www.reactbits.dev/": "/blog/academic-reality-check/react-bits-preview.webp",
  "https://www.hau.edu.ph/": "/blog/academic-reality-check/hau-preview.webp",

  // Resume Preview
  "/resume": "preview-links/resume-preview-image.webp",
};

export const CustomLink = ({ href, children, ...props }: any) => {
  const isInternal = href && href.startsWith("/");
  const previewImage = previewMap[href];

  if (previewImage) {
    return (
      <span className="relative inline-block group cursor-pointer font-sans">
        <Link 
          href={href} 
          target={isInternal ? undefined : "_blank"}
          rel={isInternal ? undefined : "noopener noreferrer"}
          className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium"
          {...props}
        >
          {children}
        </Link>
        
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-50 rounded-xl overflow-hidden shadow-2xl border border-border/50 flex flex-col leading-none text-[0px] bg-transparent">
          <Image 
            src={previewImage} 
            alt={`Preview of ${href}`} 
            width={1920} 
            height={1080} 
            className="w-full h-auto block m-0 p-0" 
            priority
          />
        </span>
      </span>
    );
  }

  if (isInternal) {
    return (
      <Link 
        href={href} 
        className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium font-sans"
        {...props}
      >
        {children}
      </Link>
    );
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors font-medium font-sans"
      {...props}
    >
      {children}
    </a>
  );
};