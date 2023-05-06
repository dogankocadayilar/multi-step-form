interface HeadingProps {
  title: string;
  subTitle?: string;
}

function Heading({ title, subTitle }: HeadingProps) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-bold text-blue-950">
        {title}
      </div>
      <div className="text-md md:text-lg text-slate-500 mt-2">{subTitle}</div>
    </div>
  );
}

export default Heading;
