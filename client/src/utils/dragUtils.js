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

  // Create a framework for the data
  const newBookcase = {
    user_id: data.user_id,
    year: data.year,
    shelves: [],
    unshelved: [],
  };

  // Iterate over each shelf
  data.shelves.map((shelf) => {
    // Make an empty shell for each shelf, add a copy of each book
    const shelfCopy = { left: [], right: [] };
    shelf.left.map((book) => {
      const thisBook = {};
      for (const [key, value] of Object.entries(book)) {
        if (key !== "__typename") thisBook[key] = value;
      }
      shelfCopy.left.push(thisBook);
    });
    shelf.right.map((book) => {
      const thisBook = {};
      for (const [key, value] of Object.entries(book)) {
        if (key !== "__typename") thisBook[key] = value;
      }
      shelfCopy.right.push(thisBook);
    });
    newBookcase.shelves.push(shelfCopy);
  });

  // Repeat, with the unshelved
  data.unshelved.map((book) => {
    const thisBook = {};
    for (const [key, value] of Object.entries(book)) {
      if (key !== "__typename") thisBook[key] = value;
    }
    newBookcase.unshelved.push(thisBook);
  });

  return newBookcase;
};

export const abbreviateTitle = (title) => {
  // This function returns an initialized form of the title
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

  return pixels + thicknesses[newBook.thickness] > 280;
};

export const isTight = (book) => {
  // This utility performs logic to determine if the spine text needs shortening
  if (
    book.title >= 60 ||
    (book.title.length > 30 && ["short"].indexOf(book.height) >= 0) ||
    (book.title.length > 22 &&
      ["medium"].indexOf(book.height) >= 0 &&
      book.thickness === "thin")
  ) {
    return "tightest";
  } else if (
    book.thickness === "thin" ||
    (book.thickness === "mid" && book.title.length > 30)
  ) {
    return "tighter";
  } else if (
    book.title.length >= 24 ||
    (book.title.length > 15 && book.thickness === "mid") ||
    (book.title.length > 12 && book.style === "leather")
  ) {
    return "tight";
  }
  return "";
};
