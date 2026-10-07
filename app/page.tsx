import { ArrowRight, Check, MapPin, Mail, Phone } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { services } from "@/lib/site-content";
import { EnquiryForm, LandingFaq } from "@/components/landing-interactions";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/stage.jpeg"
            alt="An outdoor stage with lighting, speaker arrays and seating during setup"
            width="2560"
            height="1183"
            fetchPriority="high"
          />
          <div className="hero-shade" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <span />
                SAUDI ARABIA & UNITED ARAB EMIRATES
              </p>
              <h1 id="hero-title">
                Event crew &<br />
                site support.
              </h1>
              <p className="hero-description">
                The people behind your production. Crew support for event
                builds, live operations and breakdowns across the Gulf.
              </p>
              <div className="actions">
                <a className="button button-gold" href="#enquiry">
                  Discuss your project <ArrowRight size={19} />
                </a>
                <a className="button button-outline-light" href="#services">
                  Explore services <ArrowRight size={19} />
                </a>
              </div>
            </div>
            <div className="hero-caption">
              <span>FROM THE FIRST BUILD TO THE FINAL STRIKE</span>
              <p>On the ground. Behind the scenes.</p>
            </div>
          </div>
        </section>
        <div className="fact-band">
          <div className="container facts">
            <div>
              <MapPin />
              <p>
                <strong>Saudi Arabia & UAE</strong>
                <span>Regional crew support</span>
              </p>
            </div>
            <div>
              <Check />
              <p>
                <strong>Build. Operate. Dismantle.</strong>
                <span>Support across your event schedule</span>
              </p>
            </div>
            <a href="#enquiry">
              <p>
                <strong>One project brief</strong>
                <span>Start with your scope and dates</span>
              </p>
              <ArrowRight />
            </a>
          </div>
        </div>
        <section className="section container" id="services">
          <div className="section-heading">
            <div>
              <p className="eyebrow blue">Crew services</p>
              <h2>
                The right support.
                <br />
                At every stage.
              </h2>
            </div>
            <div className="heading-aside">
              <p>
                From general event crew to specialist build teams, find the
                support your production needs.
              </p>
              <a className="text-link" href="/services/">
                All crew services <ArrowRight size={18} />
              </a>
            </div>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <a
                key={service.slug}
                className="service-item"
                href={`/${service.slug}/`}
              >
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <span className="service-scope">{service.scope}</span>
                </div>
                <ArrowRight className="service-arrow" size={22} />
              </a>
            ))}
          </div>
        </section>
        <section className="work-band" id="work">
          <div className="container section">
            <div className="section-heading">
              <div>
                <p className="eyebrow blue">On the ground</p>
                <h2>
                  Behind every event,
                  <br />
                  there is a build.
                </h2>
              </div>
              <div className="heading-aside">
                <p>
                  A closer look at the environments our crews support, from
                  production stages to temporary site infrastructure.
                </p>
              </div>
            </div>
            <div className="work-grid">
              <a href="/stage-production-crew/" className="work-item">
                <div className="work-image">
                  <img
                    src="/images/stage.jpeg"
                    width="2560"
                    height="1183"
                    alt="Production stage with speaker arrays and lighting infrastructure"
                    loading="lazy"
                  />
                <span>Production support</span>
                </div>
                <div className="work-label">
                  <div>
                    <h3>Stage & production</h3>
                    <p>Assembly, on-site support and strike</p>
                  </div>
                  <ArrowRight size={24} />
                </div>
              </a>
              <a href="/scaffolder/" className="work-item">
                <div className="work-image">
                  <img
                    src="/images/scaffolding.jpeg"
                    width="2560"
                    height="1183"
                    alt="Workers assembling a large scaffold structure at an outdoor event site"
                    loading="lazy"
                  />
                <span>Site infrastructure</span>
                </div>
                <div className="work-label">
                  <div>
                    <h3>Scaffolding & site works</h3>
                    <p>Temporary infrastructure and build support</p>
                  </div>
                  <ArrowRight size={24} />
                </div>
              </a>
            </div>
          </div>
        </section>
        <section className="section container process-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow blue">How we work</p>
              <h2>Clear scope. Coordinated delivery.</h2>
            </div>
            <div className="heading-aside">
              <p>
                Tell us what you are building. We will discuss the crew
                requirements around your site, tasks and timeline.
              </p>
            </div>
          </div>
          <ol className="process-grid">
            {[
              [
                "Share your brief",
                "Location, event dates, build schedule and the tasks you need covered.",
              ],
              [
                "Define the crew",
                "Discuss crew types, team size, shifts and site access requirements.",
              ],
              [
                "Coordinate the site",
                "Align reporting arrangements, induction and the working schedule.",
              ],
              [
                "Complete the scope",
                "Plan support across setup, operations and the final breakdown.",
              ],
            ].map(([title, description], index) => (
              <li key={title}>
                <span className="step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>
        <section className="team-band">
          <div className="container team-grid">
            <div className="team-image">
              <img
                src="/images/team.jpeg"
                width="1057"
                height="883"
                alt="Plus Point crew members wearing their blue uniforms"
                loading="lazy"
              />
            </div>
            <div className="team-copy">
              <p className="eyebrow blue">Our team</p>
              <h2>
                A practical partner
                <br />
                for your event team.
              </h2>
              <p>
                Plus Point Gulf provides event crew and specialist site support
                in Saudi Arabia and the United Arab Emirates.
              </p>
              <p>
                We work with the people managing the build: event organisers,
                production teams and site contractors.
              </p>
              <dl className="team-details">
                <div>
                  <dt>General event crew</dt>
                  <dd>Hands-on setup and operational support</dd>
                </div>
                <div>
                  <dt>Specialist site support</dt>
                  <dd>Stage, structure, scaffolding and carpentry crews</dd>
                </div>
              </dl>
              <a className="text-link" href="/about-us/">
                About Plus Point Gulf <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section className="section container regional-section" id="contact">
          <div className="section-heading">
            <div>
              <p className="eyebrow blue">Regional contacts</p>
              <h2>
                Local conversation.
                <br />
                Gulf-wide coordination.
              </h2>
            </div>
            <div className="heading-aside">
              <p>
                Discuss your location and crew requirements with our Saudi
                Arabia or UAE contact.
              </p>
            </div>
          </div>
          <div className="contact-grid">
            <div className="region">
              <div className="region-title">
                <MapPin size={23} />
                <div>
                  <span>SAUDI ARABIA</span>
                  <h3>Riyadh</h3>
                </div>
                <span className="region-code">KSA</span>
              </div>
              <a className="phone-link" href="tel:+966540560097">
                <Phone size={19} />
                +966 54 056 0097
              </a>
              <a
                className="region-email"
                href="mailto:tasneem@pluspointgulf.com"
              >
                <Mail size={17} />
                tasneem@pluspointgulf.com
              </a>
            </div>
            <div className="region">
              <div className="region-title">
                <MapPin size={23} />
                <div>
                  <span>UNITED ARAB EMIRATES</span>
                  <h3>Dubai</h3>
                </div>
                <span className="region-code">UAE</span>
              </div>
              <a className="phone-link" href="tel:+971565388457">
                <Phone size={19} />
                +971 56 538 8457
              </a>
              <a
                className="region-email"
                href="mailto:Operations@pluspointgulf.com"
              >
                <Mail size={17} />
                Operations@pluspointgulf.com
              </a>
            </div>
          </div>
        </section>
        <section className="faq-band">
          <div className="container section faq-grid">
            <div>
              <p className="eyebrow blue">Common questions</p>
              <h2>
                A few practical
                <br />
                questions.
              </h2>
              <p>Need to discuss a specific site or scope?</p>
              <a className="text-link" href="#enquiry">
                Talk to the team <ArrowRight size={18} />
              </a>
            </div>
            <LandingFaq />
          </div>
        </section>
        <section className="section container enquiry-grid" id="enquiry">
          <div className="enquiry-copy">
            <p className="eyebrow blue">Project enquiry</p>
            <h2>
              Your next event
              <br />
              starts with a brief.
            </h2>
            <p>
              Share the location, dates and support you need. We can then
              discuss the right crew for your scope.
            </p>
            <div className="brief-checklist">
              <h3>Useful details to include</h3>
              <ul>
                <li>
                  <Check size={17} />
                  Build, show and breakdown dates
                </li>
                <li>
                  <Check size={17} />
                  Crew roles and estimated headcount
                </li>
                <li>
                  <Check size={17} />
                  Shift times and site access details
                </li>
              </ul>
            </div>
            <a
              className="enquiry-email"
              href="mailto:Operations@pluspointgulf.com"
            >
              <Mail size={19} />
              Operations@pluspointgulf.com
            </a>
          </div>
          <EnquiryForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
