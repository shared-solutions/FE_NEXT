import Image from "next/image";
import close_round from "@/app/public/image/close_round.png";

export default function CloseImg({ onClick }) {
  return (
    <Image
      src={close_round}
      alt="close"
      width={18}
      height={18}
      onClick={onClick}
    />
  );
}
