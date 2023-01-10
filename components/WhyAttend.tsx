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
  variant: string;
};

export function WhyAttend(props : WhyAttendProps) {
  return (
    <section className="bg-white border-b py-8">
      <div
        className="container mx-auto flex flex-wrap pt-4 pb-12"
        style={{
          flexDirection:
            props.variant === "imageAlignmentLeft" ? "row" : "row-reverse",
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
            <h2
              className="w-full my-2 text-4xl font-bold leading-tight text-center text-gray-800"
              dangerouslySetInnerHTML={{ __html: props?.Entry?.title }}
            />
            <hr />
            <p
              className="text-gray-800 p-10 whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: props?.Entry?.description }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}