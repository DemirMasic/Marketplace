import CheckoutButton from "./CheckoutButton";


type ProfilePageInfoProps = {
  userId: string;
};

export const BuyPoints = ({userId} : ProfilePageInfoProps)=>{



  return (
    <div className="mx-auto justify-center flex flex-col w-full min-h-screen bg-slate-100 px-4 py-8 md:px-8">
      <div className="justify-center w-full flex flex-row">
    <CheckoutButton userId={userId} points={50} amount={100}></CheckoutButton>
      <CheckoutButton userId={userId} points={100} amount={180}></CheckoutButton> 
      <CheckoutButton userId={userId} points={200} amount={350}></CheckoutButton> 
      <CheckoutButton userId={userId} points={500} amount={600}></CheckoutButton> 
      </div>
      </div>
  );


}
