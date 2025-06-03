import { FC } from "react";
import { IconBaseProps } from "react-icons/lib";

import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as FiIcons from "react-icons/fi";
import * as GiIcons from "react-icons/gi";
import * as IoIcons from "react-icons/io";
import * as TiIcons from "react-icons/ti";
import * as CgIcons from "react-icons/cg";
import * as VscIcons from "react-icons/vsc";
import * as TbIcons from "react-icons/tb";
import * as LuIcons from "react-icons/lu";
import * as Io5Icons from "react-icons/io5";

type IconPack =
  | "fa"
  | "md"
  | "bs"
  | "ai"
  | "ri"
  | "fi"
  | "gi"
  | "io"
  | "ti"
  | "cg"
  | "vsc"
  | "tb"
  | "lu"
  | "io5";

interface Props extends IconBaseProps {
  iconName: string;
  iconPack: IconPack;
}

const iconPacks: Record<IconPack, Record<string, FC<IconBaseProps>>> = {
  fa: FaIcons,
  md: MdIcons,
  bs: BsIcons,
  ai: AiIcons,
  ri: RiIcons,
  fi: FiIcons,
  gi: GiIcons,
  io: IoIcons,
  ti: TiIcons,
  cg: CgIcons,
  vsc: VscIcons,
  tb: TbIcons,
  lu: LuIcons,
  io5: Io5Icons,
};

const IconRenderer = ({ iconName, iconPack = "fa", ...props }: Props) => {
  const IconComponent = iconPacks[iconPack]?.[iconName] as
    | FC<IconBaseProps>
    | undefined;

  if (!IconComponent) {
    console.error(`Icon "${iconName}" not found in "${iconPack}"`);
    return null;
  }

  return <IconComponent {...props} />;
};

export default IconRenderer;
