export const Person = ({ id }: { id: string }) => {
  const person = data.people.find((p) => p.id === id);

  if (!person) return "Error";

  return (
    <div className="flex items-center p-2 bg-zinc-700 w-[200px] shrink-0 rounded-xl m-1">
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
