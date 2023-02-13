export interface MainCardTemplate {
  width: string;
  height: string;
}

export interface ITemplates {
  id: number;
  src: string;
  style: string;
  scope: string;
  color: string;
  textColor: string;
  textSize: string;
}

export interface User {
  authorization: boolean,
  id: number,
  name: string,
  login: string,
  email: string,
  password: string,
  templates: string[][];
}

export interface ILogoParameters {
  name: string;
  scope: string;
  color: string;
  style: string;
}

export interface IImage {
  image: HTMLImageElement;
}

export interface ILayoutTemplate {
  createEmptyTemplate: (size: MainCardTemplate) => HTMLDivElement;
  render: (id: string, cards: HTMLDivElement[]) => HTMLDivElement;
}

export interface ICreateTemplate extends ILayoutTemplate {
  allTemplates: () => HTMLDivElement[];
}
