import {
	ComponentProps,
	ComponentRef,
	forwardRef,
	ForwardRefRenderFunction,
} from "react";

import { cn } from "@/lib/utils";

interface ISkeletonProps extends ComponentProps<"div"> {}
const component: ForwardRefRenderFunction<
	ComponentRef<"div">,
	ISkeletonProps
> = ({ className, ...props }, ref) => (
	<div
		className={cn("animate-pulse bg-muted rounded-md", className)}
		ref={ref}
		{...props}
	/>
);

export const Skeleton = forwardRef(component);
