const fileInput = document.getElementById('fileUpload');
const filenameSpan = document.querySelector('.zh-file-upload__filename');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    filenameSpan.textContent = fileInput.files[0].name;
  } else {
    filenameSpan.textContent = 'No file chosen';
  }
});