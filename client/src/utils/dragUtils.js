export const convert = (data) => {
  // This utility takes the stored bookcase data and converts
  // it to a form that react-beautiful-dnd can use

  const converted = {};
  let counter = 0;

  // Take each shelf.stack object and place it in the converted object
  data.shelves.map((shelf, index) => {
    converted[`shelf-left-${index}`] = shelf.left.map((book) => {
      counter++;
      return { id: counter.toString(), name: `Drag-${counter}` };
    });
    converted[`shelf-right-${index}`] = shelf.right.map((book) => {
      counter++;
      return { id: counter.toString(), name: `Drag-${counter}` };
    });
  });

  // now map the unshelved section
  converted[`shelf-unshelved-unshelved`] = data.unshelved.map((book) => {
    counter++;
    return { id: counter.toString(), name: `Drag-${counter}` };
  });

  return converted;
};

export const booksDeepCopy = (data) => {
  // This utility returns an editable, deep copy of the books state
  const newBooks = { shelves: [], unshelved: [] };
  data.shelves.map((shelf) => {
    const shelfCopy = { left: [], right: [] };
    shelf.left.map((book) => shelfCopy.left.push({ ...book }));
    shelf.right.map((book) => shelfCopy.right.push({ ...book }));
    newBooks.shelves.push(shelfCopy);
  });
  data.unshelved.map((book) => newBooks.unshelved.push({ ...book }));

  return newBooks;
};

export const abbreviateTitle = (title) => {
  let abbrev = "";
  const words = title.split(" ");
  words.map((word, index) => {
    abbrev += `${word.charAt(0)}.`;
    if (index === word.length - 1) abbrev += " ";
  });
  return abbrev;
};

const thicknesses = {
  // This is a reference to pixel widths of book types
  thin: 20,
  mid: 30,
  thick: 45,
};

export const noSpace = (shelf, newBook) => {
  // This utility determines if there is room on the shelf for a drop
  let pixels = 0;
  shelf.left.map((book) => (pixels += thicknesses[book.thickness]));
  shelf.right.map((book) => (pixels += thicknesses[book.thickness]));

  return pixels + thicknesses[newBook.thickness] > 300;
};

export const isTight = (book) => {
  // This utility performs logic to determine if the spine text needs shortening
  if (
    book.title >= 30 ||
    (book.title.length > 15 && book.thickness == "thin")
  ) {
    return "tightest";
  } else if (book.thickness === "thin") {
    return "tighter";
  } else if (
    book.title.length >= 24 ||
    (book.title.length > 18 && book.thickness === "mid") ||
    (book.title.length > 12 && book.style === "leather")
  ) {
    return "tight";
  }
  return "";
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
          style: "paperback",
          id: 4,
        },
        {
          title: "The Fellowship of the Ring",
          author: "J.R.R. Tolkien",
          color: "blue",
          thickness: "mid",
          height: "short",
          style: "paperback",
          id: 1,
        },
        {
          title: "Tne Two Towers",
          author: "J.R.R. Tolkien",
          color: "green",
          thickness: "mid",
          height: "short",
          style: "paperback",
          id: 2,
        },
        {
          title: "The Return of the King",
          author: "J.R.R. Tolkien",
          color: "green",
          thickness: "mid",
          height: "short",
          style: "paperback",
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
          style: "paperback",
          id: 7,
        },
        {
          title: "Lord Foul's Bane",
          author: "Stephen R. Donaldson",
          color: "orange",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
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
          style: "hardcover",
          id: 9,
        },
        {
          title: "The Power that Preserves",
          author: "Stephen R. Donaldson",
          color: "green",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          id: 10,
        },
        {
          title: "White Gold Wielder",
          author: "Stephen R. Donaldson",
          color: "yellow",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          id: 13,
        },
        {
          title: "The Wounded Land",
          author: "Stephen R. Donaldson",
          color: "purple",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
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
          style: "paperback",
          id: 6,
        },
        {
          title: "The Sword of Shannara",
          author: "Terry Brooks",
          color: "black",
          thickness: "thick",
          height: "short",
          style: "paperback",
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
          style: "hardcover",
          id: 14,
        },
        {
          title: "Adventures in the Screen Trade",
          author: "William Goldman",
          color: "red",
          thickness: "mid",
          height: "medium",
          style: "hardcover",
          id: 15,
        },
        {
          title: "Moneyball",
          author: "Michael Lewis",
          color: "green",
          thickness: "mid",
          height: "medium",
          style: "hardcover",
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
          style: "paperback",
          id: 17,
        },
        {
          title: "The One Tree",
          author: "Stephen R. Donaldson",
          color: "blue",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          id: 12,
        },

        {
          title: "I, Robot",
          author: "Isaac Asimov",
          color: "red",
          thickness: "mid",
          height: "medium",
          style: "leather",
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
          style: "paperback",
          id: 18,
        },
        {
          title: "The Fifties",
          author: "David Halberstam",
          color: "navy",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
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
          style: "paperback",
          id: 20,
        },
        {
          title: "The Extraordinaries",
          author: "T.J. Klune",
          color: "red",
          thickness: "mid",
          height: "medium",
          style: "paperback",
          id: 21,
        },

        {
          title: "The Great Gatsby",
          author: "F. Scott Fitz.",
          color: "black",
          thickness: "mid",
          height: "medium",
          style: "leather",
          id: 22,
        },
      ],
    },
  ],
  unshelved: [
    {
      title: "The Catcher in the Rye",
      author: "J.D.Salinger",
      color: "green",
      thickness: "thin",
      height: "short",
      style: "paperback",
      id: 104,
    },
    {
      title: "The Long Way to a Small, Angry Planet",
      author: "Becky Chambers",
      color: "black",
      thickness: "mid",
      height: "short",
      style: "hardcover",
      id: 436,
    },
    {
      title: "Steve Jobs",
      author: "Walter Isaacson",
      color: "white",
      thickness: "thick",
      height: "tall",
      style: "hardcover",
      id: 224,
    },
    {
      title: "Hamlet",
      author: "William Shakespeare",
      color: "blue",
      thickness: "thin",
      height: "short",
      style: "leather",
      id: 367,
    },
    {
      title: "Book of Spells",
      author: "S. Beelzebub",
      color: "purple",
      thickness: "thick",
      height: "tall",
      style: "leather",
      id: 666,
    },
  ],
};
