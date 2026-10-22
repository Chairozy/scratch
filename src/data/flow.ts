export interface FlowOption {
  id: string;
  label: string;
  /** Sintaks scratchblocks bila pilihan jawaban berupa blok. */
  blok?: string;
}

export interface FlowQuestion {
  id: string;
  prompt: string;
  options: FlowOption[];
  answer: string;
  salah: string;
  benar: string;
}

export interface FlowRole {
  name: string;
  image: string;
  role: string;
}

export interface FlowRoadmapItem {
  title: string;
  goal: string;
}

export interface FlowPath {
  id: string;
  title: string;
  goal: string;
  recall: string;
  roleRefs: string[];
  cerita: string;
  codeTitle: string;
  code: string;
  catatanKode?: string;
  tip: string;
  quiz: FlowQuestion[];
}

export interface ProjectFlow {
  intro: string;
  understandQuiz: FlowQuestion[];
  prepare: {
    roadmap: FlowRoadmapItem[];
    setup: string[];
    roles: FlowRole[];
    quiz: FlowQuestion[];
  };
  paths: FlowPath[];
  test: {
    message: string;
    quiz: FlowQuestion[];
  };
}
