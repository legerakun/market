interface PriceProps {
  cssClass: string;
  price: number;
}

export const Price = ({ cssClass, price }: PriceProps) => {
  const [dollars, cents] = price.toFixed(2).split(".");

  return (
    <div className={cssClass}>
      $<span className="item-dollars">{dollars}</span>
      <span className="item-cents">{cents}</span>
    </div>
  );
};