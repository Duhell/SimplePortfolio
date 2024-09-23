const LOADING_SCREEN = document.getElementById("loading"); 
const THEME = document.getElementById("theme");
const CERTIFICATES = document.getElementById("display-cert");
const EDUCATIONS = document.getElementById("display-education");
const PROJECTS = document.getElementById("display-projects"); 

const CONTAINERS = ['','getting-started','experience','certificates','education','projects'];
let fetchTheme = localStorage.getItem("theme") || "light";

// THEME
window.addEventListener("DOMContentLoaded", () => {
  LOADING_SCREEN.style.display = 'none';
  document.documentElement.classList.add(fetchTheme);
  fetchCertificates();
  fetchEducations();
  fetchProjects();

  const url = window.location.href;
  const splittedURL = url.split("#");
  
  
});

THEME.addEventListener("change", () => {
  fetchTheme = localStorage.getItem("theme") || "light";
  if (fetchTheme === "dark") {
    document.documentElement.classList.remove(fetchTheme);
  }

  if (fetchTheme === "light") {
    document.documentElement.classList.remove(fetchTheme);
  }
  document.documentElement.classList.add(THEME.value);
  localStorage.setItem("theme", THEME.value);
});

// END THEME


function search(){
  const searchTerm = document.getElementById("Search").value.toLowerCase();
  const contents = document.getElementById('contents');
  const text = contents.innerHTML;

  contents.innerHTML = text.replace(/<mark class="highlight">(.*?)<\/mark>/g, '$1');

  if(searchTerm.length > 0){
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const newText = text.replace(regex, '<mark class="highlight">$1</mark>');
    contents.innerHTML = newText;

    const firstMatched = contents.querySelector(".highlight");
    if(firstMatched){
      firstMatched.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

// CERT
async function fetchCertificates() {
  const response = await fetch("../assets/certificates.json");
  const json = await response.json();

  json.certificates.map((cert) => {
    CERTIFICATES.insertAdjacentHTML(
      "beforeend",
      renderCert(cert.title, cert.course, cert.link, cert.language)
    );
  });
}

// END CERT

async function fetchEducations() {
  const response = await fetch("../assets/educations.json");
  const json = await response.json();

  json.educations.map((edu) => {
    EDUCATIONS.insertAdjacentHTML(
      "beforeend",
      renderCert(edu.course, edu.school, edu.link, edu.year)
    );
  });
}

async function fetchProjects() {
  const response = await fetch("../assets/projects.json");
  const json = await response.json();

  json.projects.map((prj) => {
    PROJECTS.insertAdjacentHTML(
      "beforeend",
      renderProjects(prj.project_name, prj.link, prj.description, prj.img,)
    );
  });
}

function renderCert(title, course, link, lang) {
  return `
    <div class="flex items-start justify-between p-3 border rounded shadow-sm border-slate-100">
          <div class="text-sm leading-none ">
              <p>${title}</p>
              <a href="#"><p>${course}</p></a>
          </div>
        <span class="bg-blue-100 text-cyan-800 text-[0.6rem] font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-cyan-400">${lang}</span>
    </div>`;
}

function renderProjects(project_name, link,  description, img) {
  return `
  <div class="relative overflow-hidden bg-white rounded-lg shadow">
      <div>
        <img src="assets/${img}"
          class="object-cover w-full" alt="thumbnail" />
        </div>
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-black"></div>
      <div class="absolute inset-x-0 bottom-0 z-20 p-4">
          <h3 class="text-xl font-medium text-white">${project_name}</h3>
          <p class="mt-1 text-white text-sm text-opacity-80">
          ${description} <br>
          <a href="${link}" target="_blank" class="text-sm text-blue-500">Visit link </a>
          </p>
      </div>
  </div>
  
  `;
}
