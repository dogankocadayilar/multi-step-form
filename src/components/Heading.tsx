interface HeadingProps {
  title: string;
  subTitle?: string;
}

function Heading({ title, subTitle }: HeadingProps) {
  return (
    <div>
      <div className="text-2xl font-bold">{title}</div>
      <div className="font-light text-neutral-500 mt-2">{subTitle}</div>
    </div>
  );
}

export default Heading;
