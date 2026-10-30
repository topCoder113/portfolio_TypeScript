const downloadButton = document.querySelector<HTMLButtonElement>('#download-pdf');

downloadButton?.addEventListener('click', () => {
    window.print();
});
