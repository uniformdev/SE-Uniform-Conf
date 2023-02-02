import Link from "next/link";

type Talk = {
  title: string;
  audience: string[];
  intro: string;
  slug: string;
}

export type ArrayTalkListProps = {
  Entries: Talk[];
};

export function ArrayTalkList(props: ArrayTalkListProps) {
  return (
    <div className="pt-24">
      <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <fieldset>
          <section className="bg-white border-b py-8">
            <div className="container mx-auto flex flex-wrap pt-4 pb-12">
              {props.Entries.map(talk => {
                return (<div key={talk?.title} className="w-full md:w-1/3 p-6 flex flex-col flex-grow flex-shrink">
                  <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow space-y-2 pt-2">
                    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden">
                      <div className="mt-3 mb-3 flex items-center justify-start">
                        <AudienceLabel audienceName={talk?.audience?.length > 0 ? talk?.audience[0] : ''} />
                      </div>
                    </div>
                    <Link legacyBehavior href={"/talks/" + talk.slug} className="flex flex-wrap">
                      <div className="w-full font-bold text-xl text-gray-800 px-6">
                        <a>{talk?.title}</a>
                      </div>

                    </Link>
                    <div className="text-gray-800 px-6 pb-6 text-sm">
                      {talk?.intro}
                    </div>
                  </div>
                </div>)
              })}
            </div>
          </section>
        </fieldset>
      </div>
    </div>
  )
}

export interface AudienceLabelProps {
  audienceName?: string;
}

const AudienceLabel: React.FC<AudienceLabelProps> = ({ audienceName }) => (
  <span
    className={
      audienceName === "Developers"
        ? "ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
        : "ml-6 px-6 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800"
    }
  >
    {audienceName}
  </span>
);
