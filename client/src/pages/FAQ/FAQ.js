import "./FAQ.css";

export function FAQ({ showLogin, showSignup }) {
  return (
    <main id="faqContainer" className="p-1">
      <h1>
        What is <em>Shelf Life?</em>
      </h1>
      <p>
        <em>Shelf Life</em> is a dedicated book diary with a creative twist.
        Keep track of the books you've read, place them on your virtual
        bookshelves, and rearrange them to your heart's conent by dragging and
        dropping. Customize the look of the books with a series of colors, sizes
        and styles. It's exactly the kind of creative outlet that many book
        lovers crave!
      </p>
      <dl>
        <dt>How do I sign up?</dt>
        <dd>
          You can sign up{" "}
          <a
            href="@"
            onClick={(e) => {
              e.preventDefault();
              showSignup(true);
            }}
          >
            here
          </a>{" "}
          or, if you already have an account, log in{" "}
          <a
            href="@"
            onClick={(e) => {
              e.preventDefault();
              showLogin(true);
            }}
          >
            here
          </a>
          , or utilize the link in the main page navigation. Each account must
          have a unique email address and username. User accounts are free.
        </dd>

        <dt>How do I add a book?</dt>
        <dd>
          Log in, and click the "Add a Book" link in the main navigation. Search
          for a book title or author. From the list of results, click on the
          book you want to add. Then style your book as you would like it to
          look in your bookcase and click the "Save to" button. You will be
          saving the book specifically to the year you were looking at when you
          clicked "Add a Book'.
        </dd>

        <dt>How do I add a book to a different year?</dt>
        <dd>
          Simply change the year menu on either your book list or bookcase page.
          When you add a book, you will be adding it to whichever year is
          currently selected.
        </dd>

        <dt>How do I make the book look how I'd like it?</dt>
        <dd>
          <p>
            You have several styling controls available to you when you add a
            book:
            <ul>
              <li>
                Adjust the colors of the spine and text by clicking the color
                and selecting a new one.
              </li>
              <li>
                Adjust the height and width of the book using the sliding
                controls.
              </li>
              <li>
                Change the appearance of the book by selecting from the "Style"
                menu.
              </li>
              <li>
                Adjust how the title appears on the spine with the "Text size"
                slider, and with the options in the "Title" menu.
              </li>
            </ul>
          </p>

          <p>
            As you alter the style of the book, the live preview above the
            controls will show you how it will look once you have saved it.
          </p>
        </dd>

        <dt>
          Is there a shortcut to making my book look like another book I've
          already added?
        </dt>
        <dd>
          Yes there is! At the top of the book styling panel, you'll see a "Copy
          styles from" menu. This menu will list all of the books you've added
          so far: select any one of them to copy its dimensions and colors as a
          convenient starting point. You can edit the book's style further from
          there.
        </dd>

        <dt>How do I organize my bookcase?</dt>
        <dd>
          <p>
            You organize it how you'd do so in real life: by drag and drop! Each
            shelf has two "stacks": one on the left and one on the right. Drag a
            book into any stack you'd like, rearrage the order of books in a
            stack, move a book from one shelf to another.
          </p>
          <p>
            Each time you add a new book, it will appear in your "unshelved"
            area below the bookcase. Drag it from there to where you'd like it
            (provided there is room on the shelf!)
          </p>

          <p>
            Remove a book from the bookcase by dragging it to the "unshelved"
            area, or simply by double-clicking it. Clear an entire shelf by
            double-clicking on any empty area of the shelf: all of its books
            will be moved to "unshelved".
          </p>
        </dd>

        <dt>Can I delete a book?</dt>
        <dd>
          You can, but only if it is unshelved. From there, single-click on the
          book, and then click the "Give away" link in the pop-up information
          that appears.
        </dd>

        <dt>What about Audiobooks?</dt>
        <dd>
          You can indicate a book was an audiobook by clicking the "Audiobook"
          checkbox when you style your book. The book will be identified both in
          your main list and on your bookcase with a headphones icon.
        </dd>

        <dt>Is there a limit to how many books I can put on my bookcase?</dt>
        <dd>
          No there isn't! Add shelves to your bookcase if you need more space by
          clicking the "Add Shelf" button below it. The only limitation is that
          you cannot add the same book to the same year multiple times. You can,
          however, add the a book both as a text book and an audio book in the
          same year.
        </dd>

        <dt>Can I edit the appearance of a book after I've added it?</dt>
        <dd>No. You would delete the book, and re-add it.</dd>

        <dt>I forgot my username or password. How do I get it back?</dt>
        <dd>
          Unfortunately, <em>Shelf Life</em> is not a fully complete
          application, and there is no way to retrieve your password or easily
          issue you a new one at this time. You could create a new account
          easily, but that account would not have any of your saved books.
        </dd>
      </dl>
    </main>
  );
}
