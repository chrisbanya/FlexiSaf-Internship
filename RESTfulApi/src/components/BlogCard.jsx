const BlogCard = ({ title, price, description, category, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square overflow-hidden">
        <img
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          src={image}
          alt={title}
          loading="lazy"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between items-start">
          <span className="text-sm text-gray-500 uppercase tracking-wide">
            {category}
          </span>
          <span className="text-lg font-bold text-green-600">{`$${price}`}</span>
        </div>
        <h2 className="font-semibold text-gray-900 line-clamp-2">{title}</h2>

        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </div>
    </div>
  );
};

export default BlogCard;
