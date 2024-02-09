document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour créer une carte de portfolio
    function createPortfolioCard(mission, competences, description, links) {
        const card = document.createElement('div');
        card.classList.add('portfolio-card');

        // Création de la partie supérieure de la carte avec l'image et le nom de la mission

        const cover = document.createElement('div');
        cover.classList.add('mission-cover');
        card.appendChild(cover);

        const coverImage = document.createElement('img');
        coverImage.src = links.couverture;
        coverImage.alt = mission;
        cover.appendChild(coverImage);

        const overlay = document.createElement('div');
        overlay.classList.add('mission-overlay');
        cover.appendChild(overlay);


        const missionName = document.createElement('div');
        missionName.classList.add('mission-name');
        missionName.textContent = mission;
        cover.appendChild(missionName);

        // Création de la liste des compétences utilisées par le projet
        const skillsList = document.createElement('ul');
        skillsList.classList.add('skills-list');
        
        competences.forEach(skill => {
            const skillItem = document.createElement('li');
            skillItem.textContent = skill;
            skillItem.classList.add('skills-items');
            skillsList.appendChild(skillItem);
        });
        
        card.appendChild(skillsList);
        
        const projectDescription = document.createElement('div');
        projectDescription.classList.add('project-description');
        projectDescription.textContent = description;
        card.appendChild(projectDescription);

        // Création des boutons GitHub et Demo (si disponible) avec les liens
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        const githubButton = document.createElement('a');
        githubButton.href = links.github;
        githubButton.textContent = 'GitHub';
        githubButton.target = '_blank';
        buttonsContainer.appendChild(githubButton);

        if (links.demo) {
            const demoButton = document.createElement('a');
            demoButton.href = links.demo;
            demoButton.textContent = 'Demo';
            demoButton.target = '_blank';
            buttonsContainer.appendChild(demoButton);
        }

        card.appendChild(buttonsContainer);

        return card;
    }

    // Fonction pour afficher les cartes de portfolio en fonction des compétences sélectionnées
    function filterPortfolio(skill, button) {

        if (button) {

        const filterButtons = document.getElementById('filter-buttons');

        filterButtons.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('active');
        });

        button.classList.add('active');}


        const portfolioCards = document.getElementById('portfolio-cards');
        portfolioCards.innerHTML = ''; // Efface les cartes existantes

        // Affiche toutes les cartes si la compétence est "All", sinon filtre par compétences
        const filteredData = (skill === 'All') ? portfolioData : portfolioData.filter(item => item.competences.includes(skill));

        filteredData.forEach(item => {
            const card = createPortfolioCard(item.mission, item.competences, item.description, item.links);
            portfolioCards.appendChild(card);
        });
    }

    // Récupère les données du fichier data.json
    fetch('../data.json')
        .then(response => response.json())
        .then(data => {
            portfolioData = data.portfolio;
            const filterButtons = document.getElementById('filter-buttons');

            // Crée un bouton pour chaque compétence et un bouton "All"
            const allButton = document.createElement('button');
            allButton.textContent = 'All';
            allButton.classList.add('active')
            allButton.addEventListener('click', (event) => filterPortfolio('All', event.target));
            filterButtons.appendChild(allButton);

            const uniqueSkills = [...new Set(portfolioData.flatMap(item => item.competences))];
            uniqueSkills.forEach(skill => {
                const button = document.createElement('button');
                button.textContent = skill;
                button.addEventListener('click', (event) => filterPortfolio(skill, event.target));
                filterButtons.appendChild(button);
            });

            

            // Affiche toutes les cartes initialement
            filterPortfolio('All');
        })
        .catch(error => console.error('Error fetching data:', error));
});