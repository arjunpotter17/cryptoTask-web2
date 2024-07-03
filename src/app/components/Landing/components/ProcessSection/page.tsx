import React from "react";

const ProcessSection: React.FC = () => {
  return (
    <div className="process-section bg-cryptoTask-black text-cryptoTask-white font-cryptoTask-regular p-4 flex justify-center flex-col items-center">
      <h2 className="text-cryptoTask-banner-header-mobile ct-md:text-cryptoTask-banner-header font-bold mb-4 text-cryptoTask-orange self-start pl-0 ct-xl:pl-7">
        How It Works
      </h2>
      <div className="max-w-[900px] mt-6">
        <div className="mb-10 ct-md:mb-24">
          <h3 className="text-cryptoTask-title-mobile ct-md:text-cryptoTask-title font-bold mb-4 text-cryptoTask-orange">
            Create or Mark an Issue for Bounty
          </h3>
          <p>
            Users can easily create a new issue or task on GitHub directly
            through our platform. Additionally, they can mark an existing issue
            for bounty, making it available for others to solve. This feature
            allows developers to signal important tasks that require attention
            and incentivize contributions with a bounty.
          </p>
        </div>

        <div className="mb-10 ct-md:mb-24">
          <h3 className="text-cryptoTask-title-mobile ct-md:text-cryptoTask-title font-bold mb-4 text-cryptoTask-orange">
            Solve Tasks and Claim Bounties
          </h3>
          <p>
            Developers can browse and solve available tasks to earn bounties
            directly into their linked wallets. Once a task is completed and
            verified, the bounty is transferred to the developer's wallet. This
            system encourages collaboration and ensures that contributors are
            fairly rewarded for their efforts.
          </p>
        </div>

        <div className="">
          <h3 className="text-cryptoTask-title-mobile ct-md:text-cryptoTask-title font-bold mb-4 text-cryptoTask-orange">
            Set Expiration for Bounties
          </h3>
          <p>
            Creators can set an expiration date for bounties, ensuring that
            tasks are completed within a specified time frame. If the bounty
            expires without being claimed, the SOL (Solana) is automatically
            transferred back to the creator's account. This feature helps
            maintain the flow of tasks and ensures that funds are returned if
            tasks are not completed in time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
