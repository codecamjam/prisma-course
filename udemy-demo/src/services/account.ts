import prisma from "../db";

export async function transfer(from: number, to: number, amount: number) {
  return await prisma.$transaction(async (tx) => {
    // John Account
    // 1. Decrement amount from the sender.
    const sender = await tx.account.update({
      data: {
        balance: {
          decrement: amount,
        },
      },
      where: {
        id: from,
      },
    });

    // 2. Verify that the sender's balance didn't go below zero.
    if (sender.balance < 0) {
      throw new Error(`${from} doesn't have enough to send ${amount}`);
    }

    // 3. Increment the recipient's balance by amount
    // SAM Account
    const recipient = await tx.account.update({
      data: {
        balance: {
          increment: amount,
        },
      },
      where: {
        id: to,
      },
    });

    return recipient;
  });
}