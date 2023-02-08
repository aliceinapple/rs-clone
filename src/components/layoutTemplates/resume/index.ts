import { createPanelTemplates } from '..';
import { resumeCardSize, resumeData } from '../../../data/layoutTemplateData';
import { LayOutTemplate } from '../mainTemplate';

import resume_1 from '../../../assets/templateImages/postCard_1.png';
import resume_2 from '../../../assets/templateImages/postCard_2.png';
import resume_3 from '../../../assets/templateImages/postCard_3.png';
import resume_4 from '../../../assets/templateImages/postCard_4.png';
import { createTemplateText, createTemplateTextArea } from '../elementsTemplate';
import { loadPhoto } from '../elementsActions';

//Post cards templates

export class ResumeTemplates {
  createEmptyTemplate() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    return card.add();
  }

  createTemplate1() {
    const card = new LayOutTemplate(resumeCardSize, '#82BFD3');

    const fio = createTemplateTextArea('250px', '215px', '15px');
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

    const photo = loadPhoto();

    return card.add(
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
    );
  }

  createTemplate2() {
    const card = new LayOutTemplate(resumeCardSize, 'black');

    return card.add();
  }

  createTemplate3() {
    const card = new LayOutTemplate(resumeCardSize, '#E6D0EB');

    return card.add();
  }

  createTemplate4() {
    const card = new LayOutTemplate(resumeCardSize, '#9FC1B7');

    return card.add();
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

export const resumePanelTemplates = createPanelTemplates(220, 135, resume_1, resume_2, resume_3, resume_4);

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
