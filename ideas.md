## ideas creativas

- usar emojis o iconos para los botones de las operaciones.
- Modo oscuro y claro
- Modo científico
- sonidos al presionar botones
- historial de operaciones
- Easter eggs → Agregar alertas/toasts divertidas para ciertos números o combinaciones. Ej:

```react
useEffect(() => {
  if (numeroActual === "007") {
    alert("Agente secreto activado 🕵️‍♂️");
  }
}, [numeroActual]);

```

- diseño retro.
- Personalización de colores → Permitir al usuario personalizar los colores de la calculadora (botones, pantalla, fondo).
- Mostrar datos históricos o curiosidades matemáticas al realizar ciertas operaciones.
- Usar emojis o frases graciosas en lugar de números y operadores. Ej:
  
``` react
const emojis = ["😀", "😂", "😎", "🤔", "😡", "🥳", "😴", "🤯", "😱", "😍"];

return (

  <div>
    {emojis.map((emoji, index) => (
      <button key={index} onClick={() => handleClickNumero(index)}>
        {emoji}
      </button>
    ))}
  </div>
);

```
