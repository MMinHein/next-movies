import Movies from "@/components/Movies";
const token = process.env.TMDB_TOKEN;

async function fetchPopular() {
  const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

async function fetchTrending() {
  const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export default async function Home() {
  const popular = await fetchPopular();
  const trending = await fetchTrending();

  return (
    <>
      <div className="section">
        <h3 className="font-bold border-b mb-4 pb-2">Popular</h3>
        <Movies movies={popular.results} />
      </div>

      <div className="section mt-10">
        <h3 className="font-bold border-b mb-4 pb-2">Trending</h3>
        <Movies movies={trending.results} />
      </div>
    </>
  );
}
