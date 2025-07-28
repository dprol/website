import { JSX } from "preact";

interface Author {
  name: string;
  href: string;
}

const author = (name: string, href: string): Author => ({ name, href });

// Authors from the publications
const danielProl = author("Daniel Prol", "/");
const aminAlipour = author("Amin Alipour", "https://www.aminalipour.com/");
const jamessPrather = author("James Prather", "https://www.jamessprather.com/");
const brentReeves = author("Brent N Reeves", "#");
const paulDenny = author("Paul Denny", "https://www.cs.auckland.ac.nz/~paul/");
const juhoLeinonen = author("Juho Leinonen", "#");
const stephenMacNeil = author("Stephen MacNeil", "#");
const andrewLuxtonReilly = author("Andrew Luxton-Reilly", "#");
const joaoOrvalho = author("João Orvalho", "#");
const aliAhmadi = author("Ali Ahmadi", "#");
const thezyrie = author("Thezyrie Amarouche", "#");
const bailey = author("Bailey Kimmel", "#");
const jared = author("Jared Wright", "#");
const musa = author("Musa Blake", "#");
const gweneth = author("Gweneth Barbre", "#");
const aayush = author("Aayush Kumar", "#");
const sruti = author("Sruti Srinivasa Ragavan", "#");
const giulia = author("Giulia Toti", "#");
const leiSi = author("Lei Si", "#");
const davidDaniels = author("David Daniels", "#");
const matinYarmand = author("Matin Yarmand", "#");
const guoning = author("Guoning Chen", "#");
const dayeNam = author("Daye Nam", "#");
const michaelHilton = author("Michael Hilton", "#");
const stellaChen = author("Stella Chen", "#");

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
    title: "Breaking the Programming Language Barrier: Multilingual Prompting to Empower Non-Native English Learners",
    href: "https://dl.acm.org/doi/full/10.1145/3716640.3716649",
    venue: {
      name: "ACE 2025",
      href: "https://aceconference.org/",
    },
    authors: [
      jamessPrather, brentReeves, paulDenny, juhoLeinonen, stephenMacNeil, 
      andrewLuxtonReilly, joaoOrvalho, aminAlipour, aliAhmadi, thezyrie, 
      bailey, jared, musa, gweneth
    ],
    year: 2025,
    type: "Conference",
  },
  {
    title: "To Google or To ChatGPT? A Comparison of CS2 Students Information Gathering Approaches and Outcomes",
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
    title: "Students and Instructors Reflections on the Impact of COVID-19 on Computer Science Education after One Year of Remote Teaching",
    href: "https://link.springer.com/article/10.1007/s44217-025-00438-1",
    venue: {
      name: "Discover Education",
      href: "https://link.springer.com/journal/44217",
    },
    authors: [giulia, leiSi, davidDaniels, matinYarmand, aminAlipour, guoning],
    year: 2025,
    type: "Journal",
  },
  {
    title: "Student-AI Interaction: A Case Study of CS1 students",
    href: "https://dl.acm.org/doi/abs/10.1145/3699538.3699567",
    venue: {
      name: "Koli Calling 2024",
      href: "https://www.kolicalling.fi/",
    },
    authors: [
      matinYarmand, dayeNam, danielProl, aliAhmadi, jamessPrather, 
      michaelHilton, sruti, aminAlipour
    ],
    year: 2024,
    type: "Conference",
  },
  {
    title: "Trust in Generative AI among Students: An exploratory study",
    href: "https://dl.acm.org/doi/abs/10.1145/3626252.3630842",
    venue: {
      name: "SIGCSE 2024",
      href: "https://sigcse2024.sigcse.org/",
    },
    authors: [
      matinYarmand, davidDaniels, dayeNam, aayush, stellaChen, 
      michaelHilton, sruti, aminAlipour
    ],
    year: 2024,
    type: "Conference",
  },
  {
    title: "Towards characterizing trust in generative artificial intelligence among students",
    href: "https://dl.acm.org/doi/abs/10.1145/3568812.3603469",
    venue: {
      name: "ICER 2023",
      href: "https://icer2023.acm.org/",
    },
    authors: [
      matinYarmand, davidDaniels, stellaChen, dayeNam, aayush, 
      michaelHilton, aminAlipour, sruti
    ],
    year: 2023,
    type: "Poster",
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