import dataJson from "./641f24449a150cba09f92d5b.json";

import ReactFlow, { Controls } from "reactflow";
import { Data } from "./types";
import { PersonNode } from "./person";
import { prepareData } from "./prepare-data";

const data = dataJson as Data;

const nodeTypes = { person: PersonNode };
const { edges, nodes } = prepareData(data);

export const App = () => {
  return (
    <div className="insert-0 h-full w-full absolute">
      <div className="flex w-full h-12 justify-center items-center">
        {data.title}
      </div>
      <div className="w-full h-[calc(100%-48px)] absolute top-12 overflow-auto flex justify-center">
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
          <Controls className="bg-white" showInteractive={false} />
        </ReactFlow>
      </div>
    </div>
  );
};
