export interface MainCardTemplate {
  width: string;
  height: string;
}

export interface ITemplates {
  id: number,
  src: string,
  style: string,
  scope: string,
  color: string,
  textColor: string,
  textSize: string
}

export interface User {
  id: number,
  name: string,
  logo: string,
  email: string,
  password: string,
  links: string[];
}
