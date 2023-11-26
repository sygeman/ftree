import dataJson from "../data/641f24449a150cba09f92d5b.json";
import { Data, TreeNode } from "./types";

const data = dataJson as Data;

const People = ({ id }: { id: string }) => {
  const person = data.people.find((p) => p.id === id);

  if (!person) return "Error";

  // return (
  //   <div className="flex items-center p-2 bg-zinc-700 w-[200px] h-14 shrink-0 rounded-full m-1">
  //     <img
  //       src={`data:image/webp;base64, ${person.avatar}`}
  //       className="h-10 w-10 rounded-full"
  //     />
  //     <div className="px-2 text-sm">
  //       <div>{person.firstName}</div>
  //       <div>{person.lastName}</div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex items-center p-2 bg-zinc-700 w-[200px] h-14 shrink-0 rounded-full m-1">
      <img
        src={`data:image/webp;base64, ${person.avatar}`}
        className="h-10 w-10 rounded-full"
      />
      <div className="px-2 text-sm">
        <div>{person.firstName}</div>
        <div>{person.lastName}</div>
      </div>
    </div>
  );
};

const TreeNodeView = ({ treeNode }: { treeNode: TreeNode }) => {
  return (
    <div className="flex flex-col items-center flex-nowrap border border-zinc-500 rounded-lg m-1">
      <div className="flex items-center">
        <People id={treeNode.person} />
        {treeNode.partners && <div className="flex items-center">x</div>}
        {treeNode.partners && (
          <div className="">
            {treeNode.partners.map((partner) => (
              <People id={partner.people[0]} />
            ))}
          </div>
        )}
      </div>

      {treeNode.children && (
        <div className="flex flex-nowrap bg-zinc-800">
          {treeNode.children.map((ch) => (
            <TreeNodeView treeNode={ch} />
          ))}
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <div className="insert-0 h-full w-full absolute">
      <div className="flex w-full h-12 justify-center items-center">
        {data.title}
      </div>
      <div className="w-full h-[calc(100%-48px)] absolute top-12 overflow-auto flex justify-center">
        <div className="w-auto h-auto">
          <TreeNodeView treeNode={data.tree} />
        </div>
      </div>
    </div>
  );
};
