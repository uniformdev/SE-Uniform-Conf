import Link from "next/link";

export type EntryProps = {
  title: string;
  description: string;
  audience: string;
  slug: string;
};

export type TalkProps = {
  Entry: EntryProps
};

export const Talk = (props: TalkProps) => (
  <div className="flex-1 bg-white rounded-t rounded-b-none overflow-hidden shadow space-y-2 pt-2">
    <div className="flex-none mt-auto bg-white rounded-b rounded-t-none overflow-hidden">
      <div className="mt-3 mb-3 flex items-center justify-start">
        <AudienceLabel audienceName={props?.Entry?.audience?.length > 0 ? props.Entry.audience[0] : ''} />
      </div>
    </div>
    <Link legacyBehavior href={"/talks/" + props?.Entry?.slug} className="flex flex-wrap">
      <div className="w-full font-bold text-xl text-gray-800 px-6">
        <a>{props?.Entry?.title}</a>
      </div>
    </Link>
    <div className="text-gray-800 px-6 pb-6 text-sm">
      {props?.Entry?.description}
    </div>
  </div>
);

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
