import { Draggable } from "@hello-pangea/dnd";

export const dimensions = {
  dragWidth: "30px",
  dragHeight: "30px",
};

const convert = (data) => {
  const converted = {};

  data.shelves.map((shelf, index) => {
    converted[`shelf-left-${index}`] = shelf.left.map((book) => {
      return { id: book.id.toString(), name: `Drag-${book.id}` };
    });
    converted[`shelf-right-${index}`] = shelf.right.map((book) => {
      return { id: book.id.toString(), name: `Drag-${book.id}` };
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
          id: 4,
        },
        {
          title: "FOTR",
          author: "J.R.R. Tolkien",
          color: "blue",
          id: 1,
        },
        {
          title: "TTT",
          author: "J.R.R. Tolkien",
          color: "green",
          id: 2,
        },
        {
          title: "ROTK",
          author: "J.R.R. Tolkien",
          color: "green",
          id: 3,
        },
      ],
      right: [
        {
          title: "Stormbringer",
          author: "Michael Moorcock",
          color: "red",
          id: 7,
        },
        {
          title: "Lord Foul's Bane",
          author: "Stephen R. Donaldson",
          color: "orange",
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
          id: 9,
        },
        {
          title: "TPTP",
          author: "Stephen R. Donaldson",
          color: "green",
          id: 10,
        },
        {
          title: "The Wounded Land",
          author: "Stephen R. Donaldson",
          color: "purple",
          id: 11,
        },
        {
          title: "White Gold Wielder",
          author: "Stephen R. Donaldson",
          color: "yellow",
          id: 13,
        },
      ],
      right: [
        {
          title: "The Hobbit",
          author: "J.R.R. Tolkien",
          color: "white",
          id: 6,
        },
        {
          title: "The Sword of Shannara",
          author: "Terry Brooks",
          color: "black",
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
          id: 14,
        },
        {
          title: "Adv. in the Scr. Trade",
          author: "William Goldman",
          color: "red",
          id: 15,
        },
        {
          title: "Moneyball",
          author: "Michael Lewis",
          color: "green",
          id: 16,
        },
      ],
      right: [
        {
          title: "The Big Short",
          author: "Michael Lewis",
          color: "black",
          id: 17,
        },
        {
          title: "The One Tree",
          author: "Stephen R. Donaldson",
          color: "blue",
          id: 12,
        },

        {
          title: "I, Robot",
          author: "Isaac Asimov",
          color: "red",
          id: 11,
        },
      ],
    },
  ],
};

export const control = convert(fakedata);

export function SampleDrag(Props) {
  const draggables = Props.elements.map((draggable, index) => {
    return (
      <Draggable draggableId={draggable.id} key={draggable.id} index={index}>
        {(provided, snapshot) => (
          <li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {draggable.name}
          </li>
        )}
      </Draggable>
    );
  });
  return draggables;
}

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
