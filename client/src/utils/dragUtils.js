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

const heights = {
  // This is a reference to pixel widths of book types
  tall: 160,
  medium: 145,
  short: 125,
};

export const noSpace = (shelf, newBook) => {
  // This utility determines if there is room on the shelf for a drop

  // Calculate the thickness of the new book
  const newBookThickness = isNaN(newBook.thickness)
    ? thicknesses[newBook.thickness]
    : parseInt(newBook.thickness);
  const leftThicknesses = shelf.left.map((book) => {
    // Create an array of left-stack thicknesses
    return isNaN(book.thickness)
      ? thicknesses[book.thickness]
      : parseInt(book.thickness);
  });
  const rightThicknesses = shelf.right.map((book) => {
    // Create an array of right-stack thicknesses
    return isNaN(book.thickness)
      ? thicknesses[book.thickness]
      : parseInt(book.thickness);
  });
  const sumLeft = leftThicknesses.reduce(
    // Total up pixels in the left stack
    (partialSum, pixels) => partialSum + pixels,
    0
  );
  const sumRight = rightThicknesses.reduce(
    // Total up pixels in the right stack
    (partialSum, pixels) => partialSum + pixels,
    0
  );

  // Return boolean: would the addition of new book create too many pixels?
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
  // This utility renders a long title into a shorter one based on selected type

  const dotDotDot = (title, words) => {
    // This private utility reduces to the string to "..." following x words
    const titlePieces = title.split(" ");
    let newTitle = "";
    for (let i = 0; i < words; i++) {
      if (titlePieces[i]) newTitle += `${titlePieces[i]} `;
    }
    if (titlePieces.length > words) newTitle += "...";
    return newTitle;
  };

  const justThe = (title) => {
    // This private utility abbreviates almost all words to abbreviations
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

export function tilting(books) {
  // this utility determines if any books should be tilted

  const convertNums = (string) => {
    if (string === "thick" || string === "mid" || string === "thin")
      return thicknesses[string];
    if (string === "tall" || string === "medium" || string === "short")
      return heights[string];
    return parseInt(string);
  };

  // first check for space available
  let available = 280;
  let leftRoom = 0;
  let rightRoom = 0;
  if (books.left) {
    books.left.forEach((book) => {
      const thickness =
        book.thickness === "thick"
          ? 45
          : book.thickness === "thin"
          ? 20
          : book.thickness === "mid"
          ? 30
          : parseInt(book.thickness);
      leftRoom += thickness;
    });
  }
  if (books.right) {
    books.right.forEach((book) => {
      const thickness =
        book.thickness === "thick"
          ? 45
          : book.thickness === "thin"
          ? 20
          : book.thickness === "mid"
          ? 30
          : parseInt(book.thickness);
      rightRoom += thickness;
    });
  }

  available -= leftRoom + rightRoom;

  // caldulate if any books can be tilted
  // first, do they exist at all?
  let leftTilt = books.left && books.left.length > 0;
  let rightTilt = books.right && books.right.length > 0;

  // next, is there enough space for at least one tilt?
  if (available < 30) {
    leftTilt = false;
    rightTilt = false;
  }

  // next, is the last book too thick?
  const leftBook = leftTilt ? books.left[books.left.length - 1] : null;
  const rightBook = rightTilt ? books.right[0] : null;

  if (leftTilt && convertNums(leftBook.thickness) >= 30) leftTilt = false;
  if (rightTilt && convertNums(rightBook.thickness) >= 30) rightTilt = false;

  // next, are the next two books at least as tall?
  if (
    leftTilt &&
    books.left.length > 1 &&
    convertNums(leftBook.height) >
      convertNums(books.left[books.left.length - 2].height)
  ) {
    leftTilt = false;
  }
  if (
    leftTilt &&
    books.left.length > 2 &&
    convertNums(leftBook.height) >
      convertNums(books.left[books.left.length - 3].height)
  ) {
    leftTilt = false;
  }

  if (
    rightTilt &&
    books.right.length > 1 &&
    convertNums(rightBook.height) > convertNums(books.right[1].height)
  ) {
    rightTilt = false;
  }
  if (
    rightTilt &&
    books.right.length > 2 &&
    convertNums(rightBook.height) > convertNums(books.right[2].height)
  ) {
    rightTilt = false;
  }

  // finally, if both can be tilted and there's only room for one, determine which
  if (leftTilt && rightTilt && available >= 30 && available < 50) {
    if (leftRoom === rightRoom) {
      if (books.right.length > books.left.length) leftTilt = false;
      else rightTilt = false;
    } else {
      leftTilt = leftRoom > rightRoom;
      rightTilt = !leftTilt;
    }
  }

  return { left: leftTilt, right: rightTilt };
}

export function calcTilt(position, height, width) {
  const heightNum =
    height === "tall" || height === "medium" || height === "short"
      ? heights[height]
      : parseInt(height);
  const widthNum =
    width === "thick" || width === "mid" || width === "thin"
      ? thicknesses[width]
      : parseInt(width);

  const radians = (5 * Math.PI) / 180;
  const sine = Math.sin(radians);
  const cosine = Math.cos(radians);

  const horizDisplacement = Math.floor(
    (sine * heightNum + cosine * widthNum - widthNum) / 2
  );
  const vertDisplacement = Math.floor(
    (sine * widthNum + cosine * heightNum - heightNum) / 2
  );

  return `rotate(${position === "left" ? "-5deg" : "5deg"}) translate(${
    position === "right" ? "-" : ""
  }${horizDisplacement}px,-${vertDisplacement}px)`;
}
