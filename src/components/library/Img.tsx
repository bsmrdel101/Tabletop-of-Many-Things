interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  draggable?: boolean
  alt?: string
}


export default function Img({ alt = '', draggable = false, ...props }: Props) {
  return (
    <img alt={alt} draggable={draggable} {...props} />
  );
}
