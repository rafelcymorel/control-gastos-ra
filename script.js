// ==========================================
// MI CONTROL FINANCIERO 🎀
// ==========================================

// ==========================================
// VARIABLES
// ==========================================

let dineroDisponible =
    Number(localStorage.getItem("dineroDisponible")) || 0;

let totalGastos =
    Number(localStorage.getItem("totalGastos")) || 0;

let ahorroActual =
    Number(localStorage.getItem("ahorroActual")) || 0;

let movimientos =
    JSON.parse(localStorage.getItem("movimientos")) || [];

let metaAhorro =
    Number(localStorage.getItem("metaAhorro")) || 0;

let nombreMeta =
    localStorage.getItem("nombreMeta") || "";

let indiceEditando = null;


// ==========================================
// GUARDAR DATOS
// ==========================================

function guardarDatos() {

    localStorage.setItem(
        "dineroDisponible",
        dineroDisponible
    );

    localStorage.setItem(
        "totalGastos",
        totalGastos
    );

    localStorage.setItem(
        "ahorroActual",
        ahorroActual
    );

    localStorage.setItem(
        "movimientos",
        JSON.stringify(movimientos)
    );

    localStorage.setItem(
        "metaAhorro",
        metaAhorro
    );

    localStorage.setItem(
        "nombreMeta",
        nombreMeta
    );
}


// ==========================================
// ACTUALIZAR RESUMEN
// ==========================================

function actualizarResumen() {

    document.getElementById("dineroDisponible").textContent =
        "RD$ " + dineroDisponible.toFixed(2);

    document.getElementById("totalGastos").textContent =
        "RD$ " + totalGastos.toFixed(2);
}


// ==========================================
// MOSTRAR INGRESO
// ==========================================

function mostrarIngreso() {

    document.getElementById("formularioIngreso").style.display =
        "block";

    document.getElementById("formularioGasto").style.display =
        "none";

    document.getElementById("seccionAhorros").style.display =
        "none";

    document.getElementById("seccionHistorial").style.display =
        "none";
}


// ==========================================
// GUARDAR INGRESO
// ==========================================

function guardarIngreso() {

    const input =
        document.getElementById("montoIngreso");

    const monto = Number(input.value);

    if (isNaN(monto) || monto <= 0) {

        alert("💕 Escribe un monto válido.");

        return;
    }

    dineroDisponible += monto;

    movimientos.push({

        tipo: "💚 Ingreso",

        monto: monto,

        descripcion: "Ingreso de dinero",

        fecha: new Date().toLocaleString()

    });

    input.value = "";

    guardarDatos();

    actualizarResumen();

    mostrarGastos();

    alert("¡Ingreso guardado correctamente! 💕");
}


// ==========================================
// MOSTRAR GASTO
// ==========================================

function mostrarGasto() {

    const formulario =
        document.getElementById("formularioGasto");

    formulario.style.display = "block";

    document.getElementById("formularioIngreso").style.display =
        "none";

    document.getElementById("seccionAhorros").style.display =
        "none";

    document.getElementById("seccionHistorial").style.display =
        "none";
}


// ==========================================
// GUARDAR GASTO
// ==========================================

function guardarGasto() {

    const montoInput =
        document.getElementById("montoGasto");

    const categoriaInput =
        document.getElementById("categoriaGasto");

    const monto = Number(montoInput.value);

    const categoria = categoriaInput.value;

    if (isNaN(monto) || monto <= 0) {

        alert("💕 Escribe un monto válido.");

        return;
    }

    if (categoria === "") {

        alert("💕 Selecciona una categoría.");

        return;
    }

    if (monto > dineroDisponible) {

        alert("💗 No tienes suficiente dinero disponible.");

        return;
    }

    dineroDisponible -= monto;

    totalGastos += monto;

    movimientos.push({

        tipo: "💸 Gasto",

        monto: monto,

        descripcion: categoria,

        fecha: new Date().toLocaleString()

    });

    montoInput.value = "";

    categoriaInput.value = "";

    guardarDatos();

    actualizarResumen();

    mostrarGastos();

    alert("¡Gasto registrado correctamente! 💕");
}


// ==========================================
// MOSTRAR AHORROS
// ==========================================

function mostrarAhorros() {

    document.getElementById("seccionAhorros").style.display =
        "block";

    document.getElementById("formularioIngreso").style.display =
        "none";

    document.getElementById("formularioGasto").style.display =
        "none";

    document.getElementById("seccionHistorial").style.display =
        "none";

    mostrarMeta();
}


// ==========================================
// GUARDAR META
// ==========================================

function guardarMeta() {

    const nombre =
        document.getElementById("nombreMeta").value.trim();

    const meta =
        Number(
            document.getElementById("metaAhorro").value
        );

    const ahorroInicial =
        Number(
            document.getElementById("ahorroActual").value
        ) || 0;


    if (nombre === "") {

        alert("💕 Escribe el nombre de tu meta.");

        return;
    }

    if (isNaN(meta) || meta <= 0) {

        alert("💕 Escribe una cantidad válida para tu meta.");

        return;
    }

    if (ahorroInicial < 0) {

        alert("💕 El ahorro no puede ser negativo.");

        return;
    }

    nombreMeta = nombre;

    metaAhorro = meta;

    ahorroActual = ahorroInicial;

    guardarDatos();

    mostrarMeta();

    alert("¡Tu meta de ahorro fue guardada! 🎀");
}


// ==========================================
// MOSTRAR META
// ==========================================

function mostrarMeta() {

    const resultado =
        document.getElementById("resultadoAhorro");

    if (!nombreMeta || metaAhorro <= 0) {

        resultado.innerHTML = `
            <p>💕 Todavía no tienes una meta de ahorro.</p>
        `;

        return;
    }

    let porcentaje =
        (ahorroActual / metaAhorro) * 100;

    if (porcentaje > 100) {

        porcentaje = 100;
    }

    resultado.innerHTML = `
        <div class="meta-guardada">

            <h3>🎀 ${nombreMeta}</h3>

            <p>
                Has ahorrado:
                <strong>
                    RD$ ${ahorroActual.toFixed(2)}
                </strong>
            </p>

            <p>
                Meta:
                <strong>
                    RD$ ${metaAhorro.toFixed(2)}
                </strong>
            </p>

            <div class="barra-progreso">

                <div
                    class="progreso"
                    style="width: ${porcentaje}%"
                ></div>

            </div>

            <p>
                ${porcentaje.toFixed(1)}% completado 💕
            </p>

        </div>
    `;
}


// ==========================================
// CONFIRMAR AHORRO
// ==========================================

function confirmarAhorro() {

    const input =
        document.getElementById("cantidadAhorro");

    const monto = Number(input.value);

    if (isNaN(monto) || monto <= 0) {

        alert("💕 Escribe una cantidad válida.");

        return;
    }

    if (metaAhorro <= 0) {

        alert("🎀 Primero debes crear una meta de ahorro.");

        return;
    }

    if (monto > dineroDisponible) {

        alert("💗 No tienes suficiente dinero disponible.");

        return;
    }

    dineroDisponible -= monto;

    ahorroActual += monto;

    movimientos.push({

        tipo: "💗 Ahorro",

        monto: monto,

        descripcion: "Dinero agregado a ahorros",

        fecha: new Date().toLocaleString()

    });

    input.value = "";

    guardarDatos();

    actualizarResumen();

    mostrarMeta();

    mostrarGastos();

    alert("¡Dinero agregado a tus ahorros! 💗");
}


// ==========================================
// MOSTRAR HISTORIAL
// ==========================================

function mostrarHistorial() {

    document.getElementById("seccionHistorial").style.display =
        "block";

    document.getElementById("formularioIngreso").style.display =
        "none";

    document.getElementById("formularioGasto").style.display =
        "none";

    document.getElementById("seccionAhorros").style.display =
        "none";

    mostrarGastos();
}


// ==========================================
// MOSTRAR MOVIMIENTOS
// ==========================================

function mostrarGastos() {

    const lista =
        document.getElementById("listaGastos");

    if (movimientos.length === 0) {

        lista.innerHTML = `
            <p>No hay movimientos registrados.</p>
        `;

        return;
    }

    lista.innerHTML = "";

    movimientos.forEach((movimiento, indice) => {

        let icono = "";

        if (movimiento.tipo === "💚 Ingreso") {

            icono = "🟢 INGRESO";

        } else if (movimiento.tipo === "💗 Ahorro") {

            icono = "💗 AHORRO";

        } else {

            icono = "🔴 GASTO";
        }


        const elemento =
            document.createElement("div");

        elemento.className = "movimiento";


        // ==========================================
        // MODO EDICIÓN
        // ==========================================

        if (indice === indiceEditando) {

            elemento.innerHTML = `

                <div class="info-movimiento">

                    <strong>
                        ${icono}
                    </strong>

                    <p>
                        ${movimiento.descripcion}
                    </p>

                    <small>
                        ${movimiento.fecha}
                    </small>

                </div>


                <div class="monto-movimiento">

                    <input
                        type="number"
                        id="montoEdicion${indice}"
                        value="${Number(movimiento.monto)}"
                        min="0.01"
                        step="0.01"
                    >

                    <div class="acciones">

                        <button
                            onclick="guardarEdicion(${indice})"
                        >
                            💾
                        </button>

                        <button
                            onclick="cancelarEdicion()"
                        >
                            ❌
                        </button>

                    </div>

                </div>

            `;

        } else {

            // ==========================================
            // MODO NORMAL
            // ==========================================

            elemento.innerHTML = `

                <div class="info-movimiento">

                    <strong>
                        ${icono}
                    </strong>

                    <p>
                        ${movimiento.descripcion}
                    </p>

                    <small>
                        ${movimiento.fecha}
                    </small>

                </div>


                <div class="monto-movimiento">

                    <strong>
                        RD$ ${Number(movimiento.monto).toFixed(2)}
                    </strong>

                    <div class="acciones">

                        <button
                            onclick="editarMovimiento(${indice})"
                        >
                            ✏️
                        </button>

                        <button
                            onclick="eliminarMovimiento(${indice})"
                        >
                            🗑️
                        </button>

                    </div>

                </div>

            `;
        }


        lista.appendChild(elemento);

    });


    // Poner el cursor en el campo de edición

    if (indiceEditando !== null) {

        const input =
            document.getElementById(
                "montoEdicion" + indiceEditando
            );

        if (input) {

            input.focus();

            input.select();
        }
    }
}


// ==========================================
// EDITAR MOVIMIENTO
// ==========================================

function editarMovimiento(indice) {

    const movimiento =
        movimientos[indice];

    if (!movimiento) {

        alert("No se encontró el movimiento.");

        return;
    }

    indiceEditando = indice;

    mostrarGastos();
}


// ==========================================
// GUARDAR EDICIÓN
// ==========================================

function guardarEdicion(indice) {

    const movimiento =
        movimientos[indice];

    if (!movimiento) {

        alert("No se encontró el movimiento.");

        return;
    }

    const input =
        document.getElementById(
            "montoEdicion" + indice
        );

    if (!input) {

        return;
    }

    const nuevoMonto =
        Number(input.value);

    if (
        !Number.isFinite(nuevoMonto) ||
        nuevoMonto <= 0
    ) {

        alert("💕 Escribe un monto válido.");

        return;
    }

    const montoAnterior =
        Number(movimiento.monto);

    const diferencia =
        nuevoMonto - montoAnterior;


    // ==========================================
    // EDITAR GASTO
    // ==========================================

    if (movimiento.tipo === "💸 Gasto") {

        if (diferencia > dineroDisponible) {

            alert(
                "💗 No tienes suficiente dinero disponible."
            );

            return;
        }

        dineroDisponible -= diferencia;

        totalGastos += diferencia;
    }


    // ==========================================
    // EDITAR INGRESO
    // ==========================================

    else if (movimiento.tipo === "💚 Ingreso") {

        if (
            diferencia < 0 &&
            Math.abs(diferencia) > dineroDisponible
        ) {

            alert(
                "💗 No puedes reducir este ingreso porque ese dinero ya no está disponible."
            );

            return;
        }

        dineroDisponible += diferencia;
    }


    // ==========================================
    // EDITAR AHORRO
    // ==========================================

    else if (movimiento.tipo === "💗 Ahorro") {

        if (diferencia > dineroDisponible) {

            alert(
                "💗 No tienes suficiente dinero disponible."
            );

            return;
        }

        dineroDisponible -= diferencia;

        ahorroActual += diferencia;
    }


    movimiento.monto =
        nuevoMonto;

    indiceEditando = null;

    guardarDatos();

    actualizarResumen();

    mostrarMeta();

    mostrarGastos();

    alert(
        "¡Movimiento editado correctamente! 🎀"
    );
}


// ==========================================
// CANCELAR EDICIÓN
// ==========================================

function cancelarEdicion() {

    indiceEditando = null;

    mostrarGastos();
}


// ==========================================
// ELIMINAR MOVIMIENTO
// ==========================================

function eliminarMovimiento(indice) {

    const movimiento =
        movimientos[indice];

    if (!movimiento) {

        return;
    }

    const confirmar =
        confirm(
            "¿Seguro que quieres eliminar este movimiento? 🥺"
        );

    if (!confirmar) {

        return;
    }


    // ==========================================
    // DEVOLVER DINERO
    // ==========================================

    if (movimiento.tipo === "💚 Ingreso") {

        dineroDisponible -=
            Number(movimiento.monto);

    } else if (movimiento.tipo === "💸 Gasto") {

        dineroDisponible +=
            Number(movimiento.monto);

        totalGastos -=
            Number(movimiento.monto);

    } else if (movimiento.tipo === "💗 Ahorro") {

        dineroDisponible +=
            Number(movimiento.monto);

        ahorroActual -=
            Number(movimiento.monto);
    }


    // Eliminar

    movimientos.splice(indice, 1);

    indiceEditando = null;

    guardarDatos();

    actualizarResumen();

    mostrarMeta();

    mostrarGastos();

    alert(
        "Movimiento eliminado correctamente. 🗑️"
    );
}


// ==========================================
// CARGAR DATOS AL ABRIR LA APP
// ==========================================

function cargarDatos() {

    actualizarResumen();

    mostrarMeta();

    mostrarGastos();

    document.getElementById(
        "formularioIngreso"
    ).style.display = "none";

    document.getElementById(
        "formularioGasto"
    ).style.display = "none";

    document.getElementById(
        "seccionAhorros"
    ).style.display = "none";

    document.getElementById(
        "seccionHistorial"
    ).style.display = "none";
}


// ==========================================
// INICIAR APP
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        cargarDatos();

    }
);