import Image from "next/image";
import Writing from "../../../public/writing.png";
import Reading from "../../../public/reading.png";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center pt-14 justify-center max-w-5xl">
      <div className="flex items-center gap-x-12">
        <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
          <Image src={Writing} alt="Writing" className="object-contain" />
        </div>
        <div className="relative h-[400px] w-[400px] hidden md:block">
          <Image src={Reading} alt="Reading" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
