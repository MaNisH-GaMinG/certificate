// Function to update the footer year
function updateYear() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
}

// Call the function initially to set the year
updateYear();

// Function to fetch and display certificates dynamically
async function fetchCertificates() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/manishshrestha01/Certificates/main/certificate.json');
        const data = await response.json();

        const certificatesContainer = document.getElementById('certificates');

        data.certificates.forEach(cert => {
            // Create elements dynamically
            const certificateDiv = document.createElement('div');
            certificateDiv.classList.add('certificate', 'flex', 'flex-col', 'justify-center', 'items-center');

            const certificateImageDiv = document.createElement('div');
            certificateImageDiv.classList.add('certificate-image');

            const certificateImage = document.createElement('img');
            certificateImage.src = cert.link;
            certificateImage.alt = cert.description;
            certificateImage.loading = 'lazy';

            certificateImage.addEventListener('click', function () {
                openFullscreen(cert.link, cert.description);
            });

            certificateImageDiv.appendChild(certificateImage);

            const certificateDetailsDiv = document.createElement('div');
            certificateDetailsDiv.classList.add('certificate-details', 'text-center', 'rounded-lg', 'p-4');

            const certificateText = document.createElement('p');
            certificateText.textContent = cert.description;

            certificateDetailsDiv.appendChild(certificateText);

            certificateDiv.appendChild(certificateImageDiv);
            certificateDiv.appendChild(certificateDetailsDiv);

            certificatesContainer.appendChild(certificateDiv);
        });
    } catch (error) {
        console.error('Error fetching certificates:', error);
    }
}

// Call fetchCertificates when the DOM content is loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchCertificates();

    // Close fullscreen image on Escape key press
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            closeFullscreen();
        }
    });
});

// Function to open fullscreen image
function openFullscreen(src, alt) {
    const fullscreenDiv = document.createElement('div');
    fullscreenDiv.classList.add('fullscreen');
    fullscreenDiv.innerHTML = `
<span class="close-btn" onclick="closeFullscreen()">×</span>
<img src="${src}" alt="${alt}">
`;
    fullscreenDiv.addEventListener('click', closeFullscreen);
    document.body.appendChild(fullscreenDiv);
    document.body.style.overflow = 'hidden'; // Prevent scrolling background
}

// Function to close fullscreen image
function closeFullscreen() {
    const fullscreenDiv = document.querySelector('.fullscreen');
    if (fullscreenDiv) {
        fullscreenDiv.remove();
        document.body.style.overflow = ''; // Restore scrolling
    }
}
