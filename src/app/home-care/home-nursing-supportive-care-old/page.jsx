import { PageLayout } from '@/components/layouts';
import {
  GenericHeroSection,
  CenteredTextSection,
  NursingVisitSection,
  HighlightedItemSection,
  NursingCareServicesSection,
  PathwaySection,
  ArtOfHealingSection,
} from '@/components/sections/shared';
import {
  MdFavorite,
  MdLocalHospital,
  MdMedication,
  MdMonitorHeart,
  MdAccessibility,
  MdHealthAndSafety,
} from 'react-icons/md';
import Faq from '../components/Faq';
import Testimonials from '../components/Testimonials';

export const metadata = {
  title: 'Nursing Care - Home Nursing & Supportive Care Services',
  description:
    'Professional nursing care services at home in Dubai. Our experienced nurses provide compassionate, personalized care including wound care, medication management, IV therapy, and more.',
  keywords: [
    'nursing care',
    'home nursing',
    'supportive care',
    'Dubai nursing services',
    'home healthcare',
    'private nursing',
    'wound care',
    'medication management',
  ],
  openGraph: {
    title:
      'Nursing Care - Home Nursing & Supportive Care Services | NADZ Healthcare',
    description:
      'Professional nursing care services at home in Dubai. Experienced nurses providing compassionate, personalized care.',
    url: 'https://nadzhealthcare.com/home-care/home-nursing-supportive-care/',
    type: 'website',
  },
};

export default function NursingCarePage() {
  const features = [
    {
      title: 'Wound Care & Dressing',
      description:
        'Expert wound assessment, cleaning, and dressing changes to promote healing and prevent infection.',
      icon: MdHealthAndSafety,
    },
    {
      title: 'Medication Management',
      description:
        'Professional administration and monitoring of medications, ensuring proper dosage and timing.',
      icon: MdMedication,
    },
    {
      title: 'IV Therapy & Injections',
      description:
        'Safe administration of IV fluids, medications, and injections in the comfort of your home.',
      icon: MdLocalHospital,
    },
    {
      title: 'Vital Signs Monitoring',
      description:
        'Regular monitoring of blood pressure, temperature, pulse, and other vital signs.',
      icon: MdMonitorHeart,
    },
    {
      title: 'Post-Surgical Care',
      description:
        'Comprehensive post-operative care including incision care, pain management, and recovery support.',
      icon: MdAccessibility,
    },
    {
      title: 'Chronic Disease Management',
      description:
        'Ongoing care and support for chronic conditions like diabetes, hypertension, and heart disease.',
      icon: MdFavorite,
    },
  ];

  return (
    <PageLayout>
      <GenericHeroSection
        title="Revolutionizing Healthcare at Your Doorstep"
        highlightedWord="Healthcare"
        description="Experience compassionate, expert nursing care in the comfort of your home. Our qualified nurses provide personalized medical support, from wound care to medication management, ensuring you receive the highest quality healthcare."
        primaryCtaText="Book a Doctor"
        imageSrc="/images/doctor.png"
        imageAlt="Professional Nursing Care"
        buttonVariant="outlined"
        imageRoundedRight={true}
      />

      <CenteredTextSection
        title="Because You Deserve More Than a Waiting Room"
        paragraphs={[
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
        ]}
      />

      <HighlightedItemSection
        carouselImages={[
          '/images/doctor.png',
          '/doctor_male.png',
          '/images/doctor.png',
          '/doctor_male.png',
        ]}
      />

      <NursingVisitSection />

      <NursingCareServicesSection />

      <PathwaySection
        steps={[
          {
            number: 1,
            title: 'Initial Consultation',
            description:
              'We discuss your needs and medical history to understand the best approach for care.',
            image: '/images/doctor.png',
          },
          {
            number: 2,
            title: 'Care Plan Development',
            description:
              'A customized nursing plan is created specifically tailored to your recovery goals.',
            image: '/doctor_male.png',
          },
          {
            number: 3,
            title: 'Ongoing Support',
            description:
              'Regular visits and adjustments to the plan ensure optimal health outcomes.',
            image: '/images/doctor.png',
          },
        ]}
      />

      <ArtOfHealingSection
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        paragraphs={[
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.',
          "Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
        ]}
      />
      <Faq />
      <Testimonials />
    </PageLayout>
  );
}
