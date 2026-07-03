import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsArtOfHealing extends Struct.ComponentSchema {
  collectionName: 'components_sections_art_of_healings';
  info: {
    description: 'Art of healing section with highlights and video';
    displayName: 'Art of Healing';
  };
  attributes: {
    closingParagraphs: Schema.Attribute.JSON;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    highlights: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsArticleContent extends Struct.ComponentSchema {
  collectionName: 'components_sections_article_contents';
  info: {
    description: 'Blog post body: intro paragraph + repeatable sections (heading, content, quote)';
    displayName: 'Article Content';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    sections: Schema.Attribute.Component<
      'sections.article-content-section',
      true
    >;
  };
}

export interface SectionsArticleContentSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_article_content_sections';
  info: {
    description: 'One section of blog post body (heading + content + optional quote)';
    displayName: 'Article Content Section';
  };
  attributes: {
    content: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
    quote: Schema.Attribute.String;
  };
}

export interface SectionsBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_benefit_items';
  info: {
    description: 'A single benefit item';
    displayName: 'Benefit Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBenefitsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_benefits_sections';
  info: {
    description: 'Benefits section with list of benefits, note, and CTA';
    displayName: 'Benefits Section';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'sections.benefit-item', true>;
    ctaText: Schema.Attribute.String;
    note: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsBloodTestSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_blood_test_sections';
  info: {
    description: 'Blood test section with title and paragraphs';
    displayName: 'Blood Test Section';
  };
  attributes: {
    paragraphs: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsBrowserInstructions extends Struct.ComponentSchema {
  collectionName: 'components_sections_browser_instructions';
  info: {
    description: 'Browser-specific instructions';
    displayName: 'Browser Instructions';
  };
  attributes: {
    instructions: Schema.Attribute.JSON & Schema.Attribute.Required;
    intro: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsCenteredText extends Struct.ComponentSchema {
  collectionName: 'components_sections_centered_texts';
  info: {
    description: 'Centered text section with title, paragraphs, and CTA';
    displayName: 'Centered Text';
  };
  attributes: {
    ctaText: Schema.Attribute.String;
    paragraphs: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsClosingSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_closing_sections';
  info: {
    description: 'Closing / Welcome section (for Who We Are page)';
    displayName: 'Closing Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsConditionBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_condition_blocks';
  info: {
    description: 'One block of conditions with title and items';
    displayName: 'Condition Block';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.list-item', true>;
    note: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsConditionsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_conditions_sections';
  info: {
    description: 'Conditions & functional concerns with grouped sections';
    displayName: 'Conditions Section';
  };
  attributes: {
    footer: Schema.Attribute.Text;
    sections: Schema.Attribute.Component<'sections.condition-block', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsContactField extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_fields';
  info: {
    description: 'A contact information field (phone, email, address, etc.)';
    displayName: 'Contact Field';
    icon: 'envelope';
    name: 'ContactField';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContactForm extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_forms';
  info: {
    description: 'Contact form configuration';
    displayName: 'Contact Form';
    icon: 'paper-plane';
    name: 'ContactForm';
  };
  attributes: {
    description: Schema.Attribute.Text;
    fields: Schema.Attribute.Component<'sections.form-field', true>;
    submitButton: Schema.Attribute.Component<'sections.form-button', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContactHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_heroes';
  info: {
    description: 'Hero section for contact page';
    displayName: 'Contact Hero';
    icon: 'user-md';
    name: 'ContactHero';
  };
  attributes: {
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_infos';
  info: {
    description: 'Contact information component for contact-us page';
    displayName: 'Contact Info';
  };
  attributes: {
    address: Schema.Attribute.Component<'sections.contact-field', false>;
    email: Schema.Attribute.Component<'sections.contact-field', false>;
    map: Schema.Attribute.Component<'sections.contact-map', false>;
    officeHours: Schema.Attribute.Component<'sections.contact-field', false>;
    phone: Schema.Attribute.Component<'sections.contact-field', false>;
  };
}

export interface SectionsContactMap extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_maps';
  info: {
    description: 'Google Maps embed for contact page';
    displayName: 'Contact Map';
    icon: 'map-marked-alt';
    name: 'ContactMap';
  };
  attributes: {
    embedUrl: Schema.Attribute.Text & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDisclaimer extends Struct.ComponentSchema {
  collectionName: 'components_sections_disclaimers';
  info: {
    description: 'Disclaimer section with title and items';
    displayName: 'Disclaimer';
  };
  attributes: {
    items: Schema.Attribute.JSON & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsDoctor extends Struct.ComponentSchema {
  collectionName: 'components_sections_doctors';
  info: {
    description: 'Doctor information with name, role, languages, experience and image';
    displayName: 'Doctor';
    icon: 'user-md';
    name: 'Doctor';
  };
  attributes: {
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Media<'images'>;
    languages: Schema.Attribute.String;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
    yearsOfExperience: Schema.Attribute.String;
  };
}

export interface SectionsDoctorCard extends Struct.ComponentSchema {
  collectionName: 'components_sections_doctor_cards';
  info: {
    description: 'Doctor card with image, name and color for chart visualization';
    displayName: 'Doctor Card';
    icon: 'user';
    name: 'DoctorCard';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#10B981'>;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
  };
}

export interface SectionsEffectiveDate extends Struct.ComponentSchema {
  collectionName: 'components_sections_effective_dates';
  info: {
    description: 'Effective date and last updated date';
    displayName: 'Effective Date';
  };
  attributes: {
    effectiveDate: Schema.Attribute.String & Schema.Attribute.Required;
    lastUpdated: Schema.Attribute.String;
  };
}

export interface SectionsExpertDoctors extends Struct.ComponentSchema {
  collectionName: 'components_sections_expert_doctors';
  info: {
    description: 'Expert doctors section with title, subtitle and list of doctors';
    displayName: 'Expert Doctors Section';
    icon: 'users';
    name: 'ExpertDoctors';
  };
  attributes: {
    doctors: Schema.Attribute.Component<'sections.doctor', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFaqCategory extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_categories';
  info: {
    description: 'A category of FAQ questions';
    displayName: 'FAQ Category';
  };
  attributes: {
    categoryId: Schema.Attribute.Integer & Schema.Attribute.Required;
    questions: Schema.Attribute.Component<'sections.faq-question', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqContactSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_contact_sections';
  info: {
    description: 'Contact section for FAQ page';
    displayName: 'FAQ Contact Section';
  };
  attributes: {
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_items';
  info: {
    description: 'A single FAQ question and answer';
    displayName: 'FAQ Item';
  };
  attributes: {
    a: Schema.Attribute.Text & Schema.Attribute.Required;
    q: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqQuestion extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq_questions';
  info: {
    description: 'A single FAQ question and answer';
    displayName: 'FAQ Question';
  };
  attributes: {
    a: Schema.Attribute.Text & Schema.Attribute.Required;
    q: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaqsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_faqs_sections';
  info: {
    description: 'FAQs section for home care pages';
    displayName: 'FAQs Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.faq-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsFooterLink extends Struct.ComponentSchema {
  collectionName: 'components_sections_footer_links';
  info: {
    description: 'A simple footer link';
    displayName: 'Footer Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFooterLinkSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_footer_link_sections';
  info: {
    description: 'A section of footer links with a title';
    displayName: 'Footer Link Section';
  };
  attributes: {
    links: Schema.Attribute.Component<'sections.footer-link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFormButton extends Struct.ComponentSchema {
  collectionName: 'components_sections_form_buttons';
  info: {
    description: 'Form submit button configuration';
    displayName: 'Form Button';
    icon: 'check-circle';
    name: 'FormButton';
  };
  attributes: {
    loadingText: Schema.Attribute.String;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFormField extends Struct.ComponentSchema {
  collectionName: 'components_sections_form_fields';
  info: {
    description: 'A form field configuration';
    displayName: 'Form Field';
    icon: 'edit';
    name: 'FormField';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    options: Schema.Attribute.JSON;
    placeholder: Schema.Attribute.String;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    type: Schema.Attribute.Enumeration<
      ['text', 'email', 'tel', 'number', 'select', 'radio']
    > &
      Schema.Attribute.DefaultTo<'text'>;
  };
}

export interface SectionsGoogleReviews extends Struct.ComponentSchema {
  collectionName: 'components_sections_google_reviews';
  info: {
    description: 'Google reviews section with title and review cards';
    displayName: 'Google Reviews Section';
    icon: 'star';
    name: 'GoogleReviews';
  };
  attributes: {
    reviews: Schema.Attribute.Component<'sections.review-item', true>;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Google Reviews'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What Our Patients Say'>;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heros';
  info: {
    description: 'Hero section with title, description, reassurance text and image';
    displayName: 'Hero Section';
    icon: 'star';
    name: 'Hero';
  };
  attributes: {
    callButtonPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+97180046239'>;
    callButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Call Now (24/7)'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    reassuranceText: Schema.Attribute.String;
    serviceChips: Schema.Attribute.Component<'sections.service-chip', true>;
    title: Schema.Attribute.String;
    whatsappButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book a Home Visit'>;
    whatsappButtonUrl: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'https://wa.me/971521597336'>;
  };
}

export interface SectionsHomeCareHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_home_care_heros';
  info: {
    description: 'Hero section for home care pages';
    displayName: 'Home Care Hero';
  };
  attributes: {
    buttonVariant: Schema.Attribute.Enumeration<['default', 'outlined']> &
      Schema.Attribute.DefaultTo<'default'>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    imageRoundedRight: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    introBlurb: Schema.Attribute.Text;
    primaryCtaText: Schema.Attribute.String;
    secondaryCtaText: Schema.Attribute.String;
    subheading: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoId: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsHowItWorks extends Struct.ComponentSchema {
  collectionName: 'components_sections_how_it_works';
  info: {
    description: 'How it works section with title, steps, and CTA';
    displayName: 'How It Works Section';
    icon: 'cog';
    name: 'HowItWorks';
  };
  attributes: {
    ctaSubtext: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'sections.how-it-works-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHowItWorksSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_how_it_works_sections';
  info: {
    description: 'How it works section with title, description, items, and closing paragraph';
    displayName: 'How It Works Section';
  };
  attributes: {
    closingParagraph: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHowItWorksStep extends Struct.ComponentSchema {
  collectionName: 'components_sections_how_it_works_steps';
  info: {
    description: 'A single step in the how it works section';
    displayName: 'How It Works Step';
    icon: 'list-ol';
    name: 'HowItWorksStep';
  };
  attributes: {
    bgGradient: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsHowItWorksWellness extends Struct.ComponentSchema {
  collectionName: 'components_sections_how_it_works_wellnesses';
  info: {
    description: 'How It Works section for wellness pages';
    displayName: 'How It Works Wellness';
  };
  attributes: {
    bullets: Schema.Attribute.Component<'shared.list-item', true>;
    footer: Schema.Attribute.Text;
    paragraph: Schema.Attribute.Text;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsJourneySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_journey_sections';
  info: {
    description: 'What to expect - journey steps';
    displayName: 'Journey Section';
  };
  attributes: {
    steps: Schema.Attribute.Component<'sections.journey-step', true>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsJourneyStep extends Struct.ComponentSchema {
  collectionName: 'components_sections_journey_steps';
  info: {
    description: 'One step in the journey section';
    displayName: 'Journey Step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsKeyVision extends Struct.ComponentSchema {
  collectionName: 'components_sections_key_visions';
  info: {
    description: 'Key vision section with title, description and vision items';
    displayName: 'Key Vision Section';
    icon: 'lightbulb';
    name: 'KeyVision';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'sections.vision-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLabServiceCategory extends Struct.ComponentSchema {
  collectionName: 'components_sections_lab_service_categories';
  info: {
    description: 'A category within lab services';
    displayName: 'Lab Service Category';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    tests: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsLabServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_lab_services';
  info: {
    description: 'Lab services section with categories';
    displayName: 'Lab Services';
  };
  attributes: {
    categories: Schema.Attribute.Component<
      'sections.lab-service-category',
      true
    >;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsLocationService extends Struct.ComponentSchema {
  collectionName: 'components_sections_location_services';
  info: {
    description: 'Service available at a specific location (home, hotel, office)';
    displayName: 'Location Service';
  };
  attributes: {
    bullets: Schema.Attribute.JSON;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsMainGoal extends Struct.ComponentSchema {
  collectionName: 'components_sections_main_goals';
  info: {
    description: 'Main goal section with title, description, goals lists and image';
    displayName: 'Main Goal Section';
    icon: 'target';
    name: 'MainGoal';
  };
  attributes: {
    description: Schema.Attribute.Text;
    goalsLeft: Schema.Attribute.JSON;
    goalsRight: Schema.Attribute.JSON;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsMissionParagraph extends Struct.ComponentSchema {
  collectionName: 'components_sections_mission_paragraphs';
  info: {
    description: 'A single paragraph in the Mission section';
    displayName: 'Mission Paragraph';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsMissionPoint extends Struct.ComponentSchema {
  collectionName: 'components_sections_mission_points';
  info: {
    description: 'A bullet point in the Mission section';
    displayName: 'Mission Point';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsMissionSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_mission_sections';
  info: {
    description: 'Our Mission block (for Vision & Mission page)';
    displayName: 'Mission Section';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    paragraphs: Schema.Attribute.Component<'sections.mission-paragraph', true>;
    points: Schema.Attribute.Component<'sections.mission-point', true>;
    quote: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsNavLink extends Struct.ComponentSchema {
  collectionName: 'components_sections_nav_links';
  info: {
    description: 'A navigation link that can have a dropdown submenu';
    displayName: 'Nav Link';
  };
  attributes: {
    hasDropdown: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    submenu: Schema.Attribute.Component<'sections.sub-nav-link', true>;
  };
}

export interface SectionsNestedNavLink extends Struct.ComponentSchema {
  collectionName: 'components_sections_nested_nav_links';
  info: {
    description: 'A nested navigation link (third level)';
    displayName: 'Nested Nav Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsNursingCareService extends Struct.ComponentSchema {
  collectionName: 'components_sections_nursing_care_services';
  info: {
    description: 'Individual nursing care service item';
    displayName: 'Nursing Care Service';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsNursingCareServices extends Struct.ComponentSchema {
  collectionName: 'components_sections_nursing_care_services_sections';
  info: {
    description: 'Section listing nursing care services';
    displayName: 'Nursing Care Services';
  };
  attributes: {
    note: Schema.Attribute.Text;
    services: Schema.Attribute.Component<'sections.nursing-care-service', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsOurCommitment extends Struct.ComponentSchema {
  collectionName: 'components_sections_our_commitments';
  info: {
    description: 'Our Commitment section (for Who We Are page)';
    displayName: 'Our Commitment';
  };
  attributes: {
    description: Schema.Attribute.Text;
    paragraph: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsOurPromise extends Struct.ComponentSchema {
  collectionName: 'components_sections_our_promises';
  info: {
    description: 'Our Promise section (for Who We Are page)';
    displayName: 'Our Promise';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.our-promise-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsOurPromiseItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_our_promise_items';
  info: {
    description: 'One item in Our Promise section';
    displayName: 'Our Promise Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsOurStory extends Struct.ComponentSchema {
  collectionName: 'components_sections_our_stories';
  info: {
    description: 'Our Story section (for Who We Are page)';
    displayName: 'Our Story';
  };
  attributes: {
    paragraphs: Schema.Attribute.Component<'sections.vision-paragraph', true>;
    quote: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPackagesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_packages_sections';
  info: {
    description: 'Packages section with list of packages and optional note';
    displayName: 'Packages Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    note: Schema.Attribute.Text;
    packages: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPartnerItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_partner_items';
  info: {
    description: 'A single partner with logo and optional link';
    displayName: 'Partner Item';
    icon: 'handshake';
    name: 'PartnerItem';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    logoUrl: Schema.Attribute.String;
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface SectionsPartners extends Struct.ComponentSchema {
  collectionName: 'components_sections_partners';
  info: {
    description: 'Partners carousel section with title and partner logos';
    displayName: 'Partners Section';
    icon: 'handshake';
    name: 'Partners';
  };
  attributes: {
    partners: Schema.Attribute.Component<'sections.partner-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Our Partners'>;
  };
}

export interface SectionsPathway extends Struct.ComponentSchema {
  collectionName: 'components_sections_pathways';
  info: {
    description: 'Care pathway section with steps and CTA';
    displayName: 'Pathway';
  };
  attributes: {
    ctaBlock: Schema.Attribute.Component<'sections.pathway-cta-block', false>;
    steps: Schema.Attribute.Component<'sections.pathway-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPathwayCtaBlock extends Struct.ComponentSchema {
  collectionName: 'components_sections_pathway_cta_blocks';
  info: {
    description: 'CTA block for pathway section';
    displayName: 'Pathway CTA Block';
  };
  attributes: {
    description: Schema.Attribute.Text;
    primaryCta: Schema.Attribute.String;
    secondaryCta: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPathwayStep extends Struct.ComponentSchema {
  collectionName: 'components_sections_pathway_steps';
  info: {
    description: 'A step in the care pathway';
    displayName: 'Pathway Step';
  };
  attributes: {
    description: Schema.Attribute.Text;
    number: Schema.Attribute.Integer & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPatientReportsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_patient_reports_sections';
  info: {
    description: 'What patients commonly report';
    displayName: 'Patient Reports Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPocTesting extends Struct.ComponentSchema {
  collectionName: 'components_sections_poc_testings';
  info: {
    description: 'Point of care testing section';
    displayName: 'POC Testing';
  };
  attributes: {
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsPolicyContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_sections_policy_contact_infos';
  info: {
    description: 'Simple contact information for policy pages';
    displayName: 'Policy Contact Info';
  };
  attributes: {
    address: Schema.Attribute.String;
    company: Schema.Attribute.String;
    email: Schema.Attribute.String;
    location: Schema.Attribute.String;
    name: Schema.Attribute.String;
    phone: Schema.Attribute.String;
  };
}

export interface SectionsPolicySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_policy_sections';
  info: {
    description: 'A section in a policy page (Privacy, Terms, Cookie)';
    displayName: 'Policy Section';
  };
  attributes: {
    browserInstructions: Schema.Attribute.Component<
      'sections.browser-instructions',
      false
    >;
    contact: Schema.Attribute.Component<'sections.policy-contact-info', false>;
    content: Schema.Attribute.Text;
    disclaimer: Schema.Attribute.Component<'sections.disclaimer', false>;
    emergency: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.JSON;
    note: Schema.Attribute.Text;
    number: Schema.Attribute.Integer & Schema.Attribute.Required;
    subsections: Schema.Attribute.Component<'sections.policy-subsection', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPolicySubsection extends Struct.ComponentSchema {
  collectionName: 'components_sections_policy_subsections';
  info: {
    description: 'A subsection within a policy section';
    displayName: 'Policy Subsection';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPremiumCta extends Struct.ComponentSchema {
  collectionName: 'components_sections_premium_ctas';
  info: {
    description: 'Premium CTA section with title, description and buttons';
    displayName: 'Premium CTA Section';
    icon: 'phone';
    name: 'PremiumCta';
  };
  attributes: {
    callButtonPhone: Schema.Attribute.String;
    callButtonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
    whatsappButtonText: Schema.Attribute.String;
    whatsappButtonUrl: Schema.Attribute.String;
  };
}

export interface SectionsQuestionsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_questions_sections';
  info: {
    description: 'Questions/contact section for policy pages';
    displayName: 'Questions Section';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsReviewItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_review_items';
  info: {
    description: 'A single Google review with author, rating, text and date';
    displayName: 'Review Item';
    icon: 'star';
    name: 'ReviewItem';
  };
  attributes: {
    author: Schema.Attribute.String;
    date: Schema.Attribute.String;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
    text: Schema.Attribute.Text;
  };
}

export interface SectionsSafetySection extends Struct.ComponentSchema {
  collectionName: 'components_sections_safety_sections';
  info: {
    description: 'Safety & contraindications';
    displayName: 'Safety Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsServiceChip extends Struct.ComponentSchema {
  collectionName: 'components_sections_service_chips';
  info: {
    description: 'A floating service chip with name, icon, color and position';
    displayName: 'Service Chip';
    icon: 'tag';
    name: 'ServiceChip';
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#165976'>;
    icon: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    positionBottom: Schema.Attribute.String;
    positionLeft: Schema.Attribute.String;
    positionRight: Schema.Attribute.String;
    positionTop: Schema.Attribute.String;
  };
}

export interface SectionsServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_service_items';
  info: {
    description: 'A single service card with title, description and icon';
    displayName: 'Service Item';
    icon: 'grid-2';
    name: 'ServiceItem';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Enumeration<
      [
        'LocalHospital',
        'Favorite',
        'FitnessCenter',
        'WaterDrop',
        'Science',
        'Vaccines',
        'MedicalServices',
        'Flight',
        'Spa',
        'Phone',
        'Healing',
        'AutoAwesome',
      ]
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsServicesIntro extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_intros';
  info: {
    description: 'Services introduction section';
    displayName: 'Services Intro';
  };
  attributes: {
    closingParagraph: Schema.Attribute.Text;
    ctaText: Schema.Attribute.String;
    highlights: Schema.Attribute.JSON;
    introParagraph: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsServicesSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_services_sections';
  info: {
    description: 'Services section with configurable title';
    displayName: 'Services Section';
    icon: 'grid';
    name: 'ServicesSection';
  };
  attributes: {
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'View All Services'>;
    ctaUrl: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/services'>;
    services: Schema.Attribute.Component<'sections.service-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Services We Provide'>;
  };
}

export interface SectionsSignatureDripItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_signature_drip_items';
  info: {
    description: 'Single drip in Signature IV Drips section';
    displayName: 'Signature Drip Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsSignatureIvDrips extends Struct.ComponentSchema {
  collectionName: 'components_sections_signature_iv_drips';
  info: {
    description: 'Our Signature IV Drips at Home section';
    displayName: 'Signature IV Drips';
  };
  attributes: {
    drips: Schema.Attribute.Component<'sections.signature-drip-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_sections_social_links';
  info: {
    description: 'A social media link';
    displayName: 'Social Link';
  };
  attributes: {
    ariaLabel: Schema.Attribute.String;
    platform: Schema.Attribute.Enumeration<
      ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'whatsapp']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsStatisticItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_statistic_items';
  info: {
    description: 'A single statistic with value, label, number and icon';
    displayName: 'Statistic Item';
    icon: 'chart-line';
    name: 'StatisticItem';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    number: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SectionsSubNavLink extends Struct.ComponentSchema {
  collectionName: 'components_sections_sub_nav_links';
  info: {
    description: 'A sub navigation link (second level) that can have nested links';
    displayName: 'Sub Nav Link';
  };
  attributes: {
    hasNested: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    nested: Schema.Attribute.Component<'sections.nested-nav-link', true>;
  };
}

export interface SectionsTrustedProviders extends Struct.ComponentSchema {
  collectionName: 'components_sections_trusted_providers';
  info: {
    description: 'Trusted providers section with statistics, title, description and cards';
    displayName: 'Trusted Providers Section';
    icon: 'shield-check';
    name: 'TrustedProviders';
  };
  attributes: {
    card1Description: Schema.Attribute.Text;
    card1Image: Schema.Attribute.Media<'images'>;
    card1Title: Schema.Attribute.String;
    card2Description: Schema.Attribute.Text;
    card2Image: Schema.Attribute.Media<'images'>;
    card2Title: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    statistics: Schema.Attribute.Component<'sections.statistic-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsVisionItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_vision_items';
  info: {
    description: 'A single vision item with title, description and icon';
    displayName: 'Vision Item';
    icon: 'eye';
    name: 'VisionItem';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SectionsVisionParagraph extends Struct.ComponentSchema {
  collectionName: 'components_sections_vision_paragraphs';
  info: {
    description: 'A single paragraph in the Vision section';
    displayName: 'Vision Paragraph';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsVisionSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_vision_sections';
  info: {
    description: 'Our Vision block (for Vision & Mission page)';
    displayName: 'Vision Section';
  };
  attributes: {
    paragraphs: Schema.Attribute.Component<'sections.vision-paragraph', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsVisitIncludes extends Struct.ComponentSchema {
  collectionName: 'components_sections_visit_includes';
  info: {
    description: 'What a visit includes section';
    displayName: 'Visit Includes';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWellnessHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_wellness_heros';
  info: {
    description: 'Hero section for wellness pages with video support';
    displayName: 'Wellness Hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    primaryCta: Schema.Attribute.String;
    secondaryCta: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoId: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface SectionsWhatIsSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_what_is_sections';
  info: {
    description: 'What Is section with title, paragraph, bullets, and footer';
    displayName: 'What Is Section';
  };
  attributes: {
    bullets: Schema.Attribute.Component<'shared.list-item', true>;
    footer: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    paragraph: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhenToConsider extends Struct.ComponentSchema {
  collectionName: 'components_sections_when_to_considers';
  info: {
    description: 'When to consider section with title and items list';
    displayName: 'When To Consider';
  };
  attributes: {
    items: Schema.Attribute.JSON;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhoCanBenefitSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_who_can_benefit_sections';
  info: {
    description: 'Who Can Benefit section with title, items list, and footer';
    displayName: 'Who Can Benefit Section';
  };
  attributes: {
    footer: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhoWeServe extends Struct.ComponentSchema {
  collectionName: 'components_sections_who_we_serves';
  info: {
    description: 'Who We Serve section (for Who We Are page)';
    displayName: 'Who We Serve';
  };
  attributes: {
    description: Schema.Attribute.Text;
    services: Schema.Attribute.Component<'sections.who-we-serve-service', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhoWeServeService extends Struct.ComponentSchema {
  collectionName: 'components_sections_who_we_serve_services';
  info: {
    description: 'One service in Who We Serve section';
    displayName: 'Who We Serve Service';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsWhyChooseFunctionalMedicine
  extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_choose_functional_medicines';
  info: {
    description: 'Why choose section for functional medicine page';
    displayName: 'Why Choose Functional Medicine';
  };
  attributes: {
    description: Schema.Attribute.Text;
    footer: Schema.Attribute.Text;
    points: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhyChooseSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_choose_sections';
  info: {
    description: 'Why choose NADZ Healthcare';
    displayName: 'Why Choose Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhyDifferent extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_differents';
  info: {
    description: 'Why NADZ is Different section (for Who We Are page)';
    displayName: 'Why Different';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.why-matter-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsWhyMatterItem extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_matter_items';
  info: {
    description: 'One item in Why It Matters (title, description, icon)';
    displayName: 'Why Matter Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsWhyMattersSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_why_matters_sections';
  info: {
    description: 'Why Our Mission & Vision Matter (for Vision & Mission page)';
    displayName: 'Why Matters Section';
  };
  attributes: {
    items: Schema.Attribute.Component<'sections.why-matter-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    description: 'Single text item for lists';
    displayName: 'List Item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'SEO metadata component';
    displayName: 'SEO';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.JSON;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    openGraphDescription: Schema.Attribute.Text;
    openGraphTitle: Schema.Attribute.String;
    openGraphType: Schema.Attribute.Enumeration<['website', 'article']> &
      Schema.Attribute.DefaultTo<'website'>;
    openGraphUrl: Schema.Attribute.String;
    robotsFollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    robotsIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    shareImage: Schema.Attribute.Media<'images'>;
    twitterCard: Schema.Attribute.Enumeration<
      ['summary', 'summary_large_image']
    > &
      Schema.Attribute.DefaultTo<'summary_large_image'>;
    twitterDescription: Schema.Attribute.Text;
    twitterTitle: Schema.Attribute.String;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.art-of-healing': SectionsArtOfHealing;
      'sections.article-content': SectionsArticleContent;
      'sections.article-content-section': SectionsArticleContentSection;
      'sections.benefit-item': SectionsBenefitItem;
      'sections.benefits-section': SectionsBenefitsSection;
      'sections.blood-test-section': SectionsBloodTestSection;
      'sections.browser-instructions': SectionsBrowserInstructions;
      'sections.centered-text': SectionsCenteredText;
      'sections.closing-section': SectionsClosingSection;
      'sections.condition-block': SectionsConditionBlock;
      'sections.conditions-section': SectionsConditionsSection;
      'sections.contact-field': SectionsContactField;
      'sections.contact-form': SectionsContactForm;
      'sections.contact-hero': SectionsContactHero;
      'sections.contact-info': SectionsContactInfo;
      'sections.contact-map': SectionsContactMap;
      'sections.disclaimer': SectionsDisclaimer;
      'sections.doctor': SectionsDoctor;
      'sections.doctor-card': SectionsDoctorCard;
      'sections.effective-date': SectionsEffectiveDate;
      'sections.expert-doctors': SectionsExpertDoctors;
      'sections.faq-category': SectionsFaqCategory;
      'sections.faq-contact-section': SectionsFaqContactSection;
      'sections.faq-item': SectionsFaqItem;
      'sections.faq-question': SectionsFaqQuestion;
      'sections.faqs-section': SectionsFaqsSection;
      'sections.footer-link': SectionsFooterLink;
      'sections.footer-link-section': SectionsFooterLinkSection;
      'sections.form-button': SectionsFormButton;
      'sections.form-field': SectionsFormField;
      'sections.google-reviews': SectionsGoogleReviews;
      'sections.hero': SectionsHero;
      'sections.home-care-hero': SectionsHomeCareHero;
      'sections.how-it-works': SectionsHowItWorks;
      'sections.how-it-works-section': SectionsHowItWorksSection;
      'sections.how-it-works-step': SectionsHowItWorksStep;
      'sections.how-it-works-wellness': SectionsHowItWorksWellness;
      'sections.journey-section': SectionsJourneySection;
      'sections.journey-step': SectionsJourneyStep;
      'sections.key-vision': SectionsKeyVision;
      'sections.lab-service-category': SectionsLabServiceCategory;
      'sections.lab-services': SectionsLabServices;
      'sections.location-service': SectionsLocationService;
      'sections.main-goal': SectionsMainGoal;
      'sections.mission-paragraph': SectionsMissionParagraph;
      'sections.mission-point': SectionsMissionPoint;
      'sections.mission-section': SectionsMissionSection;
      'sections.nav-link': SectionsNavLink;
      'sections.nested-nav-link': SectionsNestedNavLink;
      'sections.nursing-care-service': SectionsNursingCareService;
      'sections.nursing-care-services': SectionsNursingCareServices;
      'sections.our-commitment': SectionsOurCommitment;
      'sections.our-promise': SectionsOurPromise;
      'sections.our-promise-item': SectionsOurPromiseItem;
      'sections.our-story': SectionsOurStory;
      'sections.packages-section': SectionsPackagesSection;
      'sections.partner-item': SectionsPartnerItem;
      'sections.partners': SectionsPartners;
      'sections.pathway': SectionsPathway;
      'sections.pathway-cta-block': SectionsPathwayCtaBlock;
      'sections.pathway-step': SectionsPathwayStep;
      'sections.patient-reports-section': SectionsPatientReportsSection;
      'sections.poc-testing': SectionsPocTesting;
      'sections.policy-contact-info': SectionsPolicyContactInfo;
      'sections.policy-section': SectionsPolicySection;
      'sections.policy-subsection': SectionsPolicySubsection;
      'sections.premium-cta': SectionsPremiumCta;
      'sections.questions-section': SectionsQuestionsSection;
      'sections.review-item': SectionsReviewItem;
      'sections.safety-section': SectionsSafetySection;
      'sections.service-chip': SectionsServiceChip;
      'sections.service-item': SectionsServiceItem;
      'sections.services-intro': SectionsServicesIntro;
      'sections.services-section': SectionsServicesSection;
      'sections.signature-drip-item': SectionsSignatureDripItem;
      'sections.signature-iv-drips': SectionsSignatureIvDrips;
      'sections.social-link': SectionsSocialLink;
      'sections.statistic-item': SectionsStatisticItem;
      'sections.sub-nav-link': SectionsSubNavLink;
      'sections.trusted-providers': SectionsTrustedProviders;
      'sections.vision-item': SectionsVisionItem;
      'sections.vision-paragraph': SectionsVisionParagraph;
      'sections.vision-section': SectionsVisionSection;
      'sections.visit-includes': SectionsVisitIncludes;
      'sections.wellness-hero': SectionsWellnessHero;
      'sections.what-is-section': SectionsWhatIsSection;
      'sections.when-to-consider': SectionsWhenToConsider;
      'sections.who-can-benefit-section': SectionsWhoCanBenefitSection;
      'sections.who-we-serve': SectionsWhoWeServe;
      'sections.who-we-serve-service': SectionsWhoWeServeService;
      'sections.why-choose-functional-medicine': SectionsWhyChooseFunctionalMedicine;
      'sections.why-choose-section': SectionsWhyChooseSection;
      'sections.why-different': SectionsWhyDifferent;
      'sections.why-matter-item': SectionsWhyMatterItem;
      'sections.why-matters-section': SectionsWhyMattersSection;
      'shared.list-item': SharedListItem;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
