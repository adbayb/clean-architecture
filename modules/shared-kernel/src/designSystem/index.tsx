import type { FunctionComponent, PropsWithChildren, ReactElement } from "react";
import { Card as ChakraCard, Image } from "@chakra-ui/react";

export {
	ChakraProvider,
	defaultSystem as chakraDefaultSystem,
	Box,
	Button,
	Heading,
	Image,
	Text,
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
