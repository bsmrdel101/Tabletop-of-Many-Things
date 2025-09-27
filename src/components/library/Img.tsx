interface Props extends ImgHTML {}


export default function Img(props: Props) {
  return (
    <img draggable={false} {...props} />
  );
}
