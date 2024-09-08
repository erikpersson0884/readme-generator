document.getElementById("githubLinkInput").addEventListener("input", generateReadme);
const readmeResult = document.getElementById('readmeResult');

const inputButtonTitle = document.getElementById('includeTitle');
const inputButtonDescription = document.getElementById('includeDescription');
const inputButtonVersion = document.getElementById('includeVersion');
const inputButtonRepoSize = document.getElementById('includeRepoSize');
const inputButtonLastCommit = document.getElementById('includeLastCommit');
const inputButtonAuthor = document.getElementById('includeAuthor');
const inputButtonLicense = document.getElementById('includeLicense');

const descriptionOption = document.getElementById('descriptionOption')


const inputOptions = [inputButtonTitle, inputButtonDescription, inputButtonVersion, inputButtonRepoSize, inputButtonLastCommit, inputButtonAuthor, inputButtonLicense];


document.addEventListener("DOMContentLoaded", () => {
    inputOptions.forEach((inputOption) => {
        inputOption.addEventListener('click', () => {
            generateReadme();
            localStorage.setItem(inputOption.id, inputOption.checked);

         });
        const cstatus = localStorage.getItem(inputOption.id)

        inputOption.checked = cstatus === 'true' ? true : false;
    });

    if (!inputButtonLicense.checked) {
        licencesList.classList.add('inactive');
    }

    selectedLicense = JSON.parse(localStorage.getItem('selectedLicense'));
    console.log(selectedLicense);

    if (selectedLicense) {
        document.getElementById(selectedLicense.name).checked = true;
    }
});

inputButtonTitle.addEventListener('click', () => {
    if (!inputButtonTitle.checked) descriptionOption.classList.add('inactive');
    else descriptionOption.classList.remove('inactive');
});





function extractRepoInfo(githubLink) {
    const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\s]+)\/([^\/\s]+)/;
    const githubMatch = githubLink.match(githubRegex);

    // If it's a valid GitHub link, extract the username and repository name
    if (githubMatch) {
        return {
            username: githubMatch[1],
            repoName: githubMatch[2]
        };
    } else {
        // If it's not a valid GitHub link, return the entire input
        return null;
    }
}

function generateReadme() {
    const githubLinkInput = document.getElementById('githubLinkInput').value.trim();
    const repoInfo = extractRepoInfo(githubLinkInput);

    if (!repoInfo) {
        document.getElementById('readmeResult').value = "Invalid GitHub link";
        return;
    }

    const { username, repoName } = repoInfo;

    readmeResult.value = 
`${inputButtonTitle.checked ? `# ${repoName}` : ''}
${inputButtonDescription.checked && inputButtonTitle.checked ? `## ${repoName} is ...` : ''}

${inputButtonVersion.checked ? `![Github version](https://img.shields.io/badge/version-0.0.0-darkblue?style=flat-square)` : ''}
${inputButtonRepoSize.checked ? `![GitHub repo size](https://img.shields.io/github/repo-size/${username}/${repoName}?color=blue&style=flat-square)` : ''}
${inputButtonLastCommit.checked ? `![GitHub last commit](https://img.shields.io/github/last-commit/${username}/${repoName}?color=darkgreen&style=flat-square)` : ''} ${inputButtonAuthor.checked ? `
<a style="text-decoration: none !important; display:inline;" href="https://github.com/${username}">![Github author](https://img.shields.io/badge/Author-${username}-darkred?style=flat-square)</a>` : ''}
${inputButtonLicense.checked ? `<a href="${selectedLicense.url}"> ![License](https://img.shields.io/badge/license-CC%20${selectedLicense.name}-lightgrey?style=flat-square)</a>

### License:
**${selectedLicense.longName}**` : ''}
`;
}

function copyToClipboard() {
    readmeResult.select();
    document.execCommand('copy');
}


document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('githubLinkInput').value = ''; 
    generateReadme(); 
    document.getElementById('readmeResult').value = '';
});







// ########## LICENSE OPTIONS #########

inputButtonLicense.addEventListener('click', () => {
    licencesList.classList.toggle('inactive');

    if (inputButtonLicense.checked) {
    }
});




let creativeCommonsLicences = [
    {
        "name": "CC BY 4.0",
        "longName": "Attribution 4.0 International",
        "url": "https://creativecommons.org/licenses/by/4.0/"
    },
    {
        "name": "CC BY-SA 4.0",
        "longName": "Attribution-ShareAlike 4.0 International",
        "url": "https://creativecommons.org/licenses/by-sa/4.0/"
    },
    {
        "name": "CC BY-NC-SA 4.0",
        "longName": "Attribution-NonCommercial-ShareAlike 4.0 International",
        "url": "https://creativecommons.org/licenses/by-nc-sa/4.0/"
    },
    {
        "name": "CC BY-NC-ND 4.0",
        "longName": "Attribution-NonCommercial-NoDerivatives 4.0 International",
        "url": "https://creativecommons.org/licenses/by-nc-nd/4.0/"
    },
    {
        "name": "CC0 1.0",
        "longName": "Public Domain Dedication",
        "url": "https://creativecommons.org/publicdomain/zero/1.0/"
    }
];
let selectedLicense;


const licencesList = document.getElementById('licencesList');

creativeCommonsLicences.forEach(license => {
    const licenceRadioButton = document.createElement('li');
    licenceRadioButton.innerHTML = `
        <input type="radio" id="${license.name}" class="licenceRadioButton">
        <label for="${license.name}">${license.name}</label>
    `;

    licenceRadioButton.addEventListener('click', () => {
        selectedLicense = license;
        generateReadme();
        uncheckPreviousLicenceButton();
        licenceRadioButton.children[0].checked = true;
        localStorage.setItem('selectedLicense', JSON.stringify(selectedLicense));
    });

    licencesList.appendChild(licenceRadioButton);
});


function uncheckPreviousLicenceButton() {
    const licenceRadioButtons = document.getElementsByClassName('licenceRadioButton');
    for (let i = 0; i < licenceRadioButtons.length; i++) {
        licenceRadioButtons[i].checked = false;
    }
}

