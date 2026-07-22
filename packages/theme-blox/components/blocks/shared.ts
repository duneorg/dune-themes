/** Shared helpers for landing-page block modules. */
import type { TemplateProps } from "@dune/core/content/types";
import { str } from "../../utils/blox.ts";

export interface BlockDef {
  block: string;
  id?: string;
  content?: Record<string, unknown>;
  design?: Record<string, unknown>;
}

export interface BlockContext {
  props: TemplateProps;
  t: (k: string) => string;
}

export interface AuthorProfile {
  name?: { display?: string; pronunciation?: string; pronouns?: string } | string;
  status?: { icon?: string };
  role?: string;
  bio?: string;
  avatar?: string;
  affiliations?: Array<{ name?: string; url?: string } | string>;
  links?: Array<{ icon?: string; url?: string; label?: string }>;
  interests?: string[];
  education?: Array<Record<string, unknown>>;
  experience?: Array<Record<string, unknown>>;
  skills?: Array<Record<string, unknown>>;
  languages?: Array<Record<string, unknown>>;
  awards?: Array<Record<string, unknown>>;
}

export function profileOf(content: Record<string, unknown>): AuthorProfile {
  const a = content.author;
  return (a && typeof a === "object" ? a : {}) as AuthorProfile;
}

export function profileName(
  p: AuthorProfile,
): { display: string; pronunciation: string; pronouns: string } {
  if (typeof p.name === "string") return { display: p.name, pronunciation: "", pronouns: "" };
  return {
    display: str(p.name?.display),
    pronunciation: str(p.name?.pronunciation),
    pronouns: str(p.name?.pronouns),
  };
}

/** Coerce content.items into an array of maps. */
export function contentItems(content: Record<string, unknown>): Array<Record<string, unknown>> {
  const raw = content.items;
  if (Array.isArray(raw)) {
    return raw.filter((x): x is Record<string, unknown> => !!x && typeof x === "object");
  }
  if (raw && typeof raw === "object") return [raw as Record<string, unknown>];
  return [];
}
