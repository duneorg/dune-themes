/** @jsxImportSource preact */
/** Port of layouts/_partials/social_icons.html. Icons come from a
 * `social: [{ name, url, title? }]` list in page frontmatter (upstream
 * reads site.Params.socialIcons). Unknown names render as a text link. */
import { h } from "preact";
import { GithubIcon, LinkedinIcon, RssIcon, XIcon } from "./icons.tsx";

const ICONS: Record<string, () => any> = {
  github: () => <GithubIcon />,
  x: () => <XIcon />,
  twitter: () => <XIcon />,
  linkedin: () => <LinkedinIcon />,
  rss: () => <RssIcon height={30} />,
};

export default function SocialIcons({ social, align }: any) {
  if (!social?.length) return null;
  return (
    <div class="social-icons" {...(align ? { align } : {})}>
      {social.map((s: any) => (
        <a
          key={s.url}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer me"
          title={s.title ?? s.name}
        >
          {ICONS[s.name?.toLowerCase()]?.() ?? <span>{s.name}</span>}
        </a>
      ))}
    </div>
  );
}
