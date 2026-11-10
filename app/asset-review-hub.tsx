"use client";

import Link from "next/link";
import { ExternalArrow } from "@/app/external-arrow";
import { useEffect, useMemo, useState } from "react";

type CategoryId =
  | "brand-guide"
  | "logo"
  | "business-cards"
  | "flyer"
  | "social"
  | "website";

type AssetKind =
  | "guide"
  | "logo"
  | "card"
  | "flyer"
  | "instagram-profile"
  | "instagram-post"
  | "instagram-story"
  | "facebook-cover"
  | "website";

type ReviewContext = {
  id: string;
  label: string;
};

type ReviewAsset = {
  id: string;
  title: string;
  category: CategoryId;
  kind: AssetKind;
  thumbnail: string;
  images: string[];
  contexts: ReviewContext[];
  note: string;
  href?: string;
};

const groups: { id: CategoryId; label: string; shortLabel: string }[] = [
  { id: "brand-guide", label: "Brand Guide", shortLabel: "Guide" },
  { id: "logo", label: "Logo", shortLabel: "Logo" },
  { id: "business-cards", label: "Business Cards", shortLabel: "Cards" },
  { id: "flyer", label: "Flyer", shortLabel: "Flyer" },
  { id: "social", label: "Social Media", shortLabel: "Social" },
  { id: "website", label: "Website Concepts", shortLabel: "Websites" },
];

const guidePages = Array.from(
  { length: 8 },
  (_, index) =>
    `/assets/brand-guide/brand-guide-page-${String(index + 1).padStart(2, "0")}.png`,
);

const assets: ReviewAsset[] = [
  {
    id: "brand-guide",
    title: "Brand Guide",
    category: "brand-guide",
    kind: "guide",
    thumbnail: guidePages[0],
    images: guidePages,
    contexts: [
      { id: "reader", label: "Page reader" },
      { id: "booklet", label: "Printed booklet" },
      { id: "tablet", label: "Tablet" },
    ],
    note: "Eight-page guide shown as a reading experience and a printed reference piece.",
  },
  {
    id: "primary-logo",
    title: "Primary Full Color Logo",
    category: "logo",
    kind: "logo",
    thumbnail: "/assets/logo-primary.png",
    images: ["/assets/logo-primary.png"],
    contexts: [{ id: "artwork", label: "Logo artwork" }],
    note: "The full-color mark brings the barber tools, hand and lettering into one emblem.",
  },
  {
    id: "business-card",
    title: "Business Card — Front & Back",
    category: "business-cards",
    kind: "card",
    thumbnail: "/assets/card-front.jpg",
    images: ["/assets/card-front.jpg", "/assets/card-back.jpg"],
    contexts: [{ id: "artwork", label: "Front and back" }],
    note: "A portfolio card pair shows how the mark works at a small print size.",
  },
  {
    id: "mobile-barber-flyer",
    title: "Mobile Barber Letter Flyer",
    category: "flyer",
    kind: "flyer",
    thumbnail: "/assets/flyer.jpg",
    images: ["/assets/flyer.jpg"],
    contexts: [{ id: "artwork", label: "Poster" }],
    note: "A type-led poster pairs the service line with the brand mark.",
  },
  {
    id: "social-profile",
    title: "Social Profile Picture",
    category: "social",
    kind: "instagram-profile",
    thumbnail: "/assets/profile-picture.jpg",
    images: ["/assets/profile-picture.jpg"],
    contexts: [
      { id: "platform", label: "Instagram profile" },
      { id: "artwork", label: "Artwork" },
    ],
    note: "The monogram remains readable at profile-image size.",
  },
  {
    id: "instagram-post",
    title: "Instagram Post",
    category: "social",
    kind: "instagram-post",
    thumbnail: "/assets/instagram-post.jpg",
    images: ["/assets/instagram-post.jpg"],
    contexts: [
      { id: "platform", label: "Instagram feed" },
      { id: "artwork", label: "Artwork" },
    ],
    note: "Feed placement uses the exported portrait post at its intended ratio.",
  },
  {
    id: "instagram-story",
    title: "Instagram Story",
    category: "social",
    kind: "instagram-story",
    thumbnail: "/assets/instagram-story.jpg",
    images: ["/assets/instagram-story.jpg"],
    contexts: [
      { id: "platform", label: "Story viewer" },
      { id: "artwork", label: "Artwork" },
    ],
    note: "Full-screen 9:16 story placement with platform-safe framing.",
  },
  {
    id: "facebook-cover",
    title: "Facebook Cover",
    category: "social",
    kind: "facebook-cover",
    thumbnail: "/assets/facebook-cover.jpg",
    images: ["/assets/facebook-cover.jpg"],
    contexts: [
      { id: "platform", label: "Facebook page" },
      { id: "mobile", label: "Mobile crop" },
      { id: "artwork", label: "Artwork" },
    ],
    note: "Desktop and mobile contexts help check the profile-image overlap and safe crop.",
  },
  {
    id: "editorial-concierge",
    title: "Website 01 — Editorial Concierge",
    category: "website",
    kind: "website",
    thumbnail: "/assets/concept-editorial.png",
    images: ["/assets/concept-editorial.png"],
    contexts: [],
    note: "Asymmetric, premium, and editorial. Recommended starting direction.",
    href: "/concepts/editorial-concierge",
  },
  {
    id: "doorstep-journey",
    title: "Website 02 — Doorstep Journey",
    category: "website",
    kind: "website",
    thumbnail: "/assets/concept-doorstep.png",
    images: ["/assets/concept-doorstep.png"],
    contexts: [],
    note: "A centered, guided story focused on the three-step mobile experience.",
    href: "/concepts/doorstep-journey",
  },
  {
    id: "modern-heritage",
    title: "Website 03 — Modern Heritage",
    category: "website",
    kind: "website",
    thumbnail: "/assets/concept-heritage.png",
    images: ["/assets/concept-heritage.png"],
    contexts: [],
    note: "A warm-white, document-like direction with extra policy clarity.",
    href: "/concepts/modern-heritage",
  },
];

function ArrowIcon() {
  return <span aria-hidden="true"><ExternalArrow /></span>;
}

function GridIcon() {
  return <span className="view-icon" aria-hidden="true">▦</span>;
}

function ListIcon() {
  return <span className="view-icon" aria-hidden="true">☷</span>;
}

export function AssetReviewHub() {
  const [view, setView] = useState<"gallery" | "list">("gallery");
  const [filter, setFilter] = useState<"all" | CategoryId>("all");
  const [activeAsset, setActiveAsset] = useState<ReviewAsset | null>(null);
  const [activeContext, setActiveContext] = useState("");
  const [guidePage, setGuidePage] = useState(0);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("serens-review-view");
      if (saved === "gallery" || saved === "list") setView(saved);
      const assetId = window.location.hash.replace("#asset-", "");
      const linkedAsset = assets.find((asset) => asset.id === assetId);
      if (linkedAsset && linkedAsset.kind !== "website") openAsset(linkedAsset, false);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!activeAsset) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeAsset();
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeAsset]);

  const visibleGroups = useMemo(
    () => groups.filter((group) => filter === "all" || group.id === filter),
    [filter],
  );

  function chooseView(nextView: "gallery" | "list") {
    setView(nextView);
    window.localStorage.setItem("serens-review-view", nextView);
  }

  function openAsset(asset: ReviewAsset, updateHistory = true) {
    setActiveAsset(asset);
    setActiveContext(asset.contexts[0]?.id ?? "artwork");
    setGuidePage(0);
    if (updateHistory) window.history.pushState(null, "", `#asset-${asset.id}`);
  }

  function closeAsset() {
    setActiveAsset(null);
    if (window.location.hash.startsWith("#asset-")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  }

  return (
    <main className="review-site">
      <div className="proof-strip">Portfolio edition · Design gallery</div>

      <header className="review-header">
        <a className="review-brand" href="#top" aria-label="Seren's Fades asset review home">
          <img src="/assets/logo-monogram.png" alt="" />
          <span>
            <strong>Seren&apos;s Fades</strong>
            <small>Asset review</small>
          </span>
        </a>
        <a className="header-link" href="#website-concepts">
          Explore website concepts <ArrowIcon />
        </a>
      </header>

      <section className="review-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A simpler way to review</p>
          <h1>See every idea<br />where it will live.</h1>
          <p className="hero-lede">
            Browse the core brand assets, then open any piece to see it in a real-world
            setting. The three website directions are fully navigable demos.
          </p>
        </div>
        <div className="hero-summary" aria-label="Review site summary">
          <div><strong>11</strong><span>review assets</span></div>
          <div><strong>6</strong><span>clear groups</span></div>
          <div><strong>3</strong><span>live website demos</span></div>
          <p>Explore the identity across print, social layouts, and the responsive website.</p>
        </div>
      </section>

      <section className="review-controls" aria-label="Asset view controls">
        <div className="category-filters" aria-label="Filter assets by category">
          <button className={filter === "all" ? "is-active" : ""} onClick={() => setFilter("all")}>All assets</button>
          {groups.map((group) => (
            <button
              key={group.id}
              className={filter === group.id ? "is-active" : ""}
              onClick={() => setFilter(group.id)}
            >
              {group.shortLabel}
            </button>
          ))}
        </div>
        <div className="view-switch" aria-label="Choose asset view">
          <button
            className={view === "gallery" ? "is-active" : ""}
            onClick={() => chooseView("gallery")}
            aria-pressed={view === "gallery"}
          >
            <GridIcon /> Gallery
          </button>
          <button
            className={view === "list" ? "is-active" : ""}
            onClick={() => chooseView("list")}
            aria-pressed={view === "list"}
          >
            <ListIcon /> List
          </button>
        </div>
      </section>

      <section className={`asset-groups view-${view}`} aria-live="polite">
        {visibleGroups.map((group) => {
          const groupedAssets = assets.filter((asset) => asset.category === group.id);
          return (
            <section className="asset-group" id={group.id === "website" ? "website-concepts" : undefined} key={group.id}>
              <div className="group-heading">
                <h2>{group.label}</h2>
                <span>{String(groupedAssets.length).padStart(2, "0")}</span>
              </div>
              <div className="asset-collection">
                {groupedAssets.map((asset) => {
                  const content = (
                    <>
                      {view === "gallery" && (
                        <span className={`asset-preview asset-preview--${asset.kind}`}>
                          <img src={asset.thumbnail} alt="" />
                          {asset.kind === "website" && <span className="demo-chip">Live demo <ArrowIcon /></span>}
                        </span>
                      )}
                      <span className="asset-name">{asset.title}</span>
                    </>
                  );

                  return asset.href ? (
                    <a className="asset-card" href={asset.href} key={asset.id}>
                      {content}
                    </a>
                  ) : (
                    <button className="asset-card" onClick={() => openAsset(asset)} key={asset.id}>
                      {content}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </section>

      <footer className="review-footer">
        <img src="/assets/logo-monogram.png" alt="Seren's Fades monogram" />
        <p>Seren’s Fades · Design portfolio</p>
        <Link href="/">View homepage <ArrowIcon /></Link>
      </footer>

      {activeAsset && (
        <AssetModal
          asset={activeAsset}
          activeContext={activeContext}
          setActiveContext={setActiveContext}
          guidePage={guidePage}
          setGuidePage={setGuidePage}
          onClose={closeAsset}
        />
      )}
    </main>
  );
}

function AssetModal({
  asset,
  activeContext,
  setActiveContext,
  guidePage,
  setGuidePage,
  onClose,
}: {
  asset: ReviewAsset;
  activeContext: string;
  setActiveContext: (context: string) => void;
  guidePage: number;
  setGuidePage: (page: number) => void;
  onClose: () => void;
}) {
  const category = groups.find((group) => group.id === asset.category)?.label;

  return (
    <div className="asset-modal" role="dialog" aria-modal="true" aria-labelledby="asset-modal-title">
      <div className="modal-topbar">
        <button className="back-button" onClick={onClose}>← Back to assets</button>
        <span>Application visualization</span>
        <button className="close-button" onClick={onClose} aria-label="Close asset viewer">×</button>
      </div>
      <div className="modal-heading">
        <div>
          <p className="eyebrow">{category}</p>
          <h2 id="asset-modal-title">{asset.title}</h2>
        </div>
        <p>{asset.note}</p>
      </div>
      <div className="context-tabs" role="tablist" aria-label="Preview context">
        {asset.contexts.map((context) => (
          <button
            key={context.id}
            role="tab"
            aria-selected={activeContext === context.id}
            className={activeContext === context.id ? "is-active" : ""}
            onClick={() => setActiveContext(context.id)}
          >
            {context.label}
          </button>
        ))}
      </div>
      <div className="environment-stage">
        <EnvironmentScene
          asset={asset}
          context={activeContext}
          guidePage={guidePage}
        />
      </div>
      {asset.kind === "guide" && (
        <div className="guide-pages" aria-label="Brand guide pages">
          {asset.images.map((image, index) => (
            <button
              key={image}
              className={guidePage === index ? "is-active" : ""}
              onClick={() => setGuidePage(index)}
              aria-label={`View brand guide page ${index + 1}`}
            >
              <img src={image} alt="" />
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function EnvironmentScene({ asset, context, guidePage }: { asset: ReviewAsset; context: string; guidePage: number }) {
  if (asset.kind === "guide") {
    const current = asset.images[guidePage];
    if (context === "booklet") {
      const next = asset.images[Math.min(guidePage + 1, asset.images.length - 1)];
      return (
        <div className="scene scene-booklet">
          <div className="desk-note">Printed reference · Letter size</div>
          <div className="booklet-spread"><img src={current} alt={`Brand guide page ${guidePage + 1}`} /><img src={next} alt={`Brand guide page ${Math.min(guidePage + 2, asset.images.length)}`} /></div>
          <div className="desk-pencil" />
        </div>
      );
    }
    if (context === "tablet") {
      return <div className="scene scene-tablet"><div className="tablet"><div className="tablet-camera" /><img src={current} alt={`Brand guide page ${guidePage + 1}`} /></div></div>;
    }
    return <div className="scene scene-reader"><img src={current} alt={`Brand guide page ${guidePage + 1}`} /></div>;
  }

  if (asset.kind === "logo") {
    return <ArtworkScene src={asset.images[0]} alt="Seren's Fades primary full color logo artwork" contain />;
  }

  if (asset.kind === "card") {
    return <div className="scene scene-card-artwork"><img src={asset.images[0]} alt="Business card front artwork" /><img src={asset.images[1]} alt="Business card back artwork" /></div>;
  }

  if (asset.kind === "flyer") {
    return <ArtworkScene src={asset.images[0]} alt="Seren's Fades flyer artwork" />;
  }

  if (asset.kind === "instagram-profile") {
    if (context === "platform") return <InstagramProfileScene src={asset.images[0]} />;
    return <ArtworkScene src={asset.images[0]} alt="Instagram profile artwork" contain />;
  }

  if (asset.kind === "instagram-post") {
    if (context === "platform") return <InstagramPostScene src={asset.images[0]} />;
    return <ArtworkScene src={asset.images[0]} alt="Instagram post artwork" />;
  }

  if (asset.kind === "instagram-story") {
    if (context === "platform") return <InstagramStoryScene src={asset.images[0]} />;
    return <ArtworkScene src={asset.images[0]} alt="Instagram story artwork" />;
  }

  if (asset.kind === "facebook-cover") {
    if (context === "platform" || context === "mobile") return <FacebookScene src={asset.images[0]} mobile={context === "mobile"} />;
    return <ArtworkScene src={asset.images[0]} alt="Facebook cover artwork" contain />;
  }

  return null;
}

function ArtworkScene({ src, alt, contain = false }: { src: string; alt: string; contain?: boolean }) {
  return <div className={`scene scene-artwork ${contain ? "is-contained" : ""}`}><img src={src} alt={alt} /></div>;
}

function InstagramProfileScene({ src }: { src: string }) {
  return (
    <div className="scene social-stage"><div className="phone-shell profile-shell">
      <div className="phone-status"><span>9:41</span><span>● ● ▰</span></div>
      <div className="social-nav"><strong>Seren’s Fades</strong><span>•••</span></div>
      <div className="profile-row"><img src={src} alt="Seren's Fades Instagram profile image" /><div><strong>Seren&apos;s Fades</strong><span>Mobile barber · DFW</span><span>Premium fades. Wherever you are.</span></div></div>
      <div className="profile-actions"><span>Following</span><span>Message</span></div>
      <div className="profile-tabs"><span>▦</span><span>▢</span></div>
      <div className="profile-grid"><img src="/assets/instagram-post.jpg" alt="" /><div /><div /></div>
    </div></div>
  );
}

function InstagramPostScene({ src }: { src: string }) {
  return (
    <div className="scene social-stage"><div className="feed-shell">
      <div className="feed-header"><img src="/assets/profile-picture.jpg" alt="" /><div><strong>Seren’s Fades</strong><span>Dallas–Fort Worth</span></div><b>•••</b></div>
      <img className="feed-image" src={src} alt="Seren's Fades Instagram post in a feed" />
      <div className="feed-actions"><span>♡</span><span>◯</span><span>⌁</span><span>▢</span></div>
      <p><strong>Seren’s Fades</strong> Premium mobile fades, brought to you.</p>
    </div></div>
  );
}

function InstagramStoryScene({ src }: { src: string }) {
  return (
    <div className="scene social-stage"><div className="story-shell">
      <img src={src} alt="Seren's Fades Instagram story in the story viewer" />
      <div className="story-progress"><i /><i /><i /></div>
      <div className="story-user"><img src="/assets/profile-picture.jpg" alt="" /><span>Seren’s Fades</span><small>Now</small></div>
      <div className="story-reply">Send message…</div>
    </div></div>
  );
}

function FacebookScene({ src, mobile }: { src: string; mobile: boolean }) {
  return (
    <div className={`scene social-stage facebook-stage ${mobile ? "is-mobile" : ""}`}>
      <div className="facebook-shell">
        <div className="facebook-top"><strong>facebook</strong><span>⌕　◯</span></div>
        <div className="facebook-cover"><img src={src} alt="Seren's Fades Facebook cover in a page header" /></div>
        <img className="facebook-avatar" src="/assets/profile-picture.jpg" alt="" />
        <div className="facebook-title"><strong>Seren&apos;s Fades</strong><span>Mobile barber · Dallas–Fort Worth</span></div>
        <div className="facebook-actions"><span>Follow</span><span>Message</span><span>•••</span></div>
      </div>
    </div>
  );
}
