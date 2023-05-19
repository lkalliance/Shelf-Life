export const convert = (data) => {
  // This utility takes the stored bookcase data and converts
  // it to a form that react-beautiful-dnd can use

  const converted = {};
  let counter = 0;

  // Take each shelf.stack object and place it in the converted object
  data.shelves.map((shelf, index) => {
    converted[`shelf-left-${index}`] = shelf.left.map((book) => {
      counter++;
      return { bookId: counter.toString(), name: `Drag-${counter}` };
    });
    converted[`shelf-right-${index}`] = shelf.right.map((book) => {
      counter++;
      return { bookId: counter.toString(), name: `Drag-${counter}` };
    });
  });

  // now map the unshelved section
  converted[`shelf-unshelved-unshelved`] = data.unshelved.map((book) => {
    counter++;
    return { bookId: counter.toString(), name: `Drag-${counter}` };
  });

  return converted;
};

export const booksDeepCopy = (data) => {
  // This utility returns an editable, deep copy of the books state
  const newUser = {
    username: { ...data.username },
    bookList: [],
    years: [],
  };
  const newYears = [
    {
      bookcaseYear: "2023",
      bookcase: {
        shelves: [],
        unshelved: [],
      },
    },
  ];

  data.bookList.map((book) => {
    newUser.bookList.push({ ...book });
    return false;
  });

  data.years[0].bookcase.shelves.map((shelf) => {
    const shelfCopy = { left: [], right: [] };
    shelf.left.map((book) => shelfCopy.left.push({ ...book }));
    shelf.right.map((book) => shelfCopy.right.push({ ...book }));
    newYears[0].bookcase.shelves.push(shelfCopy);
  });

  data.years[0].bookcase.unshelved.map((book) =>
    newYears[0].bookcase.unshelved.push({ ...book })
  );

  newUser.years = newYears;

  return newUser;
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
  mbookId: 30,
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
  username: "Alias Undercover",
  bookList: [
    {
      title: "The Silmarillion",
      authors: ["J.R.R. Tolkien"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "4",
    },
    {
      title: "The Fellowship of the Ring",
      authors: ["J.R.R. Tolkien"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "1",
    },
    {
      title: "Tne Two Towers",
      authors: ["J.R.R. Tolkien"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "2",
    },
    {
      title: "The Return of the King",
      authors: ["J.R.R. Tolkien"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "3",
    },
    {
      title: "Stormbringer",
      authors: ["Michael Moorcock"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "7",
    },
    {
      title: "Lord Foul's Bane",
      authors: ["Stephen R. Donaldson"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "8",
    },
    {
      title: "The Illearth War",
      authors: ["Stephen R. Donaldson"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "9",
    },
    {
      title: "The Power that Preserves",
      authors: ["Stephen R. Donaldson"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "10",
    },
    {
      title: "White Gold Wielder",
      authors: ["Stephen R. Donaldson"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "13",
    },
    {
      title: "The Wounded Land",
      authors: ["Stephen R. Donaldson"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "100",
    },
    {
      title: "The Hobbit",
      authors: ["J.R.R. Tolkien"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "6",
    },
    {
      title: "The Sword of Shannara",
      authors: ["Terry Brooks"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "5",
    },
    {
      title: "Wait 'Til Next Year",
      authors: ["William Goldman", "Mike Lupica"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "14",
    },
    {
      title: "Adventures in the Screen Trade",
      authors: ["William Goldman"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "15",
    },
    {
      title: "Moneyball",
      authors: ["Michael Lewis"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "16",
    },
    {
      title: "The Big Short",
      authors: ["Michael Lewis"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "17",
    },
    {
      title: "The One Tree",
      authors: ["Stephen R. Donaldson"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "12",
    },

    {
      title: "I, Robot",
      authors: ["Isaac Asimov"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "11",
    },
    {
      title: "What the Dog Saw",
      authors: ["Malcolm Gladwell"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "18",
    },
    {
      title: "The Fifties",
      authors: ["David Halberstam"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "19",
    },
    {
      title: "The House in the Cerulean Sea",
      authors: ["T.J. Klune"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "20",
    },
    {
      title: "The Extraordinaries",
      authors: ["T.J. Klune"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "21",
    },

    {
      title: "The Great Gatsby",
      authors: ["F. Scott Fitzgerald"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "22",
    },
    {
      title: "The Catcher in the Rye",
      authors: ["J.D.Salinger"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "104",
    },
    {
      title: "The Long Way to a Small, Angry Planet",
      authors: ["Becky Chambers"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "436",
    },
    {
      title: "Steve Jobs",
      authors: ["Walter Isaacson"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "224",
    },
    {
      title: "Hamlet",
      authors: ["William Shakespeare"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "367",
    },
    {
      title: "Book of Spells",
      authors: ["S. Beelzebub"],
      rating: "4",
      comment: "",
      year: "2023",
      bookId: "666",
    },
  ],
  years: [
    {
      bookcaseYear: "2023",
      bookcase: {
        shelves: [
          {
            left: [
              {
                title: "The Silmarillion",
                authors: ["J.R.R. Tolkien"],
                color: "white",
                thickness: "mid",
                height: "short",
                style: "paperback",
                bookId: "4",
              },
              {
                title: "The Fellowship of the Ring",
                authors: ["J.R.R. Tolkien"],
                color: "blue",
                thickness: "mid",
                height: "short",
                style: "paperback",
                bookId: "1",
              },
              {
                title: "Tne Two Towers",
                authors: ["J.R.R. Tolkien"],
                color: "green",
                thickness: "mid",
                height: "short",
                style: "paperback",
                bookId: "2",
              },
              {
                title: "The Return of the King",
                authors: ["J.R.R. Tolkien"],
                color: "green",
                thickness: "mid",
                height: "short",
                style: "paperback",
                bookId: "3",
              },
            ],
            right: [
              {
                title: "Stormbringer",
                authors: ["Michael Moorcock"],
                color: "red",
                thickness: "thin",
                height: "short",
                style: "paperback",
                bookId: "7",
              },
              {
                title: "Lord Foul's Bane",
                authors: ["Stephen R. Donaldson"],
                color: "orange",
                thickness: "thick",
                height: "tall",
                style: "hardcover",
                bookId: "8",
              },
            ],
          },
          {
            left: [
              {
                title: "The Illearth War",
                authors: ["Stephen R. Donaldson"],
                color: "blue",
                thickness: "thick",
                height: "tall",
                style: "hardcover",
                bookId: "9",
              },
              {
                title: "The Power that Preserves",
                authors: ["Stephen R. Donaldson"],
                color: "green",
                thickness: "thick",
                height: "tall",
                style: "hardcover",
                bookId: "10",
              },
              {
                title: "White Gold Wielder",
                authors: ["Stephen R. Donaldson"],
                color: "yellow",
                thickness: "thick",
                height: "tall",
                style: "hardcover",
                bookId: "13",
              },
              {
                title: "The Wounded Land",
                authors: ["Stephen R. Donaldson"],
                color: "purple",
                thickness: "thick",
                height: "tall",
                style: "hardcover",
                bookId: "100",
              },
            ],
            right: [
              {
                title: "The Hobbit",
                authors: ["J.R.R. Tolkien"],
                color: "white",
                thickness: "mid",
                height: "short",
                style: "paperback",
                bookId: "6",
              },
              {
                title: "The Sword of Shannara",
                authors: ["Terry Brooks"],
                color: "black",
                thickness: "thick",
                height: "short",
                style: "paperback",
                bookId: "5",
              },
            ],
          },
          {
            left: [
              {
                title: "Wait 'Til Next Year",
                authors: ["William Goldman", "Mike Lupica"],
                color: "white",
                thickness: "mid",
                height: "medium",
                style: "hardcover",
                bookId: "14",
              },
              {
                title: "Adventures in the Screen Trade",
                authors: ["William Goldman"],
                color: "red",
                thickness: "mid",
                height: "medium",
                style: "hardcover",
                bookId: "15",
              },
              {
                title: "Moneyball",
                authors: ["Michael Lewis"],
                color: "green",
                thickness: "mid",
                height: "medium",
                style: "hardcover",
                bookId: "16",
              },
            ],
            right: [
              {
                title: "The Big Short",
                authors: ["Michael Lewis"],
                color: "black",
                thickness: "mid",
                height: "short",
                style: "paperback",
                bookId: "17",
              },
              {
                title: "The One Tree",
                authors: ["Stephen R. Donaldson"],
                color: "blue",
                thickness: "thick",
                height: "tall",
                style: "hardcover",
                bookId: "12",
              },

              {
                title: "I, Robot",
                authors: ["Isaac Asimov"],
                color: "red",
                thickness: "mid",
                height: "medium",
                style: "leather",
                bookId: "11",
              },
            ],
          },
          {
            left: [
              {
                title: "What the Dog Saw",
                authors: ["Malcolm Gladwell"],
                color: "red",
                thickness: "mid",
                height: "medium",
                style: "paperback",
                bookId: "18",
              },
              {
                title: "The Fifties",
                authors: ["David Halberstam"],
                color: "navy",
                thickness: "thick",
                height: "tall",
                style: "hardcover",
                bookId: "19",
              },
            ],
            right: [
              {
                title: "The House in the Cerulean Sea",
                authors: ["T.J. Klune"],
                color: "blue",
                thickness: "mid",
                height: "medium",
                style: "paperback",
                bookId: "20",
              },
              {
                title: "The Extraordinaries",
                authors: ["T.J. Klune"],
                color: "red",
                thickness: "mid",
                height: "medium",
                style: "paperback",
                bookId: "21",
              },

              {
                title: "The Great Gatsby",
                authors: ["F. Scott Fitzgerald"],
                color: "black",
                thickness: "mid",
                height: "medium",
                style: "leather",
                bookId: "22",
              },
            ],
          },
        ],
        unshelved: [
          {
            title: "The Catcher in the Rye",
            authors: ["J.D.Salinger"],
            color: "green",
            thickness: "thin",
            height: "short",
            style: "paperback",
            bookId: "104",
          },
          {
            title: "The Long Way to a Small, Angry Planet",
            authors: ["Becky Chambers"],
            color: "black",
            thickness: "mid",
            height: "short",
            style: "hardcover",
            bookId: "436",
          },
          {
            title: "Steve Jobs",
            authors: ["Walter Isaacson"],
            color: "white",
            thickness: "thick",
            height: "tall",
            style: "hardcover",
            bookId: "224",
          },
          {
            title: "Hamlet",
            authors: ["William Shakespeare"],
            color: "blue",
            thickness: "thin",
            height: "short",
            style: "leather",
            bookId: "367",
          },
          {
            title: "Book of Spells",
            authors: ["S. Beelzebub"],
            color: "purple",
            thickness: "thick",
            height: "tall",
            style: "leather",
            bookId: "666",
          },
        ],
      },
    },
  ],
};

const fakedata_orig = {
  shelves: [
    {
      left: [
        {
          title: "The Silmarillion",
          authors: ["J.R.R. Tolkien"],
          color: "white",
          thickness: "mid",
          height: "short",
          style: "paperback",
          bookId: "4",
        },
        {
          title: "The Fellowship of the Ring",
          authors: ["J.R.R. Tolkien"],
          color: "blue",
          thickness: "mid",
          height: "short",
          style: "paperback",
          bookId: "1",
        },
        {
          title: "Tne Two Towers",
          authors: ["J.R.R. Tolkien"],
          color: "green",
          thickness: "mid",
          height: "short",
          style: "paperback",
          bookId: "2",
        },
        {
          title: "The Return of the King",
          authors: ["J.R.R. Tolkien"],
          color: "green",
          thickness: "mid",
          height: "short",
          style: "paperback",
          bookId: "3",
        },
      ],
      right: [
        {
          title: "Stormbringer",
          authors: ["Michael Moorcock"],
          color: "red",
          thickness: "thin",
          height: "short",
          style: "paperback",
          bookId: "7",
        },
        {
          title: "Lord Foul's Bane",
          authors: ["Stephen R. Donaldson"],
          color: "orange",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          bookId: "8",
        },
      ],
    },
    {
      left: [
        {
          title: "The Illearth War",
          authors: ["Stephen R. Donaldson"],
          color: "blue",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          bookId: "9",
        },
        {
          title: "The Power that Preserves",
          authors: ["Stephen R. Donaldson"],
          color: "green",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          bookId: "10",
        },
        {
          title: "White Gold Wielder",
          authors: ["Stephen R. Donaldson"],
          color: "yellow",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          bookId: "13",
        },
        {
          title: "The Wounded Land",
          authors: ["Stephen R. Donaldson"],
          color: "purple",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          bookId: "100",
        },
      ],
      right: [
        {
          title: "The Hobbit",
          authors: ["J.R.R. Tolkien"],
          color: "white",
          thickness: "mid",
          height: "short",
          style: "paperback",
          bookId: "6",
        },
        {
          title: "The Sword of Shannara",
          authors: ["Terry Brooks"],
          color: "black",
          thickness: "thick",
          height: "short",
          style: "paperback",
          bookId: "5",
        },
      ],
    },
    {
      left: [
        {
          title: "Wait 'Til Next Year",
          authors: ["William Goldman", "Mike Lupica"],
          color: "white",
          thickness: "mid",
          height: "medium",
          style: "hardcover",
          bookId: "14",
        },
        {
          title: "Adventures in the Screen Trade",
          authors: ["William Goldman"],
          color: "red",
          thickness: "mid",
          height: "medium",
          style: "hardcover",
          bookId: "15",
        },
        {
          title: "Moneyball",
          authors: ["Michael Lewis"],
          color: "green",
          thickness: "mid",
          height: "medium",
          style: "hardcover",
          bookId: "16",
        },
      ],
      right: [
        {
          title: "The Big Short",
          authors: ["Michael Lewis"],
          color: "black",
          thickness: "mid",
          height: "short",
          style: "paperback",
          bookId: "17",
        },
        {
          title: "The One Tree",
          authors: ["Stephen R. Donaldson"],
          color: "blue",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          bookId: "12",
        },

        {
          title: "I, Robot",
          authors: ["Isaac Asimov"],
          color: "red",
          thickness: "mid",
          height: "medium",
          style: "leather",
          bookId: "11",
        },
      ],
    },
    {
      left: [
        {
          title: "What the Dog Saw",
          authors: ["Malcolm Gladwell"],
          color: "red",
          thickness: "mid",
          height: "medium",
          style: "paperback",
          bookId: "18",
        },
        {
          title: "The Fifties",
          authors: ["David Halberstam"],
          color: "navy",
          thickness: "thick",
          height: "tall",
          style: "hardcover",
          bookId: "19",
        },
      ],
      right: [
        {
          title: "The House in the Cerulean Sea",
          authors: ["T.J. Klune"],
          color: "blue",
          thickness: "mid",
          height: "medium",
          style: "paperback",
          bookId: "20",
        },
        {
          title: "The Extraordinaries",
          authors: ["T.J. Klune"],
          color: "red",
          thickness: "mid",
          height: "medium",
          style: "paperback",
          bookId: "21",
        },

        {
          title: "The Great Gatsby",
          authors: ["F. Scott Fitzgerald"],
          color: "black",
          thickness: "mid",
          height: "medium",
          style: "leather",
          bookId: "22",
        },
      ],
    },
  ],
  unshelved: [
    {
      title: "The Catcher in the Rye",
      authors: ["J.D.Salinger"],
      color: "green",
      thickness: "thin",
      height: "short",
      style: "paperback",
      bookId: "104",
    },
    {
      title: "The Long Way to a Small, Angry Planet",
      authors: ["Becky Chambers"],
      color: "black",
      thickness: "mid",
      height: "short",
      style: "hardcover",
      bookId: "436",
    },
    {
      title: "Steve Jobs",
      authors: ["Walter Isaacson"],
      color: "white",
      thickness: "thick",
      height: "tall",
      style: "hardcover",
      bookId: "224",
    },
    {
      title: "Hamlet",
      authors: ["William Shakespeare"],
      color: "blue",
      thickness: "thin",
      height: "short",
      style: "leather",
      bookId: "367",
    },
    {
      title: "Book of Spells",
      authors: ["S. Beelzebub"],
      color: "purple",
      thickness: "thick",
      height: "tall",
      style: "leather",
      bookId: "666",
    },
  ],
};
