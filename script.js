// Get all draggable words and dropzones
const draggables = document.querySelectorAll('.draggable');
const dropzones = document.querySelectorAll('.dropzone');

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', (event) => {
    draggable.classList.add('dragging');
    // Set the data being dragged (the word)
    event.dataTransfer.setData('text/plain', draggable.getAttribute('data-word'));
  });

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging');
  });
});

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropzone.classList.add('over');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('over');
  });

  dropzone.addEventListener('drop', (event) => {
    event.preventDefault();
    dropzone.classList.remove('over');
    
    // Retrieve the dragged word
    const draggedWord = event.dataTransfer.getData('text/plain');
    const targetWord = dropzone.getAttribute('data-word');
    
    // Check if the dragged word matches the dropzone's data-word
    if (draggedWord === targetWord) {
      // If match, add a label to the dropzone or any visual cue
      dropzone.innerHTML = `<p>${draggedWord}</p>`;
      dropzone.classList.add('matched');
      // Remove the draggable element from the word container
      const matchedElement = document.querySelector(`.draggable[data-word="${draggedWord}"]`);
      if (matchedElement) {
        matchedElement.remove();
      }
    } else {
      // Optionally, give feedback for an incorrect match
      alert('Oops, try again!');
    }
  });
});

