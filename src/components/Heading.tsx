interface HeadingProps {
  title: string;
  subTitle?: string;
}

function Heading({ title, subTitle }: HeadingProps) {
  return (
    <div className="md:mt-5">
      <div className="text-2xl md:text-4xl font-bold text-blue-900">
        {title}
      </div>
      <div className="text-md md:text-xl text-slate-500 mt-2">{subTitle}</div>
    </div>
  );
}

export default Heading;
