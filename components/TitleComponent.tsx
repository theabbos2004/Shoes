import * as React from "react";

import { cn } from "@/lib/utils";


export interface TitleCompProps extends React.HTMLAttributes<HTMLDivElement>{
    title: string;
    titleClassName:string,
    subTitle:string,
    subTitleClassName:string,
    leftElement: React.ReactNode;
    leftElementClassName:string
}
const TitleComponent = React.forwardRef<HTMLDivElement, Partial<TitleCompProps>>(
  ({ className, title,titleClassName,subTitle,subTitleClassName, leftElement,leftElementClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex justify-between",className)}
        {...props}
      >
        <div>
          <h1 className={cn(`text-2xl font-bold text-gray_1`,titleClassName)}>{title}</h1>
          <h3 className={cn(`text-gray_1`,subTitleClassName)}>{subTitle}</h3>
        </div>
        <div className={cn('flex items-end',leftElementClassName)}>
            {leftElement}
        </div>
      </div>
    );
  }
);

TitleComponent.displayName = "TitleComponent";

export default TitleComponent 
