// hooks
import { useState } from "react";
import { useEffect } from "react";

// scripts
import {
  sumar,
  restar,
  multiplicar,
  dividir,
  random,
} from "../scripts/operaciones.js";

// componentes
import confetti from "canvas-confetti";

export default function Calculadora() {
  const [numeroActual, setNumeroActual] = useState("");
  const [resultado, setResultado] = useState(0);
  const [operacionActual, setOperacionActual] = useState(null);

  useEffect(() => {
    if (resultado === 2021) {
      confetti();
    }
  }, [resultado]);

  function calcularResultado(prevResultado, numero, operacion) {
    switch (operacion) {
      case "+":
        return sumar(prevResultado, numero);
      case "-":
        return restar(prevResultado, numero);
      case "x":
        return multiplicar(prevResultado, numero);
      case "/":
        return dividir(prevResultado, numero);
      default:
        return prevResultado;
    }
  }

  function handleClickNumero(numero) {
    setNumeroActual((prev) => prev + String(numero));
  }

  function handleOperacion(event) {
    event.preventDefault();
    const operacion = event.target.innerText;

    if (operacion === "=") {
      setOperacionActual(null); // Finalizar operación
    } else {
      setOperacionActual(operacion); // Guardar la operación seleccionada
    }

    if (numeroActual !== "") {
      const numero = parseFloat(numeroActual) || 0;

      if (operacionActual) {
        // Realizar la operación acumulada
        const nuevoResultado = calcularResultado(
          resultado,
          numero,
          operacionActual
        );
        setResultado(nuevoResultado);
      } else {
        // Si no hay operación previa, usar el número actual como resultado inicial
        setResultado(numero);
      }

      setNumeroActual(""); // Reiniciar el número actual
    }
  }

  function handleBorrarUltimo() {
    setNumeroActual((prev) => prev.slice(0, -1));
  }

  function handleBorrarTodo() {
    setNumeroActual("");
    setResultado(0);
    setOperacionActual(null);
  }

  function handleRandom() {
    const numero = random();
    setNumeroActual(numero.toString());
  }

  return (
    <>
      <section className="calculadora">
        <section className="pantalla"> {numeroActual || resultado} </section>

        <section className="botones">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              className={`btn btn-num`}
              onClick={() => handleClickNumero(num)}
            >
              {num}
            </button>
          ))}
          <button
            className="btn btn-punto"
            onClick={() => handleClickNumero(".")}
          >
            .
          </button>
          <button className="btn btn-random" onClick={handleRandom}>
            Rndm
          </button>
          <button
            className="btn btn-sumar"
            onClick={(event) => handleOperacion(event)}
          >
            +
          </button>
          <button
            className="btn btn-restar"
            onClick={(event) => handleOperacion(event)}
          >
            -
          </button>
          <button
            className="btn btn-multiplicar"
            onClick={(event) => handleOperacion(event)}
          >
            x
          </button>
          <button
            className="btn btn-dividir"
            onClick={(event) => handleOperacion(event)}
          >
            /
          </button>
          <button
            className="btn btn-evaluar"
            onClick={(event) => handleOperacion(event)}
          >
            =
          </button>
          <button className="btn btn-borrar" onClick={handleBorrarUltimo}>
            Borrar
          </button>
          <button
            className="btn btn-borrar-todo"
            onClick={() => handleBorrarTodo()}
          >
            Borrar todo
          </button>
        </section>
      </section>
    </>
  );
}
