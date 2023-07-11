import { CardItem } from "./CardItem";
import { useStockList } from "./hooks/useStockList";

const categories = [
  { id: 1, name: "Hardware", value: "hardware" },
  { id: 2, name: "Periféricos", value: "peripherals" },
  { id: 3, name: "Cabos", value: "cables" },
  { id: 4, name: "Outros", value: "others" },
];

export function StockList() {
  const { data } = useStockList({});

  return (
    <div className="w-full flex flex-col items-center  gap-4">
      {categories.map((category) => {
        return (
          <div
            className="w-full flex flex-col items-center justify-center p-4 border-gray-200 border rounded-lg shadow-md"
            key={category.id}
          >
            <h4 className="font-bold text-lg mb-3">{category.name}</h4>

            <div className="w-full items-center justify-center grid grid-cols-4 grid-rows-2 gap-6 ">
              {data?.items
                .filter((item) => item.category === category.value)
                .map((item) => {
                  return <CardItem key={item.id} item={item} />;
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
