import { Edge, Node } from "reactflow";
import { Data, PartnerType, TreeNode } from "./types";
import Dagre from "@dagrejs/dagre";

export const prepareData = (data: Data) => {
  const initialNodes = data.people.map(
    ({ id, firstName, lastName, avatar }) => ({
      id,
      data: { id, firstName, lastName, avatar },
      type: "person",
      position: { x: 0, y: 0 },
    })
  );

  const initialEdges: Edge<{ type?: PartnerType }>[] = [];

  const getEdgesFromTree = (tree: TreeNode) => {
    if (tree.partners) {
      tree.partners.forEach((partner) => {
        partner.people.map((people) => {
          initialEdges.push({
            id: `${tree.person}-${people}`,
            source: tree.person,
            target: people,
            data: {
              type: partner.type,
            },
          });
        });
      });
    }

    if (tree.children) {
      tree.children.forEach((children) => {
        initialEdges.push({
          id: `${tree.person}-${children.person}`,
          source: tree.person,
          target: children.person,
          data: {},
          animated: true,
        });
        getEdgesFromTree(children);
      });
    }
  };

  getEdgesFromTree(data.tree);

  const g = new Dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    g.setGraph({
      rankdir: "TB",
      width: 200,
      height: 28,
      nodesep: 200,
      edgesep: 200,
      marginx: 200,
      marginy: 200,
      ranksep: 200,
    });

    edges.forEach((edge) => g.setEdge(edge.source, edge.target));
    nodes.forEach((node) => g.setNode(node.id, node));

    Dagre.layout(g);

    return {
      nodes: nodes.map((node) => {
        const { x, y } = g.node(node.id);

        return { ...node, position: { x, y } };
      }),
      edges,
    };
  };

  const { nodes, edges } = getLayoutedElements(initialNodes, initialEdges);

  return { nodes, edges };
};
