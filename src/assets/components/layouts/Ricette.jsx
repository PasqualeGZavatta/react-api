import { useState, useEffect } from "react";

export default function Ricette() {
  const [ricette, setRicette] = useState([]);
  const [visible, setVisible] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchRicette() {
      // Fake delay

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLoading(true);
        setError(null);

        await new Promise((resolve) => setTimeout(resolve, 4000));

        const response = await fetch("https://dummyjsonss.com/recipes");
        if (!response.ok) {
          throw new Error("Errore, riprovare piu tardi!");
        }

        const data = await response.json();
        setRicette(data.recipes);
      } catch (e) {
        e.message = setError("Errore, riprovare piu tardi!");
      } finally {
        setLoading(false);
      }
    }
    fetchRicette();
  }, []);

  function handleRicetta(id) {
    if (visible.includes(id)) {
      setVisible(visible.filter((value) => value !== id));
    } else {
      setVisible([...visible, id]);
    }
  }

  return (
    <>
      <div className={`container text-center mt-5 ${loading ? "" : "d-none"}`}>
        <h4>
          Loading:{" "}
          <div
            className="spinner-border "
            role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </h4>
      </div>

      {error && (
        <div className="container mt-5">
          <div
            className="alert alert-danger text-center"
            role="alert">
            {error}
          </div>
        </div>
      )}

      <div className="container mb-3">
        <h3 className="text-center m-2">Elenco ricette</h3>
        <div className="row row-cols-3 g-4">
          {ricette.map((recipe) => (
            <div
              key={recipe.id}
              className="col">
              <div className="card ">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.name}></img>
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <h6 className="">
                    Difficulty:{" "}
                    <span className="text-success"> {recipe.difficulty}</span>
                  </h6>
                  <h6>Ingredients</h6>
                  <ul className="">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="">
                        {ingredient}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="btn btn-primary"
                    onClick={() => handleRicetta(recipe.id)}>
                    {`${visible.includes(recipe.id) ? "Chiudi Ricetta" : "Apri Ricetta"}`}
                  </button>
                  <p>{`${visible.includes(recipe.id) ? recipe.instructions : ""}`}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
