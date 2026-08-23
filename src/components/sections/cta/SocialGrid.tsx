import SocialCell from "./SocialCell";
import { socialLinks } from "@/data/site";

/** 4 x 330px = 1320px exactly. -ml-px/-mt-px collapses the shared hairlines. */
export default function SocialGrid() {
  return (
    <ul className="grid w-full grid-cols-2 lg:grid-cols-4">
      {socialLinks.map((link) => (
        <li key={link.name} className="-ml-px -mt-px">
          <SocialCell link={link} />
        </li>
      ))}
    </ul>
  );
}
