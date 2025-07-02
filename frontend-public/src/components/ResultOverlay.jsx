import React from "react";
import {
    Box,
    Text,
    Button,
    VStack,
    Icon,
} from "@chakra-ui/react";
import {CheckCircleIcon, WarningIcon} from "@chakra-ui/icons";

const ResultOverlay = ({matches, error, onClose}) => {
    const artwork = matches && matches.length > 0 ? matches[0] : null;

    const isNoMatch = !artwork || error;

    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="blackAlpha.800"
            display="flex"
            justifyContent="center"
            alignItems="center"
            zIndex={1000}
            p={6}
        >
            <VStack spacing={4} textAlign="center" color="white">
                {isNoMatch ? (
                    <>
                        <Icon as={WarningIcon} w={10} h={10} color="red.300"/>
                        <Text fontSize="2xl" fontWeight="bold">Aucune œuvre reconnue</Text>
                        {error && <Text fontSize="sm">Erreur réseau ou analyse impossible</Text>}
                        {!error && <Text fontSize="sm">Essayez de recadrer ou changer de position.</Text>}
                    </>
                ) : (
                    <>
                        <Icon as={CheckCircleIcon} w={10} h={10} color="green.300"/>
                        <Text fontSize="2xl" fontWeight="bold">{artwork.title}</Text>
                        <Text>{artwork.artist}</Text>
                        <Text fontSize="sm">{artwork.description}</Text>
                    </>
                )}

                <Button onClick={onClose} colorScheme="teal">
                    Fermer
                </Button>
            </VStack>
        </Box>
    );
};

export default ResultOverlay;
