import { useEffect, useState } from "react";
import type { Listing, ListingAttributeData, ListingImage, User } from "../types";
import { useParams } from "react-router-dom";
import ProfilePageListings from "./components/ProfilePageListings";
import ProfilePageInfo from "./components/ProfilePageInfo";
import { BuyPoints } from "./components/BuyPoints";
import { useAuth } from "../contexts/AuthProvider";
import Reviews from "./components/Reviews";
import Pagination from "./components/Pagination";

type ProfileTab = "listings" | "favorites" | "reviews";

function ProfilePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [user, setUser] = useState<User>();
  const [listingImages, setListingImages] = useState<ListingImage[]>([]);
  const [listingsData, setListingsData] = useState<ListingAttributeData[]>([]);
  const [favoriteListings, setFavoriteListings] = useState<Listing[]>([]);
  const [favoriteListingImages, setFavoriteListingImages] = useState<ListingImage[]>([]);
  const [favoriteListingsData, setFavoriteListingsData] = useState<ListingAttributeData[]>([]);
  const [activeTab, setActiveTab] = useState<ProfileTab>("listings");
  const [favorited, setFavorited] = useState<Boolean>(false);
  const [listingsPage, setListingsPage] = useState(1);
  const [listingsTotalPages, setListingsTotalPages] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [favoritesTotalPages, setFavoritesTotalPages] = useState(1);

  const { profileUserId } = useParams();
  const { userId } = useAuth();

  const loadListingData = async () => {
    if (!profileUserId) return;

    const params = new URLSearchParams({ user_id: profileUserId });
    if (userId) {
      params.set("favorite_user_id", userId);
    }
    params.set("page", String(listingsPage));
    params.set("page_size", "8");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/listing_by_user_id?${params}`);
    const data = await res.json();
    setListings(data.listings);
    setListingsData(data.listing_attribute_data);   
    setListingImages(data.images);
    setListingsTotalPages(data.total_pages);
  };

  const loadFavoriteListingData = async () => {
    if (!profileUserId) return;

    const params = new URLSearchParams({ user_id: profileUserId });
    if (userId) {
      params.set("favorite_user_id", userId);
    }
    params.set("page", String(favoritesPage));
    params.set("page_size", "8");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/favorite_listings?${params}`);
    const data = await res.json();
    setFavoriteListings(data.listings);
    setFavoriteListingsData(data.listing_attribute_data);
    setFavoriteListingImages(data.images);
    setFavoritesTotalPages(data.total_pages);
  };

  const loadUserData = async () => {
    if (!profileUserId) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/get_user_by_id?user_id=${profileUserId}`);
    const data = await res.json();
    setUser(data);
  };

  useEffect(() => {
    loadUserData();
    setListingsPage(1);
    setFavoritesPage(1);
  }, [profileUserId]);

  useEffect(() => {
    if (activeTab === "listings") {
      loadListingData();
      setFavorited(false);
    }

    if (activeTab === "favorites") {
      loadFavoriteListingData();
      setFavorited(false);
    }
  }, [activeTab, profileUserId, userId, listingsPage, favoritesPage, favorited]);

  return (
    user && profileUserId ? (
      <div className="min-h-screen bg-slate-100 px-4 py-8 md:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <section className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <ProfilePageInfo
                profileUserId={profileUserId}
                userData={user}
              ></ProfilePageInfo>
            </div>
            {userId === profileUserId ? (
              <BuyPoints userId={profileUserId}></BuyPoints>
            ) : null}
          </section>

          <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setActiveTab("listings")}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeTab === "listings"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Listings
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("favorites")}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeTab === "favorites"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Favorites
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeTab === "reviews"
                    ? "bg-orange-500 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                Reviews
              </button>
            </div>
          </div>

          {activeTab === "listings" && (
            <>
              <ProfilePageListings
                listings={listings}
                listingImages={listingImages}
                listingsData={listingsData}
                userId={userId}
                setFavorited={setFavorited}
              ></ProfilePageListings>
              <Pagination page={listingsPage} totalPages={listingsTotalPages} onPageChange={setListingsPage} />
            </>
          )}

          {activeTab === "favorites" && (
            <>
              <ProfilePageListings
                listings={favoriteListings}
                listingImages={favoriteListingImages}
                listingsData={favoriteListingsData}
                userId={userId}
                setFavorited={setFavorited}
                title="Favorites"
                description="Browse this user's favorite marketplace listings."
                emptyMessage="No favorite listings found."
              ></ProfilePageListings>
              <Pagination page={favoritesPage} totalPages={favoritesTotalPages} onPageChange={setFavoritesPage} />
            </>
          )}

          {activeTab === "reviews" && (
            <Reviews reviewedUserId={profileUserId}></Reviews>
          )}
        </div>
      </div>
    ) : null
  );
}

export default ProfilePage;
