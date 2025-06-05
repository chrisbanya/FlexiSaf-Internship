import { Filter } from "../components/Filter";

const Head = () => {
  return (
    <header className="mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
         Our Products
        </h1>
        <h2>Discover our carefully curated collection</h2>
      </div>
      <div>
        <Filter />
      </div>
    </header>
  );
};

export default Head;
