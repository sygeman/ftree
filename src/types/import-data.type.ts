export type PeopleRaw = {
  _id: string;
  tree: string;
  avatar: string;
  firstName: string;
  lastName: string;
  bio: string;
  traits: string[];
  aspirations: string[];
  lifeStates: string[];
  custom: string[];
};

export type NodeRaw = {
  person: PeopleRaw;
  partners?: {
    type: string; // EX_PARTNER MARRIED ABDUCTION
    people: PeopleRaw[];
  }[];
  children?: NodeRaw[];
};

export type ImportDataRaw = {
  _id: string;
  title: string;
  description: string;
  cover: string | null;
  publishToGallery: boolean;
  lastPublishDate: string;
  people: PeopleRaw[];
  data: NodeRaw;
};
