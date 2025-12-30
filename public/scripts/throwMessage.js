const throwMessage = (message, type = "error") => {
    const container = document.getElementById("toast-container");

    const toast = document.createElement("div");
    toast.className = `toast ${type === "success" ? "success" : ""}`;

    toast.innerHTML = `
        <span>${message}</span>
        <span class="close">&times;</span>
    `;

    container.appendChild(toast);

    toast.querySelector(".close").onclick = () => {
        toast.remove();
    };

    setTimeout(() => {
        toast.remove();
    }, 3500);
};
