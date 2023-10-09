import { FiCloudLightning } from "react-icons/fi";
import { motion } from "framer-motion";
import { MdFoodBank } from "react-icons/md";
import { FaGlassWaterDroplet } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { GiWaterDrop } from "react-icons/gi";
import Link from "next/link";


const Example = () => {
  return (
    <div className="flex justify-center items-center space-x-6 px-4 py-12">
      <ShimmerBorderCard 
        IconComponent={BsFillHouseDoorFill}
        title="Shelter" 
        description="Find a place to stay safe."
        link="/shelter"
      />
      <ShimmerBorderCard
        IconComponent={MdFoodBank}
        title="Food"
        description="Find a place to eat."
        link="/food"
      />
      <ShimmerBorderCard
        IconComponent={GiWaterDrop}
        title="Water"
        description="Find a place to get water."
        link="/water"
      />
    </div>
  );
};

const ShimmerBorderCard = ({ IconComponent, title, description, link }) => {
  return (
    <Link href={link}>
    <div className="w-72 group relative mx-auto w-full max-w-sm overflow-hidden rounded-lg  p-0.5 transition-all duration-500 hover:scale-[1.01] ">
      <div className="relative z-10 flex flex-col items-center justify-center overflow-hidden rounded-[7px] p-8 transition-colors duration-500 ">
        <IconComponent className="relative z-10 mb-10 mt-2 rounded-full border-2 border-indigo-500  p-4 text-7xl text-indigo-500" />
        <h4 className="relative z-10 mb-4 w-full text-3xl font-bold text-BLACK">
          {title}
        </h4>
        <p className="relative z-10 text-slate-400">
          {description}
        </p>
      </div>
      <motion.div
        initial={{ rotate: "0deg" }}
        animate={{ rotate: "360deg" }}
        style={{ scale: 1.75 }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: "linear",
        }}
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
    </div>
    </Link>
  );
};

export default Example;
