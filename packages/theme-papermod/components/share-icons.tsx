/** @jsxImportSource preact */
/** Port of layouts/_partials/share_icons.html. */
import { h } from "preact";
import {
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
  YCombinatorIcon,
} from "./icons.tsx";

const NETWORKS: Record<string, (u: string, t: string, tags: string) => string> = {
  x: (u, t, tags) => `https://x.com/intent/tweet/?text=${t}&url=${u}&hashtags=${tags}`,
  linkedin: (u, t) => `https://www.linkedin.com/shareArticle?mini=true&url=${u}&title=${t}&summary=${t}&source=${u}`,
  reddit: (u, t) => `https://reddit.com/submit?url=${u}&title=${t}`,
  facebook: (u) => `https://facebook.com/sharer/sharer.php?u=${u}`,
  whatsapp: (u, t) => `https://api.whatsapp.com/send?text=${t}%20-%20${u}`,
  telegram: (u, t) => `https://telegram.me/share/url?text=${t}&url=${u}`,
  ycombinator: (u, t) => `https://news.ycombinator.com/submitlink?t=${t}&u=${u}`,
};

const ICONS: Record<string, () => any> = {
  x: () => <XIcon />,
  linkedin: () => <LinkedinIcon />,
  reddit: () => <RedditIcon />,
  facebook: () => <FacebookIcon />,
  whatsapp: () => <WhatsappIcon />,
  telegram: () => <TelegramIcon />,
  ycombinator: () => <YCombinatorIcon />,
};

export default function ShareIcons({ page, site }: any) {
  const fm = page?.frontmatter ?? {};
  const siteUrl = (site?.url ?? "").replace(/\/$/, "");
  const pageUrl = encodeURIComponent(`${siteUrl}${page?.route ?? "/"}`);
  const title = encodeURIComponent(fm.title ?? "");
  const tags: string[] = fm.taxonomy?.tag ?? fm.taxonomy?.tags ?? [];
  const hashtags = encodeURIComponent(tags.map((t) => t.replace(/\s/g, "")).join(","));
  // Frontmatter `shareButtons: [x, reddit]` narrows the set (upstream ShareButtons param)
  const enabled: string[] = fm.shareButtons ?? Object.keys(NETWORKS);

  return (
    <ul class="share-buttons">
      {enabled.filter((n) => NETWORKS[n]).map((n) => (
        <li key={n}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`share ${fm.title ?? ""} on ${n}`}
            href={NETWORKS[n](pageUrl, title, hashtags)}
          >
            {ICONS[n]()}
          </a>
        </li>
      ))}
    </ul>
  );
}
