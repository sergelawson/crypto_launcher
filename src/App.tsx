import { useEffect, useState } from "react";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { Button } from "@nextui-org/button";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { LuCoins, LuNavigation, LuArrowDown, LuX } from "react-icons/lu";
import VisibleElement from "./components/VisibleElement";
import { Input } from "@nextui-org/input";
import FormModal from "./components/FormModal";

function App() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<number>();
  const [showTransModal, setShowTransModal] = useState<boolean>(false);
  const [showAirdropModal, setShowAirdropModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showTokenForm, setShowTokenForm] = useState<boolean>(false);

  const sendSOLTransaction = async (address: string, amount: number) => {
    setIsLoading(true);
    if (!publicKey) throw new WalletNotConnectedError();

    // 890880 lamports as of 2022-09-01
    const lamports = amount * 1e9;
    const toPubkey = new PublicKey(address);
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: toPubkey,
        lamports,
      })
    );

    try {
      const {
        context: { slot: minContextSlot },
        value: { blockhash, lastValidBlockHeight },
      } = await connection.getLatestBlockhashAndContext();

      const signature = await sendTransaction(transaction, connection, {
        minContextSlot,
      });

      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendAirdrop = async (address: string, amount: number) => {
    setIsLoading(true);
    if (!publicKey) throw new WalletNotConnectedError();
    const toPublicKey = new PublicKey(address);

    try {
      await connection.requestAirdrop(toPublicKey, amount * 1e9);
      getCurrentBalance();

      console.log("Airdrop successfull");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentBalance = async () => {
    if (!publicKey) {
      throw new WalletNotConnectedError();
    }

    const bal = await connection.getBalance(publicKey);

    setBalance(bal);
  };

  useEffect(() => {
    getCurrentBalance();
  }, [publicKey]);

  return (
    <>
      <div className="flex justify-center p-6">
        <div className="flex flex-col gap-y-5  w-[370px]">
          <div className="flex justify-between gap-x-2">
            <WalletMultiButton />
            {publicKey ? <WalletDisconnectButton /> : null}
          </div>
          {publicKey ? (
            <p className="text-2xl font-bold">{(balance || 0) / 1e9} SOL</p>
          ) : null}
          {publicKey ? (
            <div className="flex flex-col gap-y-2">
              <Button
                onClick={() => setShowTransModal(true)}
                color="warning"
                startContent={<LuNavigation size={20} />}
              >
                Send Transaction
              </Button>
              <Button
                onClick={() => setShowAirdropModal(true)}
                color="primary"
                startContent={<LuArrowDown size={20} />}
              >
                Request Air Drop
              </Button>
              {!showTokenForm ? (
                <Button
                  onClick={() => setShowTokenForm(true)}
                  color="secondary"
                  startContent={<LuCoins size={20} />}
                >
                  Create a Token
                </Button>
              ) : null}

              <VisibleElement isVisible={showTokenForm}>
                <div className={`flex-1 mt-6 flex flex-col gap-y-2`}>
                  <div className="flex justify-between align-middle">
                    <h6 className="font-semibold text-xl">
                      Solana Token Lauchpad{" "}
                    </h6>
                    <div
                      onClick={() => setShowTokenForm(false)}
                      className="flex justify-center align-middle cursor-pointer"
                    >
                      <LuX />
                    </div>
                  </div>

                  <form className="flex flex-col gap-y-2">
                    <Input label="Token Name" />
                    <Input label="Symbol" />
                    <Input label="Image URL" />
                    <Input label="Initial Supply" />
                    <Button
                      onClick={() => setShowTokenForm(false)}
                      color="primary"
                    >
                      Launch Token
                    </Button>
                  </form>
                </div>
              </VisibleElement>
            </div>
          ) : null}
        </div>
      </div>
      <FormModal
        isOpen={showTransModal}
        onClose={() => setShowTransModal(false)}
        onSend={sendSOLTransaction}
        title="Send Transaction"
      />
      <FormModal
        isOpen={showAirdropModal}
        onClose={() => setShowAirdropModal(false)}
        onSend={sendAirdrop}
        title="Request Airdrop"
        isLoading={isLoading}
      />
    </>
  );
}

export default App;
