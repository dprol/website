import { JSX } from "preact";

const Head = () => (
  <>
    <meta charset="utf-8" />
    <link rel="icon" type="image/jpeg" href="/icon.jpg" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin={true as any} // hack around Preact's JSX type checking
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&display=swap"
      rel="stylesheet"
    />
  </>
);

export const indexHtml = ({ pubs }: { pubs: JSX.Element }) => (
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Daniel Prol</title>
      <meta name="description" content="Personal website of Daniel Prol" />
      <meta name="author" content="Daniel Prol" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/jpeg" href="/icon.jpg" />
      <link
        href="https://fonts.googleapis.com/css?family=Raleway:400,300,600"
        rel="stylesheet"
        type="text/css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
        integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <link rel="stylesheet" href="/css/normalize.css" />
      <link rel="stylesheet" href="/css/skeleton.css" />
      <link rel="stylesheet" href="/index.css" />
    </head>
    <body>
      <div class="container">
        <div class="row">
          <div class="two-thirds column intro">
            <h1>Daniel Prol</h1>
            <p>
              Hi, I'm Daniel! I'm a second-year PhD student in Computer Science
              at the <a href="https://www.uh.edu/">University of Houston</a>,
              advised by <a href="https://www.aminalipour.com/">Amin Alipour</a>{" "}
              and <a href="https://www.cs.cmu.edu/~mhilton/">Michael Hilton</a>.
              I do research in Computing Education (you can{" "}
              <a href="https://computingeducationthings.substack.com/">
                follow me on Substack
              </a>
              !).
            </p>
            <p>
              Before beginning graduate school, I worked for 10 years in various
              industry positions (my LinkedIn profile has more details about the
              "industry side" of my life). I'm also passionate about outreach:
              blogs, podcasts, newsletters, social media, and teaching, of
              course.
            </p>

            <div class="links">
              <a
                class="fa-brands fa-github"
                href="https://github.com/dprol"
                aria-label="GitHub"
              ></a>
              <a
                class="fa-brands fa-linkedin"
                href="https://www.linkedin.com/in/dannyprol/"
                aria-label="LinkedIn"
              ></a>
              <a
                class="fa-brands fa-google-scholar"
                href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=ANZ5fUOMurZyH0skWC2FvVythJGco0VwY0QH9tkZ0-R7dg2j5bQ8FLTwb4eRjDZqwWeCI4K1g0WM_MIN6ZarjA&user=mgKTgWcAAAAJ"
                aria-label="Google Scholar"
              ></a>
              <a
                class="fa-brands fa-x-twitter"
                href="https://x.com/DannyProl"
                aria-label="X"
              ></a>
              <a
                class="fa-brands fa-youtube"
                href="https://www.youtube.com/@ProlDaniel/videos"
                aria-label="YouTube"
              ></a>
              <a
                class="fa-brands fa-instagram"
                href="https://www.instagram.com/dannyprol/"
                aria-label="Instagram"
              ></a>
              <a
                class="fa-solid fa-newspaper"
                href="https://blog.danielprol.com/posts/"
                aria-label="Blog"
              ></a>
              <a
                class="substack"
                href="https://computingeducationthings.substack.com/"
                aria-label="Substack"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
                </svg>
              </a>
            </div>

            <h4>Contact</h4>
            <p>
              email: <a href="mailto:dprol@uh.edu">dprol@uh.edu</a>
            </p>
          </div>

          <div class="one-third column photo-column">
            <img class="photo" src="photo.jpg" alt="A picture of Daniel Prol" />
          </div>
        </div>

        <div class="row">
          <div class="column">
            <h4>Research</h4>
            {pubs}

            <h4>Projects</h4>
            <ul class="projects">
              <li>
                <a href="https://reunir.unir.net/handle/123456789/18436">
                  AI-powered programming assistant for coding students
                </a>{" "}
                — Buddy is a VS Code extension that helps students better
                understand programming problems.
              </li>
              <li>
                <a href="https://uhcsed.web.app/">Research Group Website</a> —
                Learn about who I work with and what we do in our research
                group.
              </li>
              <li>
                <a href="https://blog.danielprol.com/">My occasional blog</a> —
                Software engineering deep dives, technical write-ups, and
                reflections on learning, programming, and AI.
              </li>
              <li>
                <a href="https://www.youtube.com/playlist?list=PLnLzwYW6HOC6SJ4d66pMm8ZWjEmgIwwRp">
                  Podcast Host
                </a>{" "}
                — SaaS Product Chat was a Spanish-language video podcast
                covering software-as-a-service topics, featuring speakers from
                the Latin American and Spanish tech industry.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </body>
  </html>
);

export interface Post {
  hot?: string;
  css: boolean;
  title: string;
  date: string;
  body: JSX.Element;
}

export const blogHtml = ({ hot, css, title, date, body }: Post) => (
  <html lang="en-us">
    <head>
      <Head />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.10.0/styles/monokai.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css"
      />
      <link rel="stylesheet" href="/blog.css" />
      {css ? <link rel="stylesheet" href="style.css" /> : <></>}
      {/* Hot reloading disabled for production build */}
      <title>{title} | Daniel Prol</title>
    </head>
    <body>
      <main>
        <h1>{title}</h1>
        <p>
          <em>
            by <a href="/">Daniel Prol</a>, {date}
          </em>
        </p>
        <div id="body">{body}</div>
      </main>
    </body>
  </html>
);
