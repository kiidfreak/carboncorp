import { erc20Abi } from "viem";

import * as ethers from "ethers";

import { useReadContract, useWatchContractEvent } from "wagmi";
import { useWriteContract } from "wagmi";
import { ccswapAbi } from "./abis/ccswap";
import { useEffect, useState } from "react";

export const getCCBalance = (address: `0x${string}`) => {
  const [balance, setBalance] = useState<string>("0");

  const { data: balanceTT, refetch } = useReadContract({
    abi: erc20Abi,
    address: "0xafC9D020d0b67522337058f0fDea057769dd386A",
    functionName: "balanceOf",
    args: [address],
    account: address,
    chainId: 4202,
  });

  useEffect(() => {
    if (balanceTT) {
      setBalance(ethers.formatUnits(balanceTT, 18));
    }
  }, [balanceTT]);

  useWatchContractEvent({
    address: "0x8f6fDE1B60e0d74CA7B3fD496444Dac2f2C7d882",
    abi: erc20Abi,
    eventName: "Transfer",
    onLogs(logs) {
      const relevantLog = logs.find(
        (log) => log.args.from === address || log.args.to === address
      );
      if (relevantLog) {
        refetch();
      }
    },
  });

  return Number(balance).toFixed(4);
};

export const getTTBalance = (address: `0x${string}`) => {
  const [balance, setBalance] = useState<string>("0");

  const { data: balanceTT, refetch } = useReadContract({
    abi: erc20Abi,
    address: "0x8f6fDE1B60e0d74CA7B3fD496444Dac2f2C7d882",
    functionName: "balanceOf",
    args: [address],
    account: address,
    chainId: 4202,
  });

  useEffect(() => {
    if (balanceTT) {
      setBalance(ethers.formatUnits(balanceTT, 18));
    }
  }, [balanceTT]);

  useWatchContractEvent({
    address: "0x8f6fDE1B60e0d74CA7B3fD496444Dac2f2C7d882",
    abi: erc20Abi,
    eventName: "Transfer",
    onLogs(logs) {
      const relevantLog = logs.find(
        (log) => log.args.from === address || log.args.to === address
      );
      if (relevantLog) {
        refetch();
      }
    },
  });

  return Number(balance).toFixed(4);
};

export const getCCLTBalance = (address: `0x${string}`) => {
  const [balance, setBalance] = useState<string>("0");

  const { data: balanceTT, refetch } = useReadContract({
    abi: erc20Abi,
    address: "0x665FE43468B4a10128a406bc4F826065C9cDA877",
    functionName: "balanceOf",
    args: [address],
    account: address,
    chainId: 4202,
  });

  useEffect(() => {
    if (balanceTT) {
      setBalance(ethers.formatUnits(balanceTT, 18));
    }
  }, [balanceTT]);

  useWatchContractEvent({
    address: "0x665FE43468B4a10128a406bc4F826065C9cDA877",
    abi: erc20Abi,
    eventName: "Transfer",
    onLogs(logs) {
      const relevantLog = logs.find(
        (log) => log.args.from === address || log.args.to === address
      );
      if (relevantLog) {
        refetch();
      }
    },
  });

  return Number(balance).toFixed(4);
};

export const getPoolRatio = () => {
  const { data: poolRatio } = useReadContract({
    abi: ccswapAbi,
    address: "0x665FE43468B4a10128a406bc4F826065C9cDA877",
    functionName: "getPoolRatio",
    //blockTag: "safe",
    chainId: 4202,
  });

  console.log(poolRatio);

  return poolRatio ? Number(poolRatio) : 1;
};

export const getCCtoTTPrice = () => {
  const { data: CCtoTTPrice } = useReadContract({
    abi: ccswapAbi,
    address: "0x665FE43468B4a10128a406bc4F826065C9cDA877",
    functionName: "getAssetPrice",
    //blockTag: "safe",
    chainId: 4202,
  });

  console.log(CCtoTTPrice);

  return CCtoTTPrice ? Number(CCtoTTPrice) : 1;
};

export const depositLiquidity = (ccAmount: number, ttAmount: number) => {
  const { writeContract } = useWriteContract();

  const cc = ethers.parseUnits((ccAmount * 10 ** 18).toString(), "wei");
  const tt = ethers.parseUnits((ttAmount * 10 ** 18).toString(), "wei");

  console.log("cc", cc, "tt", tt);

  writeContract({
    abi: ccswapAbi,
    address: "0x665FE43468B4a10128a406bc4F826065C9cDA877",
    functionName: "addLiquidity",
    args: [cc, tt],
    chainId: 4202,
  });

  return;
};

export const withdrawLiquidity = (ccltAmount: number) => {
  const { writeContract } = useWriteContract();

  const cclt = ethers.parseUnits((ccltAmount * 10 ** 18).toString(), "wei");

  console.log("cclt", cclt);

  writeContract({
    abi: ccswapAbi,
    address: "0x665FE43468B4a10128a406bc4F826065C9cDA877",
    functionName: "removeLiquidity",
    args: [cclt],
    chainId: 4202,
  });

  return;
};

export const swapCC = (ccltAmount: number) => {
  const { writeContract } = useWriteContract();

  const cclt = ethers.parseUnits((ccltAmount * 10 ** 18).toString(), "wei");

  console.log("cclt", cclt);

  writeContract({
    abi: ccswapAbi,
    address: "0x665FE43468B4a10128a406bc4F826065C9cDA877",
    functionName: "swapCC",
    args: [cclt],
    chainId: 4202,
  });

  return;
};
