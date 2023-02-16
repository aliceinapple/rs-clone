const collectionPostcard: HTMLElement[][] = [];
const postcardLayout0: HTMLElement[] = [];
const postcardLayout1: HTMLElement[] = [];
const postcardLayout2: HTMLElement[] = [];
const postcardLayout3: HTMLElement[] = [];
collectionPostcard.push(postcardLayout0, postcardLayout1, postcardLayout2, postcardLayout3);

const collectionLogotype: HTMLElement[][] = [];
const logotypeLayout0: HTMLElement[] = [];
const logotypeLayout1: HTMLElement[] = [];
const logotypeLayout2: HTMLElement[] = [];
const logotypeLayout3: HTMLElement[] = [];
collectionPostcard.push(logotypeLayout0, logotypeLayout1, logotypeLayout2, logotypeLayout3);

const collectionVisitCard: HTMLElement[][] = [];
const visitcardLayout0: HTMLElement[] = [];
const visitcardLayout1: HTMLElement[] = [];
const visitcardLayout2: HTMLElement[] = [];
const visitcardLayout3: HTMLElement[] = [];
collectionPostcard.push(visitcardLayout0, visitcardLayout1, visitcardLayout2, visitcardLayout3);

const collectionResume: HTMLElement[][] = [];
const resumeLayout0: HTMLElement[] = [];
const resumeLayout1: HTMLElement[] = [];
const resumeLayout2: HTMLElement[] = [];
const resumeLayout3: HTMLElement[] = [];
collectionPostcard.push(resumeLayout0, resumeLayout1, resumeLayout2, resumeLayout3);

export const lastDesigneCollection = [collectionPostcard, collectionLogotype, collectionVisitCard, collectionResume];

const saveUsingLayout = (
  layout0: HTMLElement[],
  layout1: HTMLElement[],
  layout2: HTMLElement[],
  layout3: HTMLElement[],
) => {

  const layout = document.querySelector('.container') as HTMLElement;
  const id = layout.getAttribute('id');

  if (id === '0') layout0.push(layout);
  else if (id === '1') layout1.push(layout);
  else if (id === '2') layout2.push(layout);
  else if (id === '3') layout3.push(layout);

};

const mainContainer = document.querySelector('.content');
mainContainer?.addEventListener('click', (event) => {
  const item = event.target;
  const clickedItem = item as HTMLElement;
  console.log(clickedItem);

  if (clickedItem.closest('.postcard') 
    && clickedItem.getAttribute('id') !== 'empty'
    && !clickedItem.closest('.paint-block__wrapper')) {
    saveUsingLayout(
      postcardLayout0,
      postcardLayout1,
      postcardLayout2,
      postcardLayout3,
    );
  }

  if (clickedItem.closest('.logotype') 
    && clickedItem.getAttribute('id') !== 'empty'
    && !clickedItem.closest('.paint-block__wrapper')) {
    saveUsingLayout(
      logotypeLayout0,
      logotypeLayout1,
      logotypeLayout2,
      logotypeLayout3,
    );
  }

  if (clickedItem.closest('.visit-card') 
    && clickedItem.getAttribute('id') !== 'empty'
    && !clickedItem.closest('.paint-block__wrapper')) {
    saveUsingLayout(
      visitcardLayout0,
      visitcardLayout1,
      visitcardLayout2,
      visitcardLayout3,
    );
  }

  if (clickedItem.closest('.resume') 
    && clickedItem.getAttribute('id') !== 'empty'
    && !clickedItem.closest('.paint-block__wrapper')) {
    saveUsingLayout(
      resumeLayout0,
      resumeLayout1,
      resumeLayout2,
      resumeLayout3,
    );
  }
});


