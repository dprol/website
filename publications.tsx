import { JSX } from "preact";

interface Venue {
  name: string;
  href: string;
}

interface Publication {
  title: string;
  href: string;
  venue: Venue;
  year: number;
  type: string;
}

const pubs: Publication[] = [
  {
    title: "Teamwork in Computing Education: Skills, Values, and Virtues",
    href: "https://dl.acm.org/doi/10.1145/3803401.3812054",
    venue: {
      name: "ITiCSE 2026",
      href: "https://iticse.acm.org/2026/",
    },
    year: 2026,
    type: "Abstract",
  },
  {
    title: "Asistente de IA para Visual Studio Code para el aprendizaje de programación",
    href: "https://reunir.unir.net/handle/123456789/18436",
    venue: {
      name: "Re-UNIR",
      href: "https://reunir.unir.net/",
    },
    year: 2025,
    type: "Thesis",
  },
  {
    title: "Web vs. LLMs: An Empirical Study of Learning Behaviors of CS2 Students",
    href: "https://arxiv.org/abs/2501.11935",
    venue: {
      name: "arXiv Preprint",
      href: "https://arxiv.org/",
    },
    year: 2025,
    type: "Preprint",
  },
  {
    title: "From Prompts to Propositions: A Logic-Based Lens on Student-LLM Interactions",
    href: "https://dl.acm.org/doi/10.1145/3769994.3770004",
    venue: {
      name: "Koli Calling 2025",
      href: "https://www.kolicalling.fi/",
    },
    year: 2025,
    type: "Conference",
  },
  {
    title: "Student-AI Interaction: A Case Study of CS1 students",
    href: "https://dl.acm.org/doi/abs/10.1145/3699538.3699567",
    venue: {
      name: "Koli Calling 2024",
      href: "https://www.kolicalling.fi/",
    },
    year: 2024,
    type: "Conference",
  },
];

export const publications = (): JSX.Element => (
  <div class="publications">
    {pubs.map((pub) => {
      return (
        <div>
          <div>
            <a href={pub.href}>{pub.title}</a>
          </div>
          <div class="pub-info">
            <a class="venue" href={pub.venue.href}>
              {pub.venue.name}
            </a>{" "}
            ({pub.year}).
          </div>
        </div>
      );
    })}
  </div>
);
