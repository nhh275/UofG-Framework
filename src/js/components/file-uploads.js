(() => {
  document.querySelectorAll('.zh-file-upload').forEach((component) => {
    const fileInput = component.querySelector('.zh-file-upload__input');
    const filenameSpan = component.querySelector('.zh-file-upload__filename');
    const triggerButton = component.querySelector('.zh-file-upload__button');

    if (!fileInput || !filenameSpan || !triggerButton) return;

    triggerButton.addEventListener('click', () => {
      if (!fileInput.disabled) {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        filenameSpan.textContent = fileInput.files[0].name;
      } else {
        filenameSpan.textContent = 'No file chosen';
      }
    });
  });
})();