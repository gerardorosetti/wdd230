const currentDate = new Date();
const currentYear = currentDate.getFullYear();
document.querySelector('.footer-year').textContent = currentYear;

document.querySelector('.last-updated').textContent = `Last Updated: ${document.lastModified}`
