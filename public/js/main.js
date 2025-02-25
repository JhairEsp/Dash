document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ main.js cargado correctamente");

    const contenido = document.getElementById("contenido");
    if (!contenido) {
        console.error("❌ Error: No se encontró el elemento #contenido.");
        return;
    }

    document.querySelectorAll("aside nav ul li a").forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const page = e.target.getAttribute("data-page");
            const url = `../views/${page}`;

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Error al cargar ${page}`);

                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const nuevoContenido = doc.querySelector("main");

                if (!nuevoContenido) throw new Error("No se encontró <main> en la página cargada.");

                contenido.innerHTML = nuevoContenido.innerHTML;
                history.pushState(null, "", `#${page.replace(".html", "")}`);
            } catch (error) {
                console.error("❌ Error al cargar la página:", error);
                contenido.innerHTML = `<p style="color:red;">Error al cargar la página.</p>`;
            }
        });
    });

    // Manejar navegación con botones de retroceso/avance del navegador
    window.addEventListener("popstate", () => {
        const page = location.hash.replace("#", "") + ".html";
        if (page !== ".html") cargarPagina(`../views/${page}`);
    });

    async function cargarPagina(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error al cargar ${url}`);

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const nuevoContenido = doc.querySelector("main");

            if (!nuevoContenido) throw new Error("No se encontró <main> en la página cargada.");

            contenido.innerHTML = nuevoContenido.innerHTML;
        } catch (error) {
            console.error("❌ Error al cargar la página:", error);
            contenido.innerHTML = `<p style="color:red;">Error al cargar la página.</p>`;
        }
    }

    // Cargar la página correspondiente si hay un hash en la URL al cargar
    if (location.hash) {
        const page = location.hash.replace("#", "") + ".html";
        cargarPagina(`../views/${page}`);
    }
});
