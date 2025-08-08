import { JSX } from "preact";

const Head = () => (
  <>
    <meta charset="utf-8" />
    <link rel="icon" type="image/png" href="/icon.png" />
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

export const indexHtml = ({
  pubs,
  blog,
}: {
  pubs: JSX.Element;
  blog: JSX.Element;
}) => (
  <html lang="en-us">
    <head>
      <Head />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.1/css/all.min.css"
        integrity="sha512-5Hs3dF2AEPkpNAR7UiOHba+lRSJNeM2ECkwxUIxC1Q/FLycGTbNapWXB4tP889k5T5Ju8fs4b1P5z/iB4nMfSQ=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
      <link rel="stylesheet" href="/index.css" />
      <title>Daniel Prol</title>
    </head>
    <body>
      <main>
        <div class="me">
          <img class="photo" src="photo.jpg" width="100" height="100" />
          <h1 class="name">Daniel Prol</h1>
        </div>
        <div class="socials">
          <a class="fa fa-envelope fa-2x" href="mailto:dprol@uh.edu"></a>
          <a
            class="fa-brands fa-github fa-2x"
            href="https://github.com/dprol"
          ></a>
          <a
            class="fa-brands fa-linkedin fa-2x"
            href="https://www.linkedin.com/in/dannyprol/"
          ></a>

  <a class="fa-brands fa-google-scholar fa-2x"
  href="https://scholar.google.com/citations?hl=en&view_op=list_works&gmla=ANZ5fUOMurZyH0skWC2FvVythJGco0VwY0QH9tkZ0-R7dg2j5bQ8FLTwb4eRjDZqwWeCI4K1g0WM_MIN6ZarjA&user=mgKTgWcAAAAJ"
></a>
          <a class="fa-brands fa-x-twitter fa-2x"
  href="https://x.com/DannyProl"
></a>
          <a
            class="fa-brands fa-youtube fa-2x"
            href="https://www.youtube.com/@ProlDaniel/videos"
          ></a>
        </div>
        <p>
  Hi! <span class="wave">👋</span> I'm Daniel. I'm a first-year PhD student in CS at the University of Houston, advised by{" "}
  <a href="https://www.aminalipour.com/">Amin Alipour</a>. I do
  research in <span class="topic">Computing Education</span> (you
  can <a href="https://computingeducationthings.substack.com/">follow me on Substack</a>
  !), with a particular focus on Programming Education, AI for Computing Education and Human-AI Interaction.</p>

  <p>Before that, I worked for 10 years in various industry positions (my LinkedIn profile has more details about the "industry side" of my life). I'm also passionate about outreach: blogs, podcasts, newsletters, social media, and teaching, of course.</p>
        <h2>Publications</h2>
        {pubs}
        <h2>Projects</h2>
        <p>Here are a few projects I've worked on over the years.</p>
        <div class="stuff">
          <a href="https://marketplace.visualstudio.com/items?itemName=dprol.buddy-ai">
            <div class="toy">
              <h3>Buddy</h3>
              <h3 class="year">2025</h3>
            </div>
            <p>
              Buddy is a VS Code extension that helps students better understand programming problems.
            </p>
          </a>
          <a href="https://uhcsed.web.app/">
            <div class="toy">
              <h3>Research Group Website</h3>
              <h3 class="year">2025</h3>
            </div>
            <p>
              Learn about who I work with and what we do in our research group.
            </p>
          </a>
          <a href="https://evangelio.app/">
            <div class="toy">
              <h3>Catholic Podcasts Website</h3>
              <h3 class="year">2024</h3>
            </div>
            <p>
              A curated selection of Spanish-language podcasts to bring Jesus into your daily routine.
            </p>
          </a>
          <a href="https://www.youtube.com/playlist?list=PLnLzwYW6HOC6SJ4d66pMm8ZWjEmgIwwRp">
            <div class="toy">
              <h3>SaaS Product Chat</h3>
              <h3 class="year">2018</h3>
            </div>
            <p>
              SaaS Product Chat was a Spanish-language video podcast covering software-as-a-service topics, featuring speakers from the Latin American and Spanish tech industry.
            </p>
          </a>
        </div>
        <h2>Blog</h2>
        {blog}
      </main>
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