import { UniformSlot } from "@uniformdev/canvas-react";

export type TalkListNGMProps = {
  title: string;
};

export function TalkListNGM(props: TalkListNGMProps) {
  return (
    <fieldset>
      <section className="bg-white border-b py-8">
        <div className="container mx-auto flex flex-wrap pt-4 pb-12">
          <h1 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">{props?.title}</h1>
          <UniformSlot name="talks">
            {({ child, key }) => (
              <div
                key={key}
                className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink"
              >
                {child}
              </div>
            )}
          </UniformSlot>
        </div>
      </section>
    </fieldset>
  )
}