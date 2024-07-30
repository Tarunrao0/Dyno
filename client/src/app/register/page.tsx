export default function Register() {
  return (
    <>
      <div>
        <h1 className="text-6xl mt-36 ml-24 font-black text-inkblue">
          Become a Verified Seller
        </h1>
      </div>
      <div className="text-xl mt-8 ml-28 font-semibold ">
        <p>
          Sign up to become a seller on dyno. Go ahead and fill up the form and
          an admin will verfiy your details and grant you the seller role!
        </p>
        <p>
          After you've been verified, your details will be displayed on the
          table on the Homepage, where buyers can see and buy your energy 🌩️
        </p>
      </div>
      <div className="mt-20 mb-10 flex items-center justify-center">
        <div className=" bg-almond/15 p-4 pr-10 pl-10 rounded-lg font-semibold w-full max-w-md">
          <form>
            <label className="block">Name: </label>
            <input
              className="mb-4 bg-almond/50 rounded-lg w-full"
              name="sellerName"
            />
            <label className="block">Email: </label>
            <input
              className="mb-4 bg-almond/50 rounded-lg w-full"
              name="sellerEmail"
            />
            <label className="block">Ethereum Wallet Address: </label>
            <input
              className="mb-4 bg-almond/50 rounded-lg w-full"
              name="walletAddress"
            />
            <label className="block">Energy type: </label>
            <input
              className="mb-4 bg-almond/50 rounded-lg w-full"
              name="energyType"
            />
            <label className="block">About you: </label>
            <textarea
              className="mb-4 bg-almond/50 rounded-lg w-full"
              name="summary"
            />
            <label className="block">Image: </label>
            <input
              className="mb-4 bg-almond/50 rounded-lg w-full"
              name="image"
            />
            <button
              type="submit"
              className="block bg-inkblue font-black px-8 text-oatmilk rounded-lg transition-transform duration-300 hover:-translate-y-2 mx-auto"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
