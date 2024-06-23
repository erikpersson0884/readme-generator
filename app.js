document.getElementById("githubLink").addEventListener("input", generateReadme);
const readmeResult = document.getElementById('readmeResult');

const inputButtonTitle = document.getElementById('includeTitle');
const inputButtonDescription = document.getElementById('includeDescription');
const inputButtonVersion = document.getElementById('includeVersion');
const inputButtonRepoSize = document.getElementById('includeRepoSize');
const inputButtonLastCommit = document.getElementById('includeLastCommit');
const inputButtonLicense = document.getElementById('includeLicense');

const inputOptions = [inputButtonTitle, inputButtonDescription, inputButtonVersion, inputButtonRepoSize, inputButtonLastCommit, inputButtonLicense];



document.addEventListener("DOMContentLoaded", () => {
    inputOptions.forEach((inputOption) => {
        inputOption.addEventListener('click', () => {
            console.log(inputOption.checked);

            generateReadme();
            localStorage.setItem(inputOption.id, inputOption.checked);
        });
        const cstatus = localStorage.getItem(inputOption.id)
        console.log(cstatus)

        inputOption.checked = cstatus === 'true' ? true : false;
    });
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



    const githubLink = document.getElementById('githubLink').value.trim();
    const repoInfo = extractRepoInfo(githubLink);

    if (!repoInfo) {
        document.getElementById('readmeResult').value = "Invalid GitHub link";
        return;
    }

    const { username, repoName } = repoInfo;

    readmeResult.value = 
`${inputButtonTitle.checked ? `# ${repoName}` : ''}
${inputButtonDescription.checked ? `## ${repoName} is...` : ''}

${inputButtonVersion.checked ? `![Github version](https://img.shields.io/badge/version-0.0.0-darkblue?style=flat-square)` : ''}
${inputButtonRepoSize.checked ? `![GitHub repo size](https://img.shields.io/github/repo-size/${username}/${repoName}?color=blue&style=flat-square)` : ''}
${inputButtonLastCommit.checked ? `![GitHub last commit](https://img.shields.io/github/last-commit/${username}/${repoName}?color=darkgreen&style=flat-square)` : ''}
${inputButtonLicense.checked ? `<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"> ![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey?style=flat-square)</a>

### License:
**Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**` : ''}

`;
}

function copyToClipboard() {
    readmeResult.select();
    document.execCommand('copy');
}