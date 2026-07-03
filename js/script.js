/* DD Création — script principal */

// ----- Menu mobile -----
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// ----- Animation "impression couche par couche" (page d'accueil) -----
const printObject = document.getElementById('printObject');
if (printObject) {
  // Profil d'un vase : largeur de chaque couche en px, de bas en haut
  const profile = [150, 160, 168, 172, 170, 162, 148, 130, 112, 98, 90, 88, 92, 104, 118];
  const buildLayers = () => {
    printObject.innerHTML = '';
    profile.forEach((width, i) => {
      const layer = document.createElement('div');
      layer.className = 'layer';
      layer.style.width = width + 'px';
      layer.style.animationDelay = (i * 0.22) + 's';
      printObject.appendChild(layer);
    });
  };
  buildLayers();
  // L'objet se ré-imprime en boucle toutes les 8 secondes
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) setInterval(buildLayers, 8000);
}

// ----- Zone de dépôt du fichier STL (page contact) -----
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fichier');
const dzFile = document.getElementById('dzFile');
if (dropzone && fileInput && dzFile) {
  const showFile = (file) => {
    if (!file) return;
    const sizeMo = (file.size / (1024 * 1024)).toFixed(1);
    dzFile.textContent = `📎 ${file.name} (${sizeMo} Mo)`;
    if (file.size > 10 * 1024 * 1024) {
      dzFile.textContent += ' — ⚠️ fichier > 10 Mo : préférez un lien de partage';
    }
  };

  fileInput.addEventListener('change', () => showFile(fileInput.files[0]));

  ['dragover', 'dragenter'].forEach(evt =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    })
  );
  ['dragleave', 'drop'].forEach(evt =>
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    })
  );
  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files.length) {
      fileInput.files = e.dataTransfer.files;
      showFile(fileInput.files[0]);
    }
  });
  dropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput.click();
    }
  });
}

// ----- Formulaire de paiement (en attente d'intégration bancaire) -----
const paymentForm = document.getElementById('paymentForm');
if (paymentForm) {
  paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Une fois Stripe ou PayPal intégré, remplacer ce message par
    // le déclenchement du paiement (voir commentaires dans paiement.html).
    alert(
      "Le paiement en ligne sera bientôt disponible.\n\n" +
      "En attendant, merci de suivre les instructions de règlement " +
      "figurant sur votre devis (virement ou paiement à la remise de l'objet)."
    );
  });
}
