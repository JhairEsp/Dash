// main.js
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("aside nav ul li a").forEach(link => {
        link.addEventListener("click", async (e) => {
            e.preventDefault();
            const page = e.target.getAttribute("data-page");
            history.pushState(null, "", e.target.getAttribute("href"));
            cargarPagina(page);
        });
    });
    
    async function cargarPagina(page) {
        const response = await fetch(page);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        document.getElementById("contenido").innerHTML = doc.querySelector("main").innerHTML;
    }
    
    window.addEventListener("popstate", () => {
        const page = location.hash.replace("#", "") + ".html";
        cargarPagina(page);
    });
});
