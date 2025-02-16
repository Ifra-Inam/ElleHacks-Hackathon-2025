document.addEventListener("DOMContentLoaded", function () {
    const key = document.getElementById("draggable-key");
    const dropZone = document.getElementById("drop-zone");

    // Drag start
    key.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text", event.target.id);
    });

    // Allow drop
    dropZone.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    // Drop event
    dropZone.addEventListener("drop", (event) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedElementId);

        // Move key to the drop zone
        dropZone.appendChild(draggedElement);
        draggedElement.style.cursor = "default";
    });
});
