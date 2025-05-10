function openFileManager() {
        document.getElementById('fileManagerModal').style.display = 'block';
    }

    function closeFileManager() {
        document.getElementById('fileManagerModal').style.display = 'none';
    }

    function handleFileUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('codeEditor').textContent = e.target.result;
                updateDataUrl();
                closeFileManager();
            };
            reader.readAsText(file);
        } else {
            alert("Please upload a valid HTML file.");
        }
    }

    function downloadFile() {
    // Ask the user for a filename
    let filename = prompt("Please enter a filename for your file:", "untitled.html");

    // If the user didn't cancel or leave it empty, proceed
    if (filename) {
        // Get the content of the code editor (make sure it's the correct content type)
        const code = document.getElementById('codeEditor').textContent;

        // Create a Blob with the content (adjust MIME type if needed)
        const blob = new Blob([code], { type: 'text/html' });

        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename; // Set the filename to the user input
        link.click();
    }
}


    function updateDataUrl() {
    const code = document.getElementById('codeEditor').textContent.trim(); // Trim whitespace
    const encoding = document.getElementById('encodingSelector').value;
    let dataUrl;

    if (encoding === 'base64') {
        try {
            // Normalize the string by replacing newlines and encoding in Base64
            const normalizedCode = code.replace(/\r?\n/g, '');
            dataUrl = 'data:text/html;base64,' + btoa(normalizedCode);
        } catch (error) {
            console.error('Error encoding to Base64:', error);
            dataUrl = 'Error: Unable to encode content to Base64.';
        }
    } else if (encoding === 'hex') {
        dataUrl = 'data:text/html,' + [...code].map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join('');
    } else if (encoding === 'utf8') {
        dataUrl = 'data:text/html;charset=utf-8,' + encodeURIComponent(code);
    } else if (encoding === 'url') {
        dataUrl = 'data:text/html,' + encodeURIComponent(code);
    }

    document.getElementById('dataUrlDisplay').textContent = dataUrl;
}

    function copyDataUrl() {
        const dataUrl = document.getElementById('dataUrlDisplay').textContent;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(dataUrl).then(function() {
                alert('Data URL copied to clipboard');
            }).catch(function(error) {
                console.error('Error copying text: ', error);
                alert('Failed to copy Data URL');
            });
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = dataUrl;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert('Data URL copied to clipboard');
        }
    }

    function openAboutModal() {
        document.getElementById('aboutModal').style.display = 'block';
    }

    function closeAboutModal() {
        document.getElementById('aboutModal').style.display = 'none';
    }

    function toggleFullscreen() {
        const editor = document.getElementById('codeEditor');
        if (!document.fullscreenElement) {
            editor.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
