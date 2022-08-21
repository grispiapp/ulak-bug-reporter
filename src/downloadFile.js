export default function downloadFile(blob) {
  const fileUrl = URL.createObjectURL(blob);

  const element = document.createElement('a');
  element.setAttribute('href', fileUrl); //file location
  element.setAttribute('download', blob.name); // file name
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

/*
export default function downloadFile(filename, content, mimeType = 'plain/text') {
  const blob = new Blob([content], { type: mimeType });
  const fileUrl = URL.createObjectURL(blob);

  const element = document.createElement('a');
  element.setAttribute('href', fileUrl); //file location
  element.setAttribute('download', filename); // file name
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
 */
