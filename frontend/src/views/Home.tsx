import { useEffect, useState } from "react";
import type { Listing, ListingAttributeData, ListingImage } from "../types";
import HomeListings from "./components/HomeListings";
import { useAuth } from "../contexts/AuthProvider";
import Pagination from "./components/Pagination";

function Home() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [listingImages, setListingImages] = useState<ListingImage[]>([]);
  const [listingsData, setListingsData] = useState<ListingAttributeData[]>([]);
  const [favorited, setFavorited] = useState<Boolean>(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { userId } = useAuth();

  const loadListing = async () => {
    const params = new URLSearchParams();
    if (userId) {
      params.set("user_id", userId);
    }
    params.set("page", String(page));
    params.set("page_size", "8");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/highlighted_listings?${params}`);
    const data = await res.json();
    setListings(data.items);
    setTotalPages(data.total_pages);
  };
  const loadListingData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/listings_attribute_data`);
    const data = await res.json();
    setListingsData(data);
  };

  const loadListingImages = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/listing_images`);
    const data = await res.json();
    setListingImages(data);
  };

  useEffect(() => {
    loadListingData();
    loadListingImages();
  }, []);

  useEffect(() => {
    loadListing();
    setFavorited(false);
  }, [userId, page, favorited]);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-8">
        <HomeListings
          listings={listings || []}
          listingImages={listingImages}
          listingsData={listingsData}
          userId={userId}
          setFavorited={setFavorited}
        />
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </main>
  );
}

export default Home;
