import type { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import {
	Button as ChakraButton,
	Card as ChakraCard,
	Heading as ChakraHeading,
	Image as ChakraImage,
	Text as ChakraText,
} from "@chakra-ui/react";

export {
	ChakraProvider,
	defaultSystem as chakraDefaultSystem,
	Box,
} from "@chakra-ui/react";

export type CardProps = {
	readonly actionSlot: ReactElement;
	readonly header: {
		title: string;
		description: string;
	};
	readonly image: {
		accessibilityLabel: string;
		source: string;
	};
};

const CardRoot: FunctionComponent<
	PropsWithChildren<{ readonly variant?: "outline"; readonly width?: string }>
> = (props) => <ChakraCard.Root {...props} />;

const CardBody: FunctionComponent<
	PropsWithChildren<{ readonly gap?: string }>
> = (props) => <ChakraCard.Body {...props} />;

const CardFooter: FunctionComponent<
	PropsWithChildren<{ readonly justifyContent?: string }>
> = (props) => <ChakraCard.Footer {...props} />;

const CardTitle: FunctionComponent<
	PropsWithChildren<{
		readonly title?: string;
		readonly fontSize?: string;
		readonly overflow?: string;
		readonly textOverflow?: string;
		readonly whiteSpace?: string;
	}>
> = (props) => <ChakraCard.Title {...props} />;

export const Card = ({
	actionSlot,
	header: { title, description },
	image,
}: CardProps) => {
	return (
		<CardRoot
			variant="outline"
			width="272px"
		>
			<ChakraCard.Header>
				<CardTitle
					fontSize="sm"
					overflow="hidden"
					textOverflow="ellipsis"
					title={title}
					whiteSpace="nowrap"
				>
					{title}
				</CardTitle>
				<ChakraCard.Description>{description}</ChakraCard.Description>
			</ChakraCard.Header>
			<CardBody gap="2">
				<Image
					alt={image.accessibilityLabel}
					rounded="md"
					src={image.source}
				/>
			</CardBody>
			<CardFooter justifyContent="flex-end">{actionSlot}</CardFooter>
		</CardRoot>
	);
};

export const Button: FunctionComponent<{
	readonly children: string;
	readonly onClick: () => void;
	readonly variant?: "outline" | "solid";
}> = (props) => <ChakraButton {...props} />;

export const Heading: FunctionComponent<{
	readonly children: string;
	readonly size?:
		| "2xl"
		| "3xl"
		| "4xl"
		| "5xl"
		| "6xl"
		| "7xl"
		| "lg"
		| "md"
		| "sm"
		| "xl"
		| "xs";
}> = (props) => <ChakraHeading {...props} />;

export const Image: FunctionComponent<{
	readonly alt?: string;
	readonly rounded?: "md";
	readonly src?: string;
}> = (props) => <ChakraImage {...props} />;

export const Text: FunctionComponent<{
	readonly children: string;
	readonly color?: string;
}> = (props) => {
	return <ChakraText {...props} />;
};
