import Link from "next/link";

type ConceptVariant = "editorial" | "journey" | "heritage";

const services = [
  { name: "Men's Fade", price: "$45", detail: "Precision fade shaped to your preferred finish." },
  { name: "Beard Trim", price: "$20", detail: "A clean trim and line refinement." },
  { name: "Line Up", price: "$20", detail: "Crisp edges and a polished outline." },
  { name: "Kids Fade", price: "$15", detail: "For children age 12 and under." },
  { name: "Combo — Fade + Beard", price: "$60", detail: "A coordinated fade and beard service." },
];

const concepts = [
  { slug: "editorial-concierge", label: "01 Editorial", variant: "editorial" },
  { slug: "doorstep-journey", label: "02 Journey", variant: "journey" },
  { slug: "modern-heritage", label: "03 Heritage", variant: "heritage" },
] as const;

const conceptDetails: Record<ConceptVariant, { number: string; name: string; kicker: string; intro: string }> = {
  editorial: {
    number: "01",
    name: "Editorial Concierge",
    kicker: "Premium service, edited to the essentials.",
    intro: "An asymmetric, high-contrast direction that moves quickly from the promise to the service menu.",
  },
  journey: {
    number: "02",
    name: "Doorstep Journey",
    kicker: "The barbershop experience, brought to you.",
    intro: "A centered, guided experience that makes the mobile service model easy to understand in three steps.",
  },
  heritage: {
    number: "03",
    name: "Modern Heritage",
    kicker: "Classic craft. Modern convenience.",
    intro: "A warm, editorial direction that gives service area, travel, and policies more room to breathe.",
  },
};

export function ConceptDemo({
  variant,
  presentation = "review",
}: {
  variant: ConceptVariant;
  presentation?: "review" | "published";
}) {
  const details = conceptDetails[variant];
  const isPublished = presentation === "published";

  return (
    <main className={`concept concept--${variant}${isPublished ? " concept--published" : ""}`}>
      {!isPublished && (
        <>
          <div className="concept-proof">Website design study · Portfolio edition</div>
          <div className="concept-review-nav">
            <Link href="/design-review/#website-concepts">← Design gallery</Link>
            <span>{details.number} / 03</span>
            <nav aria-label="Switch website concept">
              {concepts.map((concept) => (
                <Link
                  href={`/concepts/${concept.slug}`}
                  className={concept.variant === variant ? "is-active" : ""}
                  key={concept.slug}
                >
                  {concept.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}

      <header className="concept-header" id="home">
        <a className="concept-mark" href="#home">
          <img src={variant === "heritage" ? "/assets/logo-black.png" : "/assets/logo-monogram.png"} alt="" />
          <span>Seren&apos;s Fades</span>
        </a>
        <nav className="concept-desktop-nav" aria-label={isPublished ? "Primary navigation" : "Concept site navigation"}>
          <a href="#services">Services</a>
          <a href="#how-it-works">How it works</a>
          <a href="#travel">Travel</a>
          <a href="#policies">Policies</a>
          <a href="#contact">Design gallery</a>
        </nav>
        <details className="concept-mobile-nav">
          <summary>Menu</summary>
          <div>
            <a href="#services">Services</a>
            <a href="#how-it-works">How it works</a>
            <a href="#travel">Travel</a>
            <a href="#policies">Policies</a>
            <a href="#contact">Design gallery</a>
          </div>
        </details>
      </header>

      {variant === "heritage" && (
        <aside className="concept-index" aria-label="Section index">
          <span>Index</span>
          <a href="#home">01</a>
          <a href="#services">02</a>
          <a href="#how-it-works">03</a>
          <a href="#travel">04</a>
          <a href="#policies">05</a>
        </aside>
      )}

      <section className="concept-hero">
        <div className="concept-hero-logo">
          <img
            src={variant === "heritage" ? "/assets/logo-black.png" : "/assets/logo-primary.png"}
            alt="Seren's Fades"
          />
        </div>
        <div className="concept-hero-copy">
          <p className="concept-eyebrow">Mobile barber · Dallas–Fort Worth</p>
          <h1>{variant === "journey" ? "The barbershop experience, brought to you." : "Premium mobile fades, brought to you."}</h1>
          <p>{isPublished ? details.kicker : details.intro}</p>
          <div className="concept-actions">
            <a className="concept-primary" href="#services">View services ↓</a>
            <a className="concept-secondary" href="#how-it-works">How it works ↓</a>
          </div>
          
        </div>
      </section>

      <section className="concept-services" id="services">
        <div className="concept-section-heading">
          <p>{details.number} · Services</p>
          <h2>Choose your service.</h2>
          <span>Illustrative service menu</span>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <details key={service.name} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{service.name}</strong>
                <b>{service.price}</b>
              </summary>
              <p>{service.detail}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="concept-process" id="how-it-works">
        <div className="concept-section-heading">
          <p>How it works</p>
          <h2>{variant === "journey" ? "Three clear steps to your doorstep." : "A simple mobile experience."}</h2>
        </div>
        <div className="process-track" aria-label="Mobile barber service process">
          <article><span>01</span><h3>Choose a service</h3><p>Review the service menu and select the best fit.</p></article>
          <article><span>02</span><h3>Confirm your location</h3><p>Travel details and any additional fee are agreed in advance.</p></article>
          <article><span>03</span><h3>Confirm the details</h3><p>Confirm the appointment time and the space needed for the service.</p></article>
        </div>
      </section>

      <section className="concept-details" id="travel">
        <article>
          <p className="concept-eyebrow">Service area</p>
          <h2>Mobile service in Dallas–Fort Worth.</h2>
          <p>The appointment flow includes a location check so travel can be discussed before a visit.</p>
          <div className="distance-scale"><i /><i /><i /><i /><i /></div>
        </article>
        <article id="policies">
          <p className="concept-eyebrow">Visit planning</p>
          <h2>Clear expectations, confirmed in advance.</h2>
          <details open><summary>Travel</summary><p>Confirm the service area and any travel fee when planning a visit.</p></details>
          <details><summary>Rescheduling</summary><p>Discuss timing changes before the visit.</p></details>
          <details><summary>Work area</summary><p>Check the available workspace when arranging a mobile service.</p></details>
        </article>
      </section>

      <section className="concept-contact" id="contact">
        <img src="/assets/logo-monogram.png" alt="" />
        <div>
          <p className="concept-eyebrow">Portfolio preview</p>
          <h2>See the design behind the service.</h2>
          <p>Explore the identity, print formats, and alternative layouts in the design gallery.</p>
        </div>
        <div className="contact-links"><Link href="/design-review/">Open design gallery ↗</Link></div>
      </section>

      <footer className="concept-footer">
        <span>{isPublished ? "Seren's Fades" : details.name}</span>
        <strong>Mobile barber · Dallas–Fort Worth</strong>
        <Link href="/design-review/#website-concepts">Compare website directions ↑</Link>
      </footer>
    </main>
  );
}
