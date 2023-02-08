import { createPanelTemplates } from '..';
import { elemStyleTemplates, resumeCardSize, resumeData } from '../../../data/layoutTemplateData';
import { LayOutTemplate } from '../mainTemplate';

import resume_1 from '../../../assets/templateImages/resume_1.png';
import resume_2 from '../../../assets/templateImages/resume_2.png';
import resume_3 from '../../../assets/templateImages/resume_3.png';
import resume_4 from '../../../assets/templateImages/resume_4.png';
import {
  createTemplateImg,
  createTemplateShape,
  createTemplateText,
  createTemplateTextArea,
} from '../elementsTemplate';

//Post cards templates

export class ResumeTemplates {
  createEmptyTemplate() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    return card.add();
  }

  resumeTemplate() {
    const fio = createTemplateTextArea('250px', '240px', '15px');
    fio.appendChild(createTemplateText(resumeData.fio, 'Noto Sans', '20px', 'black'));

    const aboutMe = createTemplateTextArea('200px', '250px', '60px');
    aboutMe.appendChild(createTemplateText(resumeData.about_me, 'Noto Sans', '16px', 'black'));

    const aboutMeInfo = createTemplateTextArea('200px', '250px', '90px');
    aboutMeInfo.appendChild(createTemplateText(resumeData.info_abot_me, 'Noto Sans', '10px', 'black'));

    const contacts = createTemplateTextArea('200px', '20px', '180px');
    contacts.appendChild(createTemplateText(resumeData.contacts, 'Noto Sans', '16px', 'black'));

    const contactsInfo = createTemplateTextArea('200px', '20px', '205px');
    contactsInfo.appendChild(createTemplateText(resumeData.info_contacts, 'Noto Sans', '10px', 'black'));

    const experience = createTemplateTextArea('200px', '250px', '370px');
    experience.appendChild(createTemplateText(resumeData.experience, 'Noto Sans', '16px', 'black'));

    const experienceInfo = createTemplateTextArea('200px', '250px', '405px');
    experienceInfo.appendChild(createTemplateText(resumeData.info_experience, 'Noto Sans', '10px', 'black'));

    const education = createTemplateTextArea('200px', '250px', '150px');
    education.appendChild(createTemplateText(resumeData.education, 'Noto Sans', '16px', 'black'));

    const educationInfo = createTemplateTextArea('200px', '250px', '180px');
    educationInfo.appendChild(createTemplateText(resumeData.info_education, 'Noto Sans', '10px', 'black'));

    const skills = createTemplateTextArea('200px', '20px', '260px');
    skills.appendChild(createTemplateText(resumeData.skills, 'Noto Sans', '16px', 'black'));

    const skillsInfo = createTemplateTextArea('200px', '20px', '290px');
    skillsInfo.appendChild(createTemplateText(resumeData.info_skills, 'Noto Sans', '10px', 'black'));

    const other = createTemplateTextArea('200px', '20px', '365px');
    other.appendChild(createTemplateText(resumeData.other, 'Noto Sans', '16px', 'black'));

    const otherInfo = createTemplateTextArea('200px', '20px', '395px');
    otherInfo.appendChild(createTemplateText(resumeData.info_other, 'Noto Sans', '10px', 'black'));

    const photo = createTemplateImg('120px', '120px', '45px', '30px', elemStyleTemplates.isLoad);

    const arr = [
      photo,
      fio,
      aboutMe,
      aboutMeInfo,
      contacts,
      contactsInfo,
      experience,
      experienceInfo,
      education,
      educationInfo,
      skills,
      skillsInfo,
      other,
      otherInfo,
    ];

    return arr;
  }

  createTemplate1() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    const template = this.resumeTemplate();
    const square = createTemplateShape('230px', '650px', '0', '0', 'none', 'none', '#C6BCB3');

    return card.add(square, ...template);
  }

  createTemplate2() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    const template = this.resumeTemplate();

    const square = createTemplateShape('230px', '650px', '0', '0', 'none', 'none', 'rgb(209, 209, 209)');
    const square2 = createTemplateShape('500px', '85px', '0', '170px', 'none', 'none', 'rgb(232, 219, 84)');

    return card.add(square, square2, ...template);
  }

  createTemplate3() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    const template = this.resumeTemplate();

    const square1 = createTemplateShape('220px', '35px', '245px', '50px', 'none', 'none', 'rgb(124, 228, 179)');
    const square2 = createTemplateShape('220px', '35px', '245px', '142px', 'none', 'none', 'rgb(124, 228, 179)');
    const square3 = createTemplateShape('220px', '35px', '245px', '362px', 'none', 'none', 'rgb(124, 228, 179)');

    const square4 = createTemplateShape('220px', '35px', '10px', '170px', 'none', 'none', 'rgb(124, 228, 179)');
    const square5 = createTemplateShape('220px', '35px', '10px', '250px', 'none', 'none', 'rgb(124, 228, 179)');
    const square6 = createTemplateShape('220px', '35px', '10px', '355px', 'none', 'none', 'rgb(124, 228, 179)');

    return card.add(square1, square2, square3, square4, square5, square6, ...template);
  }

  createTemplate4() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    const template = this.resumeTemplate();

    const square = createTemplateShape('220px', '650px', '10px', '0', 'none', 'none', '#6B9999');
    const square2 = createTemplateShape('500px', '100px', '0', '50px', 'none', 'none', '#EBC9BB');

    return card.add(square2, square, ...template);
  }

  render(id: string) {
    let card: HTMLDivElement = document.createElement('div');

    switch (id) {
      case '1':
        card = this.createTemplate1();
        break;
      case '2':
        card = this.createTemplate2();
        break;
      case '3':
        card = this.createTemplate3();
        break;
      case '4':
        card = this.createTemplate4();
        break;
    }

    return card;
  }
}

export const resumePanelTemplates = createPanelTemplates(230, 300, resume_1, resume_2, resume_3, resume_4);

resumePanelTemplates.addEventListener('click', (event) => {
  const canvas = document.querySelector('.layout-canvas');
  if (canvas) canvas.innerHTML = '';
  const target = event.target;
  const template = new ResumeTemplates();

  if (target instanceof HTMLImageElement) {
    const card = template.render(target?.id);
    canvas?.append(card);
  }
});
