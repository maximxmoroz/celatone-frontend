import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Text,
  MenuItem,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useWallet } from "@cosmos-kit/react";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import { MdCheck } from "react-icons/md";

import { useInternalNavigate } from "lib/app-provider";
import { WalletSection } from "lib/components/Wallet";
import { getNetworkByChainName, getSupportedChainNames } from "lib/data";

import Searchbar from "./Searchbar";

const Header = () => {
  const router = useRouter();
  const navigate = useInternalNavigate();
  const {
    currentChainRecord,
    currentChainName,
    setCurrentChain,
    getChainRecord,
  } = useWallet();

  const handleChainSelect = useCallback(
    (chainName: string) => {
      if (chainName === currentChainName) return;
      setCurrentChain(chainName);
      navigate({
        pathname: router.asPath.replace(`/${router.query.network}`, ""),
        query: {
          /**
           * @remarks Condition checking varies by chain
           */
          network: getNetworkByChainName(chainName) ? "mainnet" : "testnet",
        },
      });
    },
    [currentChainName, setCurrentChain, navigate, router]
  );

  return (
    <Flex
      as="header"
      width="100vw"
      height="full"
      align="center"
      justifyContent="space-between"
      px={6}
      mb={1}
      gap="48px"
    >
      <Image
        src="/celatone-logo.svg"
        alt="Celatone"
        width="115px"
        mr="36px"
        _hover={{ cursor: "pointer" }}
        onClick={() => navigate({ pathname: "/" })}
      />
      <Searchbar />
      <Flex gap={2}>
        <Menu>
          <MenuButton
            px={4}
            py="5px"
            transition="all 0.2s"
            borderRadius="4px"
            borderWidth="1px"
            _hover={{ bg: "gray.800" }}
            w="170px"
          >
            <Flex
              alignItems="center"
              justifyContent="space-between"
              display="flex"
            >
              <Text
                textOverflow="ellipsis"
                variant="body2"
                overflow="hidden"
                whiteSpace="nowrap"
                maxW="170px"
              >
                {currentChainRecord?.chain.chain_id}
              </Text>
              <Icon as={FiChevronDown} />
            </Flex>
          </MenuButton>
          <MenuList>
            {getSupportedChainNames().map((chainName) => (
              <MenuItem
                key={chainName}
                onClick={() => {
                  handleChainSelect(chainName);
                }}
                flexDirection="column"
                alignItems="flex-start"
                _hover={{
                  backgroundColor: "hover.dark",
                }}
              >
                <Flex justify="space-between" align="center" w="full">
                  <Flex direction="column">
                    <Text variant="body2">
                      {getChainRecord(chainName)?.chain.pretty_name}
                    </Text>
                    <Text color="text.dark" variant="body3">
                      {getChainRecord(chainName)?.chain.chain_id}
                    </Text>
                  </Flex>
                  {chainName === currentChainName && (
                    <Icon as={MdCheck} boxSize={4} color="gray.600" />
                  )}
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <WalletSection />
      </Flex>
    </Flex>
  );
};

export default Header;
