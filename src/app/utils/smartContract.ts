import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import * as web3 from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@coral-xyz/anchor";
import sha256 from "crypto-js/sha256";

// Import the local IDL
import idl from "../idl.json";

const network = "https://api.devnet.solana.com";
const connection = new Connection(network, "processed");

const wallet = window.solana; // Assuming Phantom wallet is connected
const provider = new AnchorProvider(connection, wallet, {
  preflightCommitment: "processed",
});

const programId = new PublicKey(idl.address); // Use the program ID from the IDL

const getProgram = async (): Promise<Program> => {
  try {
    return new Program(idl, programId, provider);
  } catch (error) {
    console.error("Error creating program instance:", error);
    throw error;
  }
};

const createEscrow = async (amount1: number, hash: Buffer) => {
  try {
    const program = await getProgram();
    const maker = provider.wallet.publicKey;
    const seed = new BN(123);
    const amount = new BN(amount1);

    const [escrow, _escrowBump] = await PublicKey.findProgramAddress(
      [
        Buffer.from("escrow"),
        maker.toBytes(),
        seed.toArrayLike(Buffer, "le", 8),
      ],
      program.programId
    );
    const [vault, _vaultBump] = await PublicKey.findProgramAddress(
      [Buffer.from("escrow_vault"), escrow.toBytes()],
      program.programId
    );

    let initializeTx = await program.methods
      .initialize(seed, hash, amount)
      .accounts({
        user: maker,
        escrowVault: vault,
        escrow: escrow,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    // Sign and send the transaction using the Phantom wallet
    const signedTx = await wallet.signTransaction(initializeTx);
    const txId = await provider.connection.sendRawTransaction(
      signedTx.serialize()
    );

    console.log("Transaction ID (initialize):", txId);

    // Deposit funds into escrow
    let depositTx = await program.methods
      .deposit(new BN(amount))
      .accounts({
        user: maker,
        escrow: escrow,
        escrowVault: vault,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    // Sign and send the deposit transaction
    const signedDepositTx = await wallet.signTransaction(depositTx);
    const depositTxId = await provider.connection.sendRawTransaction(
      signedDepositTx.serialize()
    );

    console.log("Transaction ID (deposit):", depositTxId);

    return depositTxId;
  } catch (error) {
    console.error("Error creating escrow:", error);
  }
};

const withdrawFromEscrow = async (
  amount: number,
  keyword: string,
  vault: PublicKey,
  escrow: PublicKey,
  user: web3.Keypair
) => {
  try {
    const program = await getProgram();

    const keywordHash = sha256(keyword).toString();

    const tx = await program.methods
      .withdraw(new BN(amount), keywordHash)
      .accounts({
        user: user.publicKey,
        escrow: escrow,
        escrowVault: vault,
        systemProgram: SystemProgram.programId,
      })
      .signers([user])
      .rpc();

    console.log("Transaction ID (withdraw):", tx);
  } catch (error) {
    console.error("Error withdrawing from escrow:", error);
  }
};

const closeEscrow = async (
  keyword: string,
  vault: PublicKey,
  escrow: PublicKey,
  signTransaction: (transaction: Transaction) => Promise<Transaction>
) => {
  try {
    const program = await getProgram();

    const keywordHash = sha256(keyword).toString();

    const publicKey = provider.wallet.publicKey;

    const closeTransaction = await program.methods
      .close(keywordHash)
      .accounts({
        user: publicKey,
        escrow: escrow,
        escrowVault: vault,
        systemProgram: SystemProgram.programId,
      })
      .transaction();

    const closeTransactionSig = await signTransaction(closeTransaction);
    const closeTransactionId = await provider.connection.sendRawTransaction(
      closeTransaction.serialize()
    );

    console.log("Transaction ID (close):", closeTransactionId);
  } catch (error) {
    console.error("Error closing escrow:", error);
  }
};

export { createEscrow, withdrawFromEscrow, closeEscrow, getProgram };
