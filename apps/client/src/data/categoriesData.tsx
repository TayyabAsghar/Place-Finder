import { AiFillCar } from "react-icons/ai";
import { IoDiamond } from "react-icons/io5";
import { TbIroning3 } from "react-icons/tb";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { PiBathtubFill, PiCoatHangerFill, PiTelevisionFill } from "react-icons/pi";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import { GiHeatHaze, GiCctvCamera, GiBarbecue, GiToaster, GiCampfire } from "react-icons/gi";
import { FaSkiing, FaPumpSoap, FaShower, FaFireExtinguisher, FaUmbrellaBeach, FaKey } from "react-icons/fa";
import { BiSolidWasher, BiSolidDryer, BiSolidFirstAid, BiWifi, BiSolidFridge, BiWorld } from "react-icons/bi";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";

const AssetsPath = "assets/images/categories";

export const AllCategories = [{
    label: "All",
    icon: <BiWorld />,
    img: `${AssetsPath}/world.webp`
}, {
    label: "Beachfront",
    icon: <TbBeach />,
    img: `${AssetsPath}/beach.webp`,
    description: "This property is close to the beach!"
}, {
    label: "Windmills",
    icon: <GiWindmill />,
    img: `${AssetsPath}/windmill.webp`,
    description: "This property is has windmills!"
}, {
    label: "Iconic Cities",
    icon: <MdOutlineVilla />,
    img: `${AssetsPath}/modern.webp`,
    description: "This property is modern!"
}, {
    label: "Countryside",
    icon: <TbMountain />,
    img: `${AssetsPath}/countryside.webp`,
    description: "This property is in the countryside!"
}, {
    label: "Amazing Pools",
    icon: <TbPool />,
    img: `${AssetsPath}/pool.webp`,
    description: "This is property has a beautiful pool!"
}, {
    label: "Islands",
    icon: <GiIsland />,
    img: `${AssetsPath}/island.webp`,
    description: "This property is on an island!"
}, {
    label: "Lakefront",
    icon: <GiBoatFishing />,
    img: `${AssetsPath}/lake.webp`,
    description: "This property is near a lake!"
}, {
    label: "Ski-in/out",
    icon: <FaSkiing />,
    img: `${AssetsPath}/skiing.webp`,
    description: "This property has skiing activities!"
}, {
    label: "Castles",
    icon: <GiCastle />,
    img: `${AssetsPath}/castle.webp`,
    description: "This property is an ancient castle!"
}, {
    label: "Caves",
    icon: <GiCaveEntrance />,
    img: `${AssetsPath}/cave.webp`,
    description: "This property is in a spooky cave!"
}, {
    label: "Camping",
    icon: <GiForestCamp />,
    img: `${AssetsPath}/camping.webp`,
    description: "This property offers camping activities!"
}, {
    label: "Arctic",
    icon: <BsSnow />,
    img: `${AssetsPath}/arctic.webp`,
    description: "This property is in arctic environment!"
}, {
    label: "Desert",
    icon: <GiCactus />,
    img: `${AssetsPath}/desert.webp`,
    description: "This property is in the desert!"
}, {
    label: "Barns",
    icon: <GiBarn />,
    img: `${AssetsPath}/barn.webp`,
    description: "This property is in a barn!"
}, {
    label: "Luxury",
    icon: <IoDiamond />,
    img: `${AssetsPath}/lux.webp`,
    description: "This property is brand new and luxurious!"
}];

export const AllCategoriesNames = AllCategories.map(category => category.label.toLowerCase());

export const Types = [{
    name: "An entire place",
    icon: <FaHouseUser />,
    description: "Guests have the whole place to themselves"
}, {
    name: "Room(s)",
    icon: <BsFillDoorOpenFill />,
    description: "Guests have their own room in a house, plus access to shared places"
}, {
    name: "A Shared Room",
    icon: <FaPeopleRoof />,
    description: "Guests sleep in a room or common area that maybe shared with you or others"
}];

export const Facilities = [{
    name: "Bath tub",
    icon: <PiBathtubFill />
}, {
    name: "Hygiene products",
    icon: <FaPumpSoap />
}, {
    name: "Outdoor shower",
    icon: <FaShower />
}, {
    name: "Washer",
    icon: <BiSolidWasher />
}, {
    name: "Dryer",
    icon: <BiSolidDryer />
}, {
    name: "Hangers",
    icon: <PiCoatHangerFill />
}, {
    name: "Iron",
    icon: <TbIroning3 />
}, {
    name: "TV",
    icon: <PiTelevisionFill />
}, {
    name: "Dedicated workspace",
    icon: <BsPersonWorkspace />
}, {
    name: "Air Conditioning",
    icon: <BsSnow />
}, {
    name: "Heating",
    icon: <GiHeatHaze />
}, {
    name: "Security cameras",
    icon: <GiCctvCamera />
}, {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />
}, {
    name: "First Aid",
    icon: <BiSolidFirstAid />
}, {
    name: "Wifi",
    icon: <BiWifi />
}, {
    name: "Cooking set",
    icon: <FaKitchenSet />
}, {
    name: "Refrigerator",
    icon: <BiSolidFridge />
}, {
    name: "Microwave",
    icon: <MdMicrowave />
}, {
    name: "Stove",
    icon: <GiToaster />
}, {
    name: "Barbecue grill",
    icon: <GiBarbecue />
}, {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />
}, {
    name: "Private patio or Balcony",
    icon: <MdBalcony />
}, {
    name: "Camp fire",
    icon: <GiCampfire />
}, {
    name: "Garden",
    icon: <MdYard />
}, {
    name: "Free parking",
    icon: <AiFillCar />
}, {
    name: "Self check-in",
    icon: <FaKey />
}, {
    name: "Pet allowed",
    icon: <MdPets />
}];