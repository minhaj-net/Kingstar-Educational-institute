export interface ApplyHeroData {
  eyebrow: string;
  title: string;
  backgroundImage: string;
}

export interface ApplyDetailData {
  heading: string;
  breadcrumbLabel: string;
  col1: string;
  col2: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  body: string;
}

export interface ApplyServicesData {
  backgroundImage: string;
  items: ServiceItem[];
}

export interface ProcessStep {
  num: number;
  title: string;
  body: string;
}

export interface ApplyProcessData {
  heading: string;
  steps: ProcessStep[];
}

export interface DeadlineRow {
  type: string;
  application: string;
  decision: string;
}

export interface AdmissionInfoData {
  thingsToKnow: {
    heading: string;
    intro: string;
    requirementsLabel: string;
    requirements: string[];
    btn1: string;
    btn2: string;
  };
  whenToApply: {
    heading: string;
    tableHeaders: string[];
    deadlines: DeadlineRow[];
  };
  whereToSubmit: {
    heading: string;
    intro: string;
    address: string;
  };
}

export interface ApplyNowData {
  hero: ApplyHeroData;
  detail: ApplyDetailData;
  services: ApplyServicesData;
  process: ApplyProcessData;
  admissionInfo: AdmissionInfoData;
}
