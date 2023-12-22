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
  for (const book of data.unshelved) {
    const thisBook = {};
    for (const [key, value] of Object.entries(book)) {
      if (key !== "__typename") thisBook[key] = value;
    }
    newBookcase.unshelved.push(thisBook);
  }

  return newBookcase;
};

export const abbreviateTitle = (title, tightness) => {
  // This function returns an initialized form of the title
  let abbrev = "";
  const words = title.split(" ");
  const punctuation = [".", ".", "?", "!"];
  // const abbrev2 = words.map((word, index) => {
  //   return word.length <= (tightness || 3)
  //     ? `${word}${
  //         punctuation.indexOf(word.charAt(word.length - 1)) >= 0
  //           ? `${word.charAt(word.length - 1)} `
  //           : " "
  //       }`
  //     : `${word.charAt(0)}.${index === word.length - 1 ? " " : ""}`;
  // });
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
  const newBookThickness = isNaN(newBook.thickness)
    ? thicknesses[newBook.thickness]
    : parseInt(newBook.thickness);
  // This utility determines if there is room on the shelf for a drop
  const leftThicknesses = shelf.left.map((book) => {
    // does this book have a setting or a number?
    return isNaN(book.thickness)
      ? thicknesses[book.thickness]
      : parseInt(book.thickness);
  });
  const rightThicknesses = shelf.right.map((book) => {
    // does this book have a setting or a number?
    return isNaN(book.thickness)
      ? thicknesses[book.thickness]
      : parseInt(book.thickness);
  });
  const sumLeft = leftThicknesses.reduce(
    (partialSum, pixels) => partialSum + pixels,
    0
  );
  const sumRight = rightThicknesses.reduce(
    (partialSum, pixels) => partialSum + pixels,
    0
  );

  return sumLeft + sumRight + newBookThickness > 280;
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

export const titleSmooshing = (title, type) => {
  const dotDotDot = (title, words) => {
    const titlePieces = title.split(" ");
    let newTitle = "";
    for (let i = 0; i < words; i++) {
      if (titlePieces[i]) newTitle += `${titlePieces[i]} `;
    }
    if (titlePieces.length > words) newTitle += "...";
    return newTitle;
  };

  const justThe = (title) => {
    const expanded = ["the", "a", "of", "for", "to", "on", "in"];
    const titlePieces = title.split(" ");
    const updatedPieces = titlePieces.map((word) => {
      if (expanded.indexOf(word.toLowerCase()) === -1) {
        return `${word.charAt(0)}.`;
      } else return word;
    });
    return updatedPieces.join(" ");
  };

  return type === "full"
    ? title
    : type === "abbrev"
    ? justThe(title)
    : type === "short"
    ? dotDotDot(title, 6)
    : type === "shorter"
    ? dotDotDot(title, 4)
    : dotDotDot(title, 3);
};

export function convertUnicode(input) {
  return input.replace(/\\+u([0-9a-fA-F]{4})/g, (a, b) =>
    String.fromCharCode(parseInt(b, 16))
  );
}
