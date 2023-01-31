export const WhyAttendLoading = () => {
  return (
    <div
      className="container mx-auto flex flex-wrap pt-4 pb-12"
      style={{ minHeight: 515 }}
    ></div>
  );
};

export type WhyAttendProps = {
  Entry: {
    title: string;
    description: string;
    image: {
      src: string;
      alt: string;
      width?: number;
      height?: number;
    }
  },
  component: {
    variant: string;
  }
};

export function WhyAttend(props : WhyAttendProps) {

  return (
    <section className="bg-white border-b py-8">
      <div
        className="container mx-auto flex flex-wrap pt-4 pb-12"
        style={{
          flexDirection:
            props.component?.variant === "whyattendleft" ? "row" : "row-reverse",
        }}
      >
        {props?.Entry?.image ? (
          <div className="w-1/2">
            <img
              src={props?.Entry?.image?.src}
              alt={props?.Entry?.image?.alt}
              width={400}
              height={400}
              loading="lazy"
              className="p-10"
            />
          </div>
        ) : null}
        <div className="w-1/2">
          <div className="p-10">
            <h2 className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800">
              {props?.Entry?.title}
            </h2>
            <hr />
            <p className="text-gray-800 p-10 whitespace-pre-line">
              {props?.Entry?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}