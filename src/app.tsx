import data from "../data/641f24449a150cba09f92d5b.json";

export const App = () => {
  console.log(data);

  return (
    <div className="insert-0 h-full w-full absolute">
      <div className="flex w-full h-12 justify-center items-center">
        {data.title}
      </div>
      <div className="w-full h-[calc(100%-48px)]">Tree</div>
    </div>
  );
};
