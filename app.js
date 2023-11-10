document.getElementById("githubLink").addEventListener("input", generateReadme);

function generateReadme() {
    const githubLink = document.getElementById('githubLink').value.trim();
    const repoName = extractRepoName(githubLink);

    const readmeTemplate = `
# README.md TEMPLATE
## A template for what ${repoName} repos README.md file should look like

![Github version](https://img.shields.io/badge/version-0.0.0-darkblue?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/${repoName}?color=blue&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/${repoName}?color=darkgreen&style=flat-square)
<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
![Github licence](https://img.shields.io/badge/licence-CC_BY_NC_SA_4.0-blueviolet?style=flat-square)
</a>

### License:
**Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**`;

    document.getElementById('readmeResult').value = readmeTemplate;
}

function extractRepoName(githubLink) {
    const githubRegex = /(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/\s]+)\/([^\/\s]+)/;
    const githubMatch = githubLink.match(githubRegex);

    // If it's a valid GitHub link, use the extracted repository name
    if (githubMatch) {
        return `${githubMatch[1]}/${githubMatch[2]}`;
    } else {
        // If it's not a valid GitHub link, use the entire input as the repository name
        return githubLink;
    }
}

function copyToClipboard() {
    const readmeResult = document.getElementById('readmeResult');
    readmeResult.select();
    document.execCommand('copy');
}
