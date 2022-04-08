//On récupère les informations pour passer la commande
const orderedId = new URL(window.location.href).searchParams.get('id'); 

const displayConfirmation = () => {
    const idOrderSpan = document.querySelector('#orderId')

    console.log(orderedId)
    idOrderSpan.innerHTML = orderedId??"erreur dans les paramètres";  
}

displayConfirmation()

// On supprime le Local Storage
function clearStorage() {
    localStorage.removeItem("orderId");
    localStorage.removeItem("basket");
  }
  clearStorage();