import { JSX } from "preact";

interface Author {
  name: string;
  href: string;
}

const author = (name: string, href: string): Author => ({ name, href });

// Authors from the publications
const danielProl = author("Daniel Prol", "/");
const aminAlipour = author("Amin Alipour", "https://www.aminalipour.com/");
const jamessPrather = author("James Prather", "https://jamesprather.com/");
const paulDenny = author("Paul Denny", "https://www.cs.auckland.ac.nz/~paul/");
const juhoLeinonen = author("Juho Leinonen", "https://juholeinonen.com/");
const aayush = author("Aayush Kumar", "https://www.linkedin.com/in/aayush-kumar-05a990213/");
const sruti = author("Sruti Srinivasa Ragavan", "https://sruti-s-ragavan.github.io/");
const dayeNam = author("Daye Nam", "https://dayenam.com/");
const michaelHilton = author("Michael Hilton", "https://www.cs.cmu.edu/~mhilton/");
const aliAlfageeh = author("Ali Alfageeh", "https://www.linkedin.com/in/ali-alfageeh-182755132/");
const sadeghAlMahdi = author("Mahdi Kazemi", "https://www.linkedin.com/in/sadegh-almahdi-kazemi/");
const matinAmoozadeh = author("Matin Amoozadeh", "https://www.linkedin.com/in/matin-amoozadeh-87b8231b3/");
const soutiChattopadhyay = author("Souti Chattopadhyay", "https://viterbi.usc.edu/directory/faculty/Chattopadhyay/Souti");

// ITiCSE 2026 WG10 leaders
// TODO: completar la lista de miembros del WG y sus enlaces desde la pagina de ACM
const peterOhmann = author("Peter Ohmann", "");
const edNovak = author("Ed Novak", "");
const scottReckinger = author("Scott Reckinger", "");
const shanonReckinger = author("Shanon Reckinger", "https://dl.acm.org/profile/99658741464");

interface Venue {
  name: string;
  href: string;
}

interface Publication {
  title: string;
  href: string;
  venue: Venue;
  authors: Author[];
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
    // TODO: anadir el resto de miembros del WG10 en el orden de la publicacion
    authors: [peterOhmann, edNovak, scottReckinger, shanonReckinger, danielProl],
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
    authors: [danielProl],
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
    authors: [aayush, danielProl, aminAlipour, sruti],
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
    authors: [
      aliAlfageeh, sadeghAlMahdi, dayeNam, danielProl, matinAmoozadeh,
      soutiChattopadhyay, jamessPrather, paulDenny, juhoLeinonen,
      michaelHilton, sruti, aminAlipour
    ],
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
    authors: [
      matinAmoozadeh, dayeNam, danielProl, aliAlfageeh, jamessPrather,
      michaelHilton, sruti, aminAlipour
    ],
    year: 2024,
    type: "Conference",
  },
];

const authors = (array: Author[]): JSX.Element => {
  const elems = array.map(({ name, href }) => <a href={href}>{name}</a>);
  if (elems.length === 0) {
    throw Error("no authors");
  } else if (elems.length === 1) {
    return elems[0];
  } else if (elems.length === 2) {
    return (
      <>
        {elems[0]} and {elems[1]}
      </>
    );
  } else {
    const last = elems.pop();
    const commas = elems.map((elem) => <>{elem}, </>);
    return (
      <>
        {commas}and {last}
      </>
    );
  }
};

export const publications = (): JSX.Element => (
  <div class="publications">
    {pubs.map((pub) => {
      return (
        <div>
          <div>
            <a href={pub.href}>{pub.title}</a>
          </div>
          <div class="pub-info">
            {authors(pub.authors)}.{" "}
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
