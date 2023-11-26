export type People = {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
};

export enum PartnerType {
  EX_PARTNER = "EX_PARTNER",
  MARRIED = "MARRIED",
  ABDUCTION = "ABDUCTION",
}

export type TreeNode = {
  person: string;
  partners?: {
    type: PartnerType;
    people: string[];
  }[];
  children?: TreeNode[];
};

export type Data = {
  _id: string;
  title: string;
  lastPublishDate: string;
  people: People[];
  tree: TreeNode;
};
