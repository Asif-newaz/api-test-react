type ProductsCardProps = {
  imgSource: string;
  name: string;
  price: any;
};

export const ProductsCard: React.FC<ProductsCardProps> = ({
  imgSource,
  name,
  price,
}) => {
  return (
    <div className="w-32">
      <div className="h-32 rounded-md bg-white/50 p-4 flex justify-center items-center">
        <img className="w-16" width={50} height={50} src={imgSource} alt="" />
      </div>
      <div className="pt-5">
        <h3 className="text-white text-center text-xs">{name}</h3>
        <h3 className="text-white text-center font-bold mt-2">TK {price}</h3>
      </div>
    </div>
  );
};
