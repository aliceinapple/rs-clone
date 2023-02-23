const collectionPostcard: HTMLElement[][] = [];
const postcardLayout0: HTMLElement[] = [];
const postcardLayout1: HTMLElement[] = [];
const postcardLayout2: HTMLElement[] = [];
const postcardLayout3: HTMLElement[] = [];
const postcardLayoutEmpty: HTMLElement[] = [];
collectionPostcard.push(postcardLayout0, postcardLayout1, postcardLayout2, postcardLayout3, postcardLayoutEmpty);

const collectionLogotype: HTMLElement[][] = [];
const logotypeLayout0: HTMLElement[] = [];
const logotypeLayout1: HTMLElement[] = [];
const logotypeLayout2: HTMLElement[] = [];
const logotypeLayout3: HTMLElement[] = [];
const logotypeLayoutEmpty: HTMLElement[] = [];
collectionPostcard.push(logotypeLayout0, logotypeLayout1, logotypeLayout2, logotypeLayout3, logotypeLayoutEmpty);

const collectionVisitCard: HTMLElement[][] = [];
const visitcardLayout0: HTMLElement[] = [];
const visitcardLayout1: HTMLElement[] = [];
const visitcardLayout2: HTMLElement[] = [];
const visitcardLayout3: HTMLElement[] = [];
const visitcardLayoutEmpty: HTMLElement[] = [];
collectionPostcard.push(visitcardLayout0, visitcardLayout1, visitcardLayout2, visitcardLayout3, visitcardLayoutEmpty);

const collectionResume: HTMLElement[][] = [];
const resumeLayout0: HTMLElement[] = [];
const resumeLayout1: HTMLElement[] = [];
const resumeLayout2: HTMLElement[] = [];
const resumeLayout3: HTMLElement[] = [];
const resumeLayoutEmpty: HTMLElement[] = [];
collectionPostcard.push(resumeLayout0, resumeLayout1, resumeLayout2, resumeLayout3, resumeLayoutEmpty);

export const lastDesigneCollection = [collectionPostcard, collectionLogotype, collectionVisitCard, collectionResume];

const saveUsingLayout = (
  layout0: HTMLElement[],
  layout1: HTMLElement[],
  layout2: HTMLElement[],
  layout3: HTMLElement[],
  layoutEmpty: HTMLElement[],
) => {

  const layout = document.querySelector('.container') as HTMLElement;
  const childrenCount = layout.childElementCount;
  const bcColor = layout.style.backgroundColor;
  const id = layout.getAttribute('id');

  if (id === '0') layout0.push(layout);
  else if (id === '1') layout1.push(layout);
  else if (id === '2') layout2.push(layout);
  else if (id === '3') layout3.push(layout);
  else if (id === 'empty' && childrenCount > 0 || 
          id === 'empty' && childrenCount >= 0 && bcColor !== 'white') layoutEmpty.push(layout);
  else if (id === 'empty' && childrenCount === 0) return;

};

const mainContainer = document.querySelector('.content');
mainContainer?.addEventListener('click', (event) => {
  const item = event.target;
  const clickedItem = item as HTMLElement;

  if (clickedItem.closest('.postcard')) {
    saveUsingLayout(
      postcardLayout0,
      postcardLayout1,
      postcardLayout2,
      postcardLayout3,
      postcardLayoutEmpty,
    );
  }

  if (clickedItem.closest('.logotype')) {
    saveUsingLayout(
      logotypeLayout0,
      logotypeLayout1,
      logotypeLayout2,
      logotypeLayout3,
      logotypeLayoutEmpty,
    );
  }

  if (clickedItem.closest('.visit-card')) {
    saveUsingLayout(
      visitcardLayout0,
      visitcardLayout1,
      visitcardLayout2,
      visitcardLayout3,
      visitcardLayoutEmpty,
    );
  }

  if (clickedItem.closest('.resume')) {
    saveUsingLayout(
      resumeLayout0,
      resumeLayout1,
      resumeLayout2,
      resumeLayout3,
      resumeLayoutEmpty,
    );
  }
});



