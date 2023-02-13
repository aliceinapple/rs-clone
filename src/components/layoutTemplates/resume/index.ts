import { createLayout, createPanelTemplates } from '..';
import { elemStyleTemplates, resumeCardSize, resumeData } from '../../../data/layoutTemplateData';
import { CreateTemplates, LayOutTemplate } from '../mainTemplate';

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
import { TypesDesigne } from '../../../types/enums';

//Post cards templates

export class ResumeTemplates extends CreateTemplates {
  resumeTemplate(fontFamily: string, color: string) {
    const fio = createTemplateTextArea('250px', '240px', '15px');
    fio.appendChild(createTemplateText(resumeData.fio, fontFamily, '20px', color));

    const aboutMe = createTemplateTextArea('200px', '250px', '60px');
    aboutMe.appendChild(createTemplateText(resumeData.about_me, fontFamily, '16px', color));

    const aboutMeInfo = createTemplateTextArea('200px', '250px', '90px');
    aboutMeInfo.appendChild(createTemplateText(resumeData.info_abot_me, fontFamily, '10px', color));

    const contacts = createTemplateTextArea('200px', '20px', '180px');
    contacts.appendChild(createTemplateText(resumeData.contacts, fontFamily, '16px', color));

    const contactsInfo = createTemplateTextArea('200px', '20px', '205px');
    contactsInfo.appendChild(createTemplateText(resumeData.info_contacts, fontFamily, '10px', color));

    const experience = createTemplateTextArea('200px', '250px', '370px');
    experience.appendChild(createTemplateText(resumeData.experience, fontFamily, '16px', color));

    const experienceInfo = createTemplateTextArea('200px', '250px', '405px');
    experienceInfo.appendChild(createTemplateText(resumeData.info_experience, fontFamily, '10px', color));

    const education = createTemplateTextArea('200px', '250px', '150px');
    education.appendChild(createTemplateText(resumeData.education, fontFamily, '16px', color));

    const educationInfo = createTemplateTextArea('200px', '250px', '180px');
    educationInfo.appendChild(createTemplateText(resumeData.info_education, fontFamily, '10px', color));

    const skills = createTemplateTextArea('200px', '20px', '260px');
    skills.appendChild(createTemplateText(resumeData.skills, fontFamily, '16px', color));

    const skillsInfo = createTemplateTextArea('200px', '20px', '290px');
    skillsInfo.appendChild(createTemplateText(resumeData.info_skills, fontFamily, '10px', color));

    const other = createTemplateTextArea('200px', '20px', '365px');
    other.appendChild(createTemplateText(resumeData.other, fontFamily, '16px', color));

    const otherInfo = createTemplateTextArea('200px', '20px', '395px');
    otherInfo.appendChild(createTemplateText(resumeData.info_other, fontFamily, '10px', color));

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
    const template = this.resumeTemplate('Noto Sans', 'black');
    const square = createTemplateShape('230px', '650px', '0', '0', 'none', 'none', '#C6BCB3');
    const square2 = createTemplateShape('100px', '100px', '55px', '41px', 'black');

    return card.add(square, square2, ...template);
  }

  createTemplate2() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    const template = this.resumeTemplate('Nunito', 'black');

    const square = createTemplateShape('230px', '650px', '0', '0', 'none', 'none', 'rgb(209, 209, 209)');
    const square2 = createTemplateShape('500px', '85px', '0', '170px', 'none', 'none', 'rgb(232, 219, 84)');

    return card.add(square, square2, ...template);
  }

  createTemplate3() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    const template = this.resumeTemplate('Noto Sans', 'black');

    const square1 = createTemplateShape('220px', '35px', '245px', '50px', 'none', 'none', 'rgb(124, 228, 179)');
    const square2 = createTemplateShape('220px', '35px', '245px', '142px', 'none', 'none', 'rgb(124, 228, 179)');
    const square3 = createTemplateShape('220px', '35px', '245px', '362px', 'none', 'none', 'rgb(124, 228, 179)');

    const square4 = createTemplateShape('220px', '35px', '10px', '170px', 'none', 'none', 'rgb(124, 228, 179)');
    const square5 = createTemplateShape('220px', '35px', '10px', '250px', 'none', 'none', 'rgb(124, 228, 179)');
    const square6 = createTemplateShape('220px', '35px', '10px', '355px', 'none', 'none', 'rgb(124, 228, 179)');

    const circle = createTemplateShape('130px', '130px', '40px', '25px', 'black', '50%');

    return card.add(square1, square2, square3, square4, square5, square6, circle, ...template);
  }

  createTemplate4() {
    const card = new LayOutTemplate(resumeCardSize, 'white');
    const template = this.resumeTemplate('Nunito', 'black');

    const square = createTemplateShape('220px', '650px', '10px', '0', 'none', 'none', '#6B9999');
    const square2 = createTemplateShape('500px', '100px', '0', '50px', 'none', 'none', '#EBC9BB');

    return card.add(square2, square, ...template);
  }

  allTemplates() {
    const card1 = this.createTemplate1();
    const card2 = this.createTemplate2();
    const card3 = this.createTemplate3();
    const card4 = this.createTemplate4();

    const arr = [card1, card2, card3, card4];
    return arr;
  }
}

const images = [resume_1, resume_2, resume_3, resume_4];
export const resumePanelTemplates = createPanelTemplates(TypesDesigne.Resume, 230, 300, images);

const template = new ResumeTemplates();
createLayout(resumePanelTemplates, template);
