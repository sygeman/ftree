import { NodeRaw } from "../types/import-data.type";

export const formatTree = ({ person, partners, children }: NodeRaw) => {
  let formatedNode: any = { person: person._id };

  if (partners && partners.length > 0) {
    formatedNode.partners = partners.map((partner) => ({
      ...partner,
      people: partner.people.map((people) => people._id),
    }));
  }

  if (children && children.length > 0) {
    formatedNode.children = (children || []).map((child) => formatTree(child));
  }

  return formatedNode;
};
