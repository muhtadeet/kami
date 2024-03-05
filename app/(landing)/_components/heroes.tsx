import Image from "next/image";
import Writing from "../../../public/writing.png";
import Reading from "../../../public/reading.png";

const Heroes = () => {
  return (
    <div className="flex flex-col items-center sm:pt-14 md:pt-7 xl:pt-14 justify-center max-w-5xl">
      <div className="flex items-center gap-x-12">
        <div className="w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[220px] md:h-[220px] xl:h-[400px] xl:w-[400px]">
          <Image src={Writing} alt="Writing" className="object-contain" />
        </div>
        <div className="relative md:w-[220px] md:h-[220px] xl:h-[400px] xl:w-[400px] hidden md:block">
          <Image src={Reading} alt="Reading" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Heroes;
