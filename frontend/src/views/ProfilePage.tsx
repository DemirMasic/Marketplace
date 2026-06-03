import { useEffect, useState } from "react";
import type { Listing, ListingAttributeData, ListingImage, User } from "../types";
import { useParams } from "react-router-dom";
import ProfilePageListings from "./components/ProfilePageListings";
import ProfilePageInfo from "./components/ProfilePageInfo";
import { BuyPoints } from "./components/BuyPoints";



function ProfilePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [user, setUser] = useState<User>();
  const [listingImages, setListingImages] = useState<ListingImage[]>([]);
  const [listingsData, setListingsData] = useState<ListingAttributeData[]>([]);
  
   const { userId } = useParams();
  
  

  const loadListingData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/listing_by_user_id?user_id=${userId}`);
    const data = await res.json();
    setListings(data.listings);
    setListingsData(data.listing_attribute_data);   
    setListingImages(data.images)
  };
  const loadUserData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/get_user_by_id?user_id=${userId}`);
    const data = await res.json();
    setUser(data);
  };
 
  

  

  useEffect(() => {
    loadListingData();
    loadUserData();
    
  }, []);
  return (
    user && userId ? (
      <div className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <section className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <ProfilePageInfo
                profileUserId={userId}
                userData={user}
              ></ProfilePageInfo>
            </div>
            <BuyPoints userId={userId}></BuyPoints>
          </section>

          <ProfilePageListings
            listings={listings}
            listingImages={listingImages}
            listingsData={listingsData}
          ></ProfilePageListings>
        </div>
      </div>
    ) : null
  );
}

export default ProfilePage;
