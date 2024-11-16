export default function Welcome() {
  return (
    <main className='px-4 py-10 space-y-4'>
      <h1 className="text-2xl">Welcome to <span className='font-orbitron font-bold'>TonPocket!</span> 👋🏽</h1>
      <p>
        In a world where financial freedom is key to achieving your dreams, TonPocket makes the journey simple and accessible. Our unique platform allows you to create a secure digital "pocket" on the TON blockchain, right from within Telegram. Whether you’re setting personal savings goals, receiving support from friends and family, or even launching a crowdfunding campaign, TonPocket brings you closer to your financial objectives with every step.
      </p>
      <p>
        What You Can Do with TonPocket:
      </p>
      <ul className="list-disc pl-6">
        <li>
          Set Personal Savings Goals <br />
          Define your goals, big or small. Whether it's a dream vacation, a new gadget, or a long-term investment, TonPocket helps you stay on track.
        </li>
        <li>
          Receive Tips and Support <br />
          Let your friends and family contribute to your goals! Our tipping feature makes it easy to receive a little extra help along the way.
        </li>
        <li>
          Crowdfund Your Ambitions <br />
          Need to raise funds for a bigger project? Start a crowdfunding campaign and make it happen with transparency and security, thanks to blockchain technology.
        </li>
      </ul>
      <p>
        Why TonPocket? <br />
        TonPocket combines the familiarity of Telegram with the security of decentralized finance. As a Telegram mini app, TonPocket is right at your fingertips—no complicated setups, just straightforward financial management in an app you already know and love.
        Take control of your financial journey with TonPocket. Let's get started!
      </p>
      <button className="mt-10 font-extrabold text-xl font-orbitron w-full px-4 py-2 text-white rounded-md bg-primaryDark">
        Get started
      </button>
    </main>
  )
}
