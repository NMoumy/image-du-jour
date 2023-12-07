function avoirNomMois(mois) {
  const nomsMois = [
    "janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."
  ];
  return nomsMois[mois - 1];
}

export function formaterDate(dateString) {
  const annee = dateString.slice(0, 4);
  const mois = parseInt(dateString.slice(4, 6));
  const jour = dateString.slice(6, 8);

  const date = new Date(`${annee}-${mois}-${jour}`);
  const nomJour = new Intl.DateTimeFormat("fr", { weekday: "long" }).format(date);
  const nomMois = avoirNomMois(mois);

  return `${nomJour}, ${jour} ${nomMois} ${annee}`;
}
