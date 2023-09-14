const idees = [
    { id: 1, titre: "Idée 1", description: "Description pour l'Idée 1", commentaires: [] },
    { id: 2, titre: "Idée 2", description: "Description pour l'Idée 2", commentaires: [] }
];

let idMaxActuel = 2;  // Suivi de l'ID max pour garantir que les nouvelles idées obtiennent un ID unique

document.addEventListener('DOMContentLoaded', () => {
    remplirListeIdees();
});

function voirIdee(element) {
    const idIdee = element.getAttribute('data-id');
    const idee = idees.find(i => i.id == idIdee);

    document.getElementById('liste-idees').classList.add('cache');
    const details = document.getElementById('details-idee');
    details.classList.remove('cache');

    document.getElementById('titre-idee').textContent = idee.titre;
    document.getElementById('description-idee').textContent = idee.description;

    const divCommentaires = document.getElementById('commentaires');
    divCommentaires.innerHTML = '';
    idee.commentaires.forEach(commentaire => {
        const divCommentaire = document.createElement('div');
        divCommentaire.textContent = commentaire;
        divCommentaires.appendChild(divCommentaire);
    });
}

function ajouterCommentaire() {
    const texteCommentaire = document.getElementById('input-commentaire').value;
    if (texteCommentaire) {
        const divCommentaires = document.getElementById('commentaires');
        const divCommentaire = document.createElement('div');
        divCommentaire.textContent = texteCommentaire;
        divCommentaires.appendChild(divCommentaire);
        document.getElementById('input-commentaire').value = ''; // Nettoie l'input
    }
}

function remplirListeIdees() {
    const listeIdees = document.getElementById('liste-idees');
    listeIdees.innerHTML = '';
    idees.forEach(idee => {
        listeIdees.appendChild(creerDivIdee(idee));
    });
}

function creerDivIdee(idee) {
    const divIdee = document.createElement('div');
    divIdee.className = 'idee';
    divIdee.setAttribute('data-id', idee.id);
    divIdee.onclick = function() { voirIdee(divIdee); };

    const titre = document.createElement('h3');
    titre.textContent = idee.titre;
    divIdee.appendChild(titre);

    if (idee.image) {
        const image = document.createElement('img');
        image.src = idee.image;
        image.width = 400;
        divIdee.appendChild(image);
    }

    const description = document.createElement('p');
    description.textContent = idee.description;
    divIdee.appendChild(description);

    

    if (idee.tags) {
        const divTags = document.createElement('div');
        divTags.className = 'tags';
        idee.tags.forEach(tag => {
            const spanTag = document.createElement('span');
            spanTag.className = 'tag';
            spanTag.textContent = tag;
            divTags.appendChild(spanTag);
        });
        divIdee.appendChild(divTags);
    }

    return divIdee;
}

function soumettreIdee() {
    const titre = document.getElementById('input-titre-idee').value;
    const description = document.getElementById('input-description-idee').value;
    const tags = document.getElementById('input-tags').value.split(',').map(tag => tag.trim());

    const imageInput = document.getElementById('input-image');
    let imageUrl = null;
    if (imageInput.files && imageInput.files[0]) {
        imageUrl = URL.createObjectURL(imageInput.files[0]);
    }

    // Ajout d'une idée
    const nouvelleIdee = {
        id: ++idMaxActuel,
        titre: titre,
        description: description,
        tags: tags,
        image: imageUrl,
        commentaires: []
    };
    idees.push(nouvelleIdee);

    remplirListeIdees();

    cacherModalIdee();
    document.getElementById('input-titre-idee').value = '';
    document.getElementById('input-description-idee').value = '';
    document.getElementById('input-tags').value = '';
    document.getElementById('input-image').value = ''; // Nettoie le champ d'entrée de l'image
}


function afficherModalIdee() {
    document.getElementById('modal-idee').classList.remove('cache');
}

function cacherModalIdee() {
    document.getElementById('modal-idee').classList.add('cache');
}

function retournerAListe() {
    document.getElementById('details-idee').classList.add('cache');
    document.getElementById('liste-idees').classList.remove('cache');
}
