export type CarouselItem = { id?: string | number } & Record<string, any>;
export type RenderItem = (params: {
  item: CarouselItem;
  index: number;
}) => React.ReactNode;
