document.getElementById("githubLink").addEventListener("input", generateReadme);

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

    const readmeTemplate = `
# ${repoName}
## ${repoName} is a repository for ...

![Github version](https://img.shields.io/badge/version-0.0.0-darkblue?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/${username}/${repoName}?color=blue&style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/${username}/${repoName}?color=darkgreen&style=flat-square)
<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
![Github licence](https://img.shields.io/badge/licence-CC_BY_NC_SA_4.0-blueviolet?style=flat-square)
</a>

### License:
**Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**`;

    document.getElementById('readmeResult').value = readmeTemplate;
}

function copyToClipboard() {
    const readmeResult = document.getElementById('readmeResult');
    readmeResult.select();
    document.execCommand('copy');
}