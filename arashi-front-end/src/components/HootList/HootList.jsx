import { Link } from "react-router";

const HootList = ({ hoots }) => {
  return (
    <main>
      {hoots.map((hoot) => (
        // Links to a new route showing details of a specific hoot
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <div>
                <h2>{hoot.title}</h2>
              </div>
            </header>
            <p>{hoot.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
};

export default HootList;
