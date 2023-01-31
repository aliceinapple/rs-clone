const templates: ITemplates[] = [
  { id: 1, src: '../assets/templates/Супер-сага.png', style: 'meow', scope: 'cat', color: 'black', feeling: 'good' },
  { id: 2, src: '../assets/templates/Супер-сага.png', style: 'meow', scope: 'cat', color: 'black', feeling: 'good' },
];
console.log(templates);   
        
interface ITemplates {
  id: number,
  src: string,
  style: string,
  scope: string,
  color: string,
  feeling: string
}