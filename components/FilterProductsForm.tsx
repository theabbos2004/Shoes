"use client";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Colors, FilterValues } from "@/types";
import { Range, Thumb, Track } from "@radix-ui/react-slider";
import { XIcon } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme-provider";


const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
const colors = ["orange","red","blue","green","black","white"];
const categories = ["Casual shoes", "Runners", "Hiking", "Sneaker", "Basketball", "Golf", "Outdoor"];
const genders = ["Men", "Women"];
 
const getColorClasses = (color: string) => {
  switch (color) {
    case Colors.Orange:
      return "orange_1";
    case Colors.Red:
      return "red_1";
    case Colors.Blue:
      return "primary_1";
    case Colors.Green:
      return "green_1";
    case Colors.Black:
      return "black_1";
    case Colors.White:
      return "white_1";
    default:
      return "gray-500";
  }
};


type Props<T extends FieldValues>={
  handleSubmit:(data:FilterValues)=>void,
  defaultValues:T,
  isFilterCard:boolean,
  colapseFilterCard:()=>void
}

const FilterProducts=<T extends FieldValues>({handleSubmit,defaultValues,isFilterCard,colapseFilterCard}:Props<T>) => {
  const { control, handleSubmit:handleSubmitForm, watch, setValue, reset } = useForm<FilterValues>({defaultValues});
  const {screen}=useContext(ThemeContext)
  const selectedSizes = watch("sizes");
  const selectedColors = watch("colors");

  return (
      <div className={` ${isFilterCard && screen.width < 768 ?"fixed h-screen overflow-y-scroll top-0 left-0 z-[10] bg-gray-100 w-full":"md:block hidden"}`}>
        <div className="container mx-auto flex justify-between py-5 bg-gray-50 md:bg-transparent">
          <h1 className="font-bold text-xl">Filters</h1>
          <XIcon className="md:hidden" onClick={colapseFilterCard}/>
        </div>
        <form 
          className="container mx-auto"
          onSubmit={handleSubmitForm((data:FilterValues) => {
            handleSubmit(data)
            colapseFilterCard()
          }
          )}>
            <Accordion type="multiple" className="space-y-4" defaultValue={["item-1","item-2","item-3","item-4","item-5","item-6"]}>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-semibold uppercase mb-2">
                  Refine By
                </AccordionTrigger>
                <AccordionContent className="flex gap-2">
                  <Badge variant="primary">Mens</Badge>
                  <Badge variant="primary">Casual</Badge>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="font-semibold uppercase mb-2">
                  Size
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-5 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "secondary" : "default"}
                      onClick={() =>
                        setValue(
                          "sizes",
                          selectedSizes.includes(size)
                            ? selectedSizes.filter((s) => s !== size)
                            : [...selectedSizes, size]
                        )
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="font-semibold uppercase mb-2">
                  Color 
                </AccordionTrigger>
                <AccordionContent className="flex gap-2 flex-wrap">
                  {colors.map((color) => (
                      <Button
                        key={color}
                        className={cn(
                          `size-10 rounded-md ${getColorClasses(color)}`,
                          selectedColors.includes(color) && "border-2 border-gray_1"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() =>
                          setValue(
                            "colors",
                            selectedColors.includes(color)
                              ? selectedColors.filter((c) => c !== color)
                              : [...selectedColors, color]
                          )
                        }
                      />
                    ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="font-semibold uppercase mb-2">
                Category
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <Controller
                        key={category}
                        name="categories"
                        control={control}
                        render={({ field }) => (
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              className="border-2 border-gray-300 box-border"
                              checked={field.value.includes(category)}
                              onCheckedChange={(checked) =>
                                setValue("categories", checked ? [...field.value, category] : field.value.filter((c) => c !== category))
                              }
                            />
                            <span>{category}</span>
                          </div>
                        )}
                  />
                ))}
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="font-semibold uppercase mb-2">
                Gender
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                {genders.map((gender) => (
                  <Controller
                    key={gender}
                    name="genders"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          className="border-2 border-gray-300 box-border"
                          checked={field.value.includes(gender)}
                          onCheckedChange={(checked) =>
                            setValue("genders", checked ? [...field.value, gender] : field.value.filter((g) => g !== gender))
                          }
                        />
                        <span>{gender}</span>
                      </div>
                    )}
                  />
                ))}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="font-semibold uppercase mb-2">
                Price
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 py-3">
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <Slider
                        min={0}
                        max={1000}
                        value={field.value}
                        onValueChange={field.onChange}
                        step={1}
                        className="SliderRoot"
                      >	
                        <Track className="SliderTrack bg-red-500">
                          <Range className="SliderRange text-gray_1"/>
                        </Track>
                        <Thumb className="SliderThumb text-red-400"/>
                      </Slider>
                    )}
                  />
                  <p className="text-sm">${watch("price")[0]} - ${watch("price")[1]}</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <div className="w-full grid grid-cols-2 gap-5 justify-between py-5">
              <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>
              <Button type="submit" variant={"secondary"}>Apply</Button>
            </div>
        </form>
      </div>
  );
}

export default FilterProducts
