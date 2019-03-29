(function init() {
  Repos().getRepos();
  getCopyrightYear();
}());

function Repos() {
  const trendyolGithubEndpoint = 'https://api.github.com/users/Trendyol';
  const injectionPointForRepoCards = document.querySelector('.open-source__cards');
  const getMoreReposButton = document.querySelector('.open-source__show-more');
  getMoreReposButton.addEventListener('click', function getMoreRepos(e) {
    getRepos(e);
    if (requestPage * requestSize > publicRepoSize) {
      getMoreReposButton.removeEventListener('click', getMoreRepos);
    }
  });

  const requestSize = 6;
  let requestPage = 1;
  let publicRepoSize = getPublicRepoSize();

  function getPublicRepoSize() {
    fetch(trendyolGithubEndpoint)
      .then(res => res.json())
      .then((data) => {
        publicRepoSize = data.public_repos;
      });
  }

  function getRepos() {
    showLoadingSpinnerInsideButton();
    getRepoInfoFromGithub().then((repos) => {
      repos.forEach((repo) => {
        const repoTemplate = getRepoTemplate(repo);
        const repoTemplateToNode = document.createRange().createContextualFragment(repoTemplate);
        injectNodeToDOM(repoTemplateToNode);
      });
      hideLoadingSpinnerInsideButton();
      requestPage += 1;
    });
  }

  function showLoadingSpinnerInsideButton() {
    getMoreReposButton.classList.add('loading');
    getMoreReposButton.disabled = true;
  }

  function hideLoadingSpinnerInsideButton() {
    getMoreReposButton.classList.remove('loading');
    if (!isLastAvailableRepoPage()) {
      getMoreReposButton.disabled = false;
    }
  }

  function isLastAvailableRepoPage() {
    return requestPage * requestSize > publicRepoSize;
  }

  function getRepoInfoFromGithub() {
    return fetch(
      `${trendyolGithubEndpoint}/repos?page=${requestPage}&per_page=${requestSize}&sort=upload&type=owner`,
    )
      .then(res => res.json())
      .then(data => data);
  }

  function getRepoTemplate({
    description,
    forks_count,
    html_url,
    language,
    name,
    stargazers_count,
  }) {
    if (language === 'C#') language = 'C-Sharp';
    const repoCardTemplate = `
      <a href="${html_url}" class="open-source__card">
          <div class="open-source__card__info">
              <h3 class="open-source__card__title">${name}</h3>
              <p class="open-source__card__exp">
                  ${description || ''}
              </p>
              <div class="open-source__card__interactions">
                ${
  language
    ? `<span class="open-source__card__interaction">
                      <span class="open-source__language open-source__language--${language}"></span>
                      ${language}
                  </span>`
    : ''
}
                  <span class="open-source__card__interaction">
                      <img src="./assets/star.svg" alt="starred" />
                      ${stargazers_count}
                  </span>
                  <span class="open-source__card__interaction">
                      <img src="./assets/fork.svg" alt="starred" />
                      ${forks_count}
                  </span>
              </div>
          </div>
      </a>`;
    return repoCardTemplate;
  }

  function injectNodeToDOM(repoNode) {
    injectionPointForRepoCards.appendChild(repoNode);
  }

  return {
    getRepos,
  };
}

function getCopyrightYear() {
  const copyrightNode = document.querySelector('.footer__copyright');
  const year = new Date().getFullYear();
  copyrightNode.textContent = copyrightNode.textContent.replace('{{yıl}}', year);
}
