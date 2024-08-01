document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const message_box = document.getElementById('message_box');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'X';
    let gameActive = true;
    
    // Initialise l'état du plateau de jeu (tableau vide)
    let boardState = ['', '', '', '', '', '', '', '', ''];

    // Définit les combinaisons gagnantes possibles
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Function appelée clic sur une cellule
    function handleCellClick(event) {
        // Récupère cellule cliquée
        const clickedCell = event.target;
        
        // Récupère l'index de la cellule cliquée
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // Vérifie si la cellule est déjà occupée ou si le jeu est inactif
        if (boardState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }

        // Met à jour l'état du plateau et le contenu de la cellule avec le symbole du joueur actuel
        boardState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;

        // Vérifie s'il y a un gagnant
        checkForWinner();
    }

    // Function pour vérifier s'il y a un gagnant
    function checkForWinner() {
        let roundWon = false;

        // Parcourt toutes les conditions gagnantes
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            
            // Vérifie si les cellules correspondent à une combinaison gagnante
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        // Si une combinaison gagnante est trouvée
        if (roundWon) {
            // Affiche le message de victoire
            message_box.style.display = "block";
            message.textContent = `Victoire de ${currentPlayer} !`;
            // Met fin au jeu
            gameActive = false;
            return;
        }

        // Si toutes les cellules sont remplies sans gagnant, déclare un match nul
        if (!boardState.includes('')) {
            // Affiche le message de match nul
            message_box.style.display = "block";
            message.textContent = 'Match nul !';
            // Met fin au jeu
            gameActive = false;
            return;
        }

        // Change de joueur
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Fonction pour réinitialiser le jeu
    function resetGame() {
        currentPlayer = 'X'; // Réinitialise le joueur actuel à 'X'
        gameActive = true; // Réactive le jeu
        boardState = ['', '', '', '', '', '', '', '', '']; // Vide le plateau de jeu
        message_box.style.display = "none"; // Cache le message de victoire/nul
        message.textContent = ''; // Vide le texte du message
        cells.forEach(cell => cell.textContent = ''); // Vide toutes les cellules
    }

    // Ajoute un gestionnaire de clic pour chaque cellule
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    
    // Ajoute un gestionnaire de clic pour le bouton de réinitialisation
    resetButton.addEventListener('click', resetGame);
});