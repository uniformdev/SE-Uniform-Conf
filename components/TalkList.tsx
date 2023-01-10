import { Slot } from "@uniformdev/canvas-react";

export type TalkListProps = {
  Entry: {
    title: string;
  }
};

export function TalkList(props: TalkListProps) {
  return (
    <fieldset>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1
            className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800"
            dangerouslySetInnerHTML={{ __html: props?.Entry?.title }}
          />
          <Slot name="Talks">
            {({ child, key }) => (
              <div
                key={key}
                className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
              >
                {child}
              </div>
            )}
          </Slot>
        </div>
      </section>
    </fieldset>
  )
}