import { SiteHeader, SiteFooter } from "@/components/site-shell";
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="container structure-page">
        <h1>Page not found</h1>
        <p>This address does not match a page on Plus Point Gulf.</p>
        <a className="return-link" href="/">
          Return to landing page
        </a>
      </main>
      <SiteFooter />
    </>
  );
}
