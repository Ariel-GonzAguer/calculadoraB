// hooks
import { useState, useEffect } from "react";

// scripts
import { sumar, restar, multiplicar, dividir } from "../scripts/operaciones.js";

export default function Calculadora() {
  const [numeroActual, setNumeroActual] = useState("");
  const [resultado, setResultado] = useState(0);
  const [operacionActual, setOperacionActual] = useState(null);

  useEffect(() => {
    console.log(numeroActual);
    console.log(resultado);
    console.log(operacionActual);
  }, [numeroActual, resultado, operacionActual]);

  function handleClickNumero(numero) {
    setNumeroActual((prev) => prev + String(numero));
  }

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

  function handleOperacion(event) {
    event.preventDefault();
    const operacion = event.target.innerText;

    if (operacion === "=") {
      setOperacionActual(null); // Finalizar operación
    } else {
      setOperacionActual(operacion); // Guardar la operación seleccionada
    }

    if (numeroActual !== "") {
      const numero = parseFloat(numeroActual);

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

  function handleBorrarTodo() {
    setNumeroActual("");
    setResultado(0);
    setOperacionActual(null);
  }

  return (
    <>
      <h1>Calculadora</h1>
      <section className="calculadora">
        <section className="pantalla"> {numeroActual || resultado} </section>

        <section className="botones">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
            <button
              key={num}
              className={`btn btn-${num}`}
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
          <button className="btn btn-random">Rndm</button>
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
          <button className="btn btn-borrar">Borrar</button>
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
