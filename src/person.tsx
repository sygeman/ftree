import { Handle, Position } from "reactflow";

export const PersonNode = ({ data }) => {
  return (
    <div>
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center p-2 bg-zinc-700 w-[200px] h-14 shrink-0 rounded-full m-1">
        <img
          src={`data:image/webp;base64, ${data.avatar}`}
          className="h-10 w-10 rounded-full"
        />
        <div className="px-2 text-sm">
          <div>{data.firstName}</div>
          <div>{data.lastName}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};
