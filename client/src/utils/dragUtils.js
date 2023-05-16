export const thicknesses = {
  thin: 20,
  mid: 30,
  thick: 45,
};

export const dimensions = {
  dragWidth: "30px",
  dragHeight: "30px",
};

export const convert = (data) => {
  const converted = {};
  let counter = 0;

  data.shelves.map((shelf, index) => {
    converted[`shelf-left-${index}`] = shelf.left.map((book) => {
      counter++;
      return { id: counter.toString(), name: `${book.thickness}` };
    });
    converted[`shelf-right-${index}`] = shelf.right.map((book) => {
      counter++;
      return { id: counter.toString(), name: `${book.thickness}` };
    });
  });

  return converted;
};

export const fakedata = {
  shelves: [
    {
      left: [
        {
          title: "The Silmarillion",
          author: "J.R.R. Tolkien",
          color: "white",
          thickness: "mid",
          height: "short",
          paperback: true,
          id: 4,
        },
        {
          title: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          color: "blue",
          thickness: "mid",
          height: "short",
          paperback: true,
          id: 1,
        },
        {
          title: "The Two Towers",
          author: "J.R.R. Tolkien",
          color: "green",
          thickness: "mid",
          height: "short",
          paperback: true,
          id: 2,
        },
        {
          title: "The Return of the King",
          author: "J.R.R. Tolkien",
          color: "green",
          thickness: "mid",
          height: "short",
          paperback: true,
          id: 3,
        },
      ],
      right: [
        {
          title: "Stormbringer",
          author: "Michael Moorcock",
          color: "red",
          thickness: "thin",
          height: "short",
          paperback: true,
          id: 7,
        },
        {
          title: "Lord Foul's Bane",
          author: "Stephen R. Donaldson",
          color: "orange",
          thickness: "thick",
          height: "tall",
          paperback: false,
          id: 8,
        },
      ],
    },
    {
      left: [
        {
          title: "The Illearth War",
          author: "Stephen R. Donaldson",
          color: "blue",
          thickness: "thick",
          height: "tall",
          paperback: false,
          id: 9,
        },
        {
          title: "The Power that Preserves",
          author: "Stephen R. Donaldson",
          color: "green",
          thickness: "thick",
          height: "tall",
          paperback: false,
          id: 10,
        },
        {
          title: "White Gold Wielder",
          author: "Stephen R. Donaldson",
          color: "yellow",
          thickness: "thick",
          height: "tall",
          paperback: false,
          id: 13,
        },
        {
          title: "The Wounded Land",
          author: "Stephen R. Donaldson",
          color: "purple",
          thickness: "thick",
          height: "tall",
          paperback: false,
          id: 100,
        },
      ],
      right: [
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          color: "white",
          thickness: "mid",
          height: "short",
          paperback: true,
          id: 6,
        },
        {
          title: "The Sword of Shannara",
          author: "Terry Brooks",
          color: "black",
          thickness: "thick",
          height: "short",
          paperback: true,
          id: 5,
        },
      ],
    },
    {
      left: [
        {
          title: "Wait 'Til Next Year",
          author: "William Goldman",
          color: "white",
          thickness: "mid",
          height: "medium",
          paperback: false,
          id: 14,
        },
        {
          title: "Adventures in the Screen Trade",
          author: "William Goldman",
          color: "red",
          thickness: "mid",
          height: "medium",
          paperback: true,
          id: 15,
        },
        {
          title: "Moneyball",
          author: "Michael Lewis",
          color: "green",
          thickness: "mid",
          height: "medium",
          paperback: "leather",
          id: 16,
        },
      ],
      right: [
        {
          title: "The Big Short",
          author: "Michael Lewis",
          color: "black",
          thickness: "mid",
          height: "short",
          paperback: true,
          id: 17,
        },
        {
          title: "The One Tree",
          author: "Stephen R. Donaldson",
          color: "blue",
          thickness: "thick",
          height: "tall",
          paperback: false,
          id: 12,
        },

        {
          title: "I, Robot",
          author: "Isaac Asimov",
          color: "red",
          thickness: "mid",
          height: "medium",
          paperback: false,
          id: 11,
        },
      ],
    },
    {
      left: [
        {
          title: "What the Dog Saw",
          author: "Malcolm Gladwell",
          color: "red",
          thickness: "mid",
          height: "medium",
          paperback: false,
          id: 18,
        },
        {
          title: "The Fifties",
          author: "David Halberstam",
          color: "blue",
          thickness: "thick",
          height: "tall",
          paperback: true,
          id: 19,
        },
      ],
      right: [
        {
          title: "The House in the CC",
          author: "T.J. Klune",
          color: "blue",
          thickness: "mid",
          height: "medium",
          paperback: false,
          id: 20,
        },
        {
          title: "The Extraordinaries",
          author: "T.J. Klune",
          color: "red",
          thickness: "mid",
          height: "medium",
          paperback: false,
          id: 21,
        },

        {
          title: "The Great Gatsby",
          author: "F. Scott Fitz.",
          color: "black",
          thickness: "thin",
          height: "short",
          paperback: true,
          id: 22,
        },
      ],
    },
  ],
};

export const control = convert(fakedata);

export function dropHandler(result, state, set) {
  console.log(state);
  if (!result.destination) return;
  const { source, destination } = result;
  const newItems = [...state.items];
  const [removed] = newItems.splice(source.index, 1);
  newItems.splice(destination.index, 0, removed);
  const newObject = { items: newItems };
  set(newObject);
}
