
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div>
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#839083]">
          {eyebrow}
        </p>
        <h1 className="text-[30px] font-semibold tracking-[-0.04em] text-[#292e29] sm:text-[34px]">
          {title}
        </h1>
        <p className="mt-2 max-w-[560px] text-[13px] leading-6 text-[#767d75]">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
