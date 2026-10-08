import { ArrowRight, Check, MapPin, Mail, Phone } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { EnquiryForm, LandingFaq } from "@/components/landing-interactions";
import { HeroFilm } from "@/components/hero-film";

const disciplines = [
  {
    image: "team.jpeg",
    alt: "Plus Point crew members in their blue uniforms",
    title: "The people behind the production",
    label: "Event teams",
    services: [
      {
        title: "Event crew",
        href: "event-crew",
        copy: "Hands-on support for the practical demands of an event. Bring together the crew needed for load-in, venue preparation, live operations and the final breakdown, with roles agreed around your production schedule.",
        tasks: [
          "Loading, unloading and equipment movement",
          "Venue setup and operational support",
          "Breakdown and site clearance",
        ],
      },
      {
        title: "Overlay & site crew",
        href: "overlay-site-crew",
        copy: "Support for the temporary infrastructure that turns a site into an event venue. Discuss your installation sequence, working areas and access arrangements so the crew brief reflects the build on the ground.",
        tasks: [
          "Site preparation and installation support",
          "Temporary venue and overlay works",
          "Build, maintenance and dismantling support",
        ],
      },
    ],
  },
  {
    image: "stage.jpeg",
    alt: "Outdoor production stage with lighting, speakers and seating",
    title: "Support from load-in to the last load-out",
    label: "Production & structures",
    services: [
      {
        title: "Stage & production crew",
        href: "stage-production-crew",
        copy: "On-site manpower for stage builds and production activity. Coordinate the tasks, shift times and reporting arrangements with your production leads, from equipment handling and assembly support through to strike.",
        tasks: [
          "Stage assembly and equipment handling",
          "Support for production teams on site",
          "Load-in, changeovers and strike",
        ],
      },
      {
        title: "Tents & structures",
        href: "tents-structure",
        copy: "Crew support for temporary event spaces, with assembly and removal planned around site access and the installation programme. Share the structure type and scope so the appropriate crew requirements can be discussed.",
        tasks: [
          "Tent and temporary structure assembly",
          "Installation and adjustment support",
          "Dismantling and material handling",
        ],
      },
    ],
  },
  {
    image: "scaffolding.jpeg",
    alt: "Workers and scaffold infrastructure at an outdoor event build",
    title: "Specialist support for detailed site work",
    label: "Specialist trades",
    services: [
      {
        title: "Scaffolding crew",
        href: "scaffolder",
        copy: "Specialist crew support for scaffold assembly, adjustment and dismantling. Define the working scope, supervision and site requirements with the team before deployment so responsibilities are clear.",
        tasks: [
          "Scaffold assembly and dismantling",
          "Adjustments during the build programme",
          "Coordination with site supervisors",
        ],
      },
      {
        title: "Event carpentry",
        href: "expert-carpenter",
        copy: "Carpentry support for event builds, fit-outs and on-site finishing. Share your drawings, materials and required finish to discuss the practical work, from assembly tasks to last-stage adjustments.",
        tasks: [
          "Event builds and fit-out support",
          "On-site installation and finishing",
          "Adjustments and breakdown support",
        ],
      },
    ],
  },
];

const process = [
  [
    "Share the project",
    "Send your venue, location, build and show dates, and the work you need covered. Drawings, task lists and provisional headcounts help establish the starting scope.",
  ],
  [
    "Agree the crew brief",
    "Discuss the disciplines, team size, shifts and site requirements. Confirm responsibilities, reporting lines and any specialist requirements before deployment.",
  ],
  [
    "Coordinate the build",
    "Align site access, induction and the working schedule with your project team. Plan the crew around installation sequences, production activity and operational needs.",
  ],
  [
    "Plan the final strike",
    "Include dismantling, load-out and clearance in the original brief. Confirm the finishing scope and timing so the final phase is coordinated with the rest of the event.",
  ],
];

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="landing-v2">
        <section className="v2-hero" aria-labelledby="hero-title">
          <HeroFilm />
          <div className="v2-hero-shade" />
          <div className="container v2-hero-content">
            <p className="v2-location">
              <MapPin size={18} /> Saudi Arabia & United Arab Emirates
            </p>
            <h1 id="hero-title">Plus Point Gulf</h1>
            <p className="v2-hero-subtitle">
              Event crew. Production support.
              <br />
              Site specialists.
            </p>
            <p className="v2-hero-description">
              Behind every event is a team that makes it happen. We provide
              event crew and specialist site support for builds, live operations
              and breakdowns across Saudi Arabia and the UAE.
            </p>
            <div className="actions">
              <a className="button button-gold" href="#enquiry">
                Discuss your project <ArrowRight size={20} />
              </a>
              <a className="v2-hero-link" href="#services">
                Explore our services <ArrowRight size={20} />
              </a>
            </div>
            <div className="v2-hero-bottom">
              <span>
                Event organisers / Production teams / Site contractors
              </span>
              <a href="#about">
                Meet the team <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        <section className="v2-blue v2-about" id="about">
          <div className="container v2-about-grid">
            <div className="v2-about-copy">
              <p className="v2-section-label">Your crew partner in the Gulf</p>
              <h2>
                Good events start
                <br />
                with people.
              </h2>
              <p className="v2-lead">
                From the first delivery on site to the final dismantle, the
                right crew makes the difference.
              </p>
              <p>
                Plus Point Gulf brings together general event crew and
                specialist site support for event organisers, production teams
                and contractors. Our services cover the practical work behind
                the experience: preparing venues, supporting stage builds,
                assembling temporary infrastructure and helping keep operations
                moving.
              </p>
              <p>
                Tell us what you are building, where it is happening and when
                you need support. We will discuss the crew roles, working
                schedule and site requirements around your project.
              </p>
              <a className="v2-light-link" href="/about-us/">
                More about Plus Point Gulf <ArrowRight size={19} />
              </a>
            </div>
            <figure className="v2-team-photo">
              <img
                src="/images/team.jpeg"
                width="1057"
                height="883"
                alt="Plus Point Gulf crew in blue uniforms"
                loading="lazy"
              />
              <figcaption>Our crew. Your project team.</figcaption>
            </figure>
          </div>
          <div className="container v2-about-facts">
            <div>
              <strong>Saudi Arabia & UAE</strong>
              <span>Regional contacts in Riyadh and Dubai</span>
            </div>
            <div>
              <strong>Six crew disciplines</strong>
              <span>General event support and specialist trades</span>
            </div>
            <div>
              <strong>Build to breakdown</strong>
              <span>Scope your crew across every event phase</span>
            </div>
          </div>
        </section>

        <section className="container v2-section" id="services">
          <div className="v2-heading">
            <div>
              <p className="v2-section-label">Our services</p>
              <h2>
                One brief.
                <br />
                The right crew for the job.
              </h2>
            </div>
            <div>
              <p>
                Every site has a different set of demands. Start with the work
                you need covered, then build a crew brief around the skills,
                shifts and support your event requires.
              </p>
              <a className="text-link" href="/services/">
                View all services <ArrowRight size={19} />
              </a>
            </div>
          </div>
          <div className="v2-disciplines">
            {disciplines.map((group) => (
              <article className="v2-discipline" key={group.label}>
                <figure
                  className={`v2-service-photo ${group.image === "team.jpeg" ? "v2-crew-photo" : ""}`}
                >
                  <img
                    src={`/images/${group.image}`}
                    alt={group.alt}
                    loading="lazy"
                    width={group.image === "team.jpeg" ? "1057" : "2560"}
                    height={group.image === "team.jpeg" ? "883" : "1183"}
                  />
                  <figcaption>
                    <span>{group.label}</span>
                    <h3>{group.title}</h3>
                  </figcaption>
                </figure>
                <div className="v2-service-copy">
                  {group.services.map((service) => (
                    <div className="v2-service-detail" key={service.href}>
                      <h3>
                        <a href={`/${service.href}/`}>
                          {service.title}
                          <ArrowRight size={24} />
                        </a>
                      </h3>
                      <p>{service.copy}</p>
                      <ul>
                        {service.tasks.map((task) => (
                          <li key={task}>
                            <Check size={16} aria-hidden="true" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="v2-work" id="work">
          <div className="container v2-section">
            <div className="v2-heading">
              <div>
                <p className="v2-section-label">On the ground</p>
                <h2>
                  Built behind the scenes.
                  <br />
                  Seen by everyone.
                </h2>
              </div>
              <div>
                <p>
                  Production stages and temporary site infrastructure take
                  people, planning and coordinated work. Our crew services
                  support the work behind the venue, from stage assembly and
                  production activity to temporary infrastructure and the final
                  dismantle.
                </p>
                <a className="text-link" href="/project/">
                  Explore our work <ArrowRight size={19} />
                </a>
              </div>
            </div>
            <div className="v2-work-grid">
              <article>
                <img
                  src="/images/stage.jpeg"
                  alt="Outdoor stage with a large screen, lighting and speaker arrays"
                  width="2560"
                  height="1183"
                  loading="lazy"
                />
                <div className="v2-work-caption">
                  <h3>Stage & production</h3>
                  <p>
                    From assembly and equipment movement to on-site production
                    support and strike. Plan manpower around the schedule that
                    your production team is working to.
                  </p>
                  <a className="text-link" href="/stage-production-crew/">
                    Production crew services <ArrowRight size={18} />
                  </a>
                </div>
              </article>
              <article>
                <img
                  src="/images/scaffolding.jpeg"
                  alt="Large scaffold framework and crew at an outdoor event site"
                  width="2560"
                  height="1183"
                  loading="lazy"
                />
                <div className="v2-work-caption">
                  <h3>Site infrastructure</h3>
                  <p>
                    Temporary structures, overlay and scaffold work behind the
                    venue. Define the installation sequence and site
                    responsibilities before crew deployment.
                  </p>
                  <a className="text-link" href="/overlay-site-crew/">
                    Site crew services <ArrowRight size={18} />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="v2-blue">
          <div className="container v2-section">
            <div className="v2-heading">
              <div>
                <p className="v2-section-label">How we work</p>
                <h2>
                  A clear brief.
                  <br />A coordinated site.
                </h2>
              </div>
              <p>
                Good coordination starts before the first shift. We discuss the
                scope with your team so crew roles, access arrangements and
                working times are understood from the outset.
              </p>
            </div>
            <ol className="v2-process">
              {process.map(([title, copy], i) => (
                <li key={title}>
                  <span>0{i + 1}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
            <div className="v2-process-bottom">
              <p>
                Have a brief ready? Send the dates, location and work scope to
                start the conversation.
              </p>
              <a className="button button-gold" href="#enquiry">
                Start your enquiry <ArrowRight size={19} />
              </a>
            </div>
          </div>
        </section>

        <section className="container v2-section" id="contact">
          <div className="v2-heading">
            <div>
              <p className="v2-section-label">Regional contacts</p>
              <h2>
                Talk to our team.
                <br />
                Plan your next build.
              </h2>
            </div>
            <p>
              Contact our Saudi Arabia or UAE team to discuss your event
              location, requirements and timing. Crew availability and
              deployment arrangements are confirmed around the agreed scope.
            </p>
          </div>
          <div className="contact-grid">
            {[
              {
                country: "Saudi Arabia",
                city: "Riyadh",
                code: "KSA",
                tel: "+966540560097",
                phone: "+966 54 056 0097",
                email: "tasneem@pluspointgulf.com",
              },
              {
                country: "United Arab Emirates",
                city: "Dubai",
                code: "UAE",
                tel: "+971565388457",
                phone: "+971 56 538 8457",
                email: "Operations@pluspointgulf.com",
              },
            ].map((region) => (
              <div className="region" key={region.code}>
                <div className="region-title">
                  <MapPin size={23} />
                  <div>
                    <span>{region.country}</span>
                    <h3>{region.city}</h3>
                  </div>
                  <span className="region-code">{region.code}</span>
                </div>
                <a className="phone-link" href={`tel:${region.tel}`}>
                  <Phone size={19} />
                  {region.phone}
                </a>
                <a className="region-email" href={`mailto:${region.email}`}>
                  <Mail size={17} />
                  {region.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="v2-faq">
          <div className="container v2-section faq-grid">
            <div>
              <p className="v2-section-label">Before you book</p>
              <h2>
                Your crew questions,
                <br />
                answered.
              </h2>
              <p>Practical details to help you prepare a project enquiry.</p>
              <a className="text-link" href="#enquiry">
                Discuss your requirements <ArrowRight size={18} />
              </a>
            </div>
            <LandingFaq />
          </div>
        </section>

        <section className="v2-blue v2-enquiry" id="enquiry">
          <div className="container v2-section enquiry-grid">
            <div className="enquiry-copy">
              <p className="v2-section-label">Project enquiry</p>
              <h2>
                Tell us what
                <br />
                you are building.
              </h2>
              <p>
                Whether you have a complete crew schedule or an early project
                outline, share the details you have. Include the work scope and
                event phases so we can discuss the support your site needs.
              </p>
              <div className="brief-checklist">
                <h3>Include in your brief</h3>
                <ul>
                  <li>
                    <Check size={17} />
                    Build, show and breakdown dates
                  </li>
                  <li>
                    <Check size={17} />
                    Venue, location and site access details
                  </li>
                  <li>
                    <Check size={17} />
                    Crew roles and estimated headcount
                  </li>
                  <li>
                    <Check size={17} />
                    Shift times and reporting arrangements
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
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
