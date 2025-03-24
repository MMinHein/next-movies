const token = process.env.TMDB_TOKEN;

async function fetchCasts(id) {
    const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    );
    return (await res.json()).cast;
}

export default async function Persons({ params }) {
    const { id } = await params;
    const casts = await fetchCasts(id);
    const profile = "http://image.tmdb.org/t/p/w185";
    return (
        <div className="flex flex-wrap flex-grow gap-7 items-ceter justify-left">
            {casts.map(cast => {
                return (
                    <div
                        key={cast.id}
                        className="w-[120px] h-auto bg-gray-800 text-center flex flex-col justify-between rounded-lg shadow-md overflow-hidden p-2 border border-gray-700"
                    >
                        {cast.profile_path ? (
                            <img
                                src={profile + cast.profile_path}
                                alt={cast.name}
                                className="w-full h-[120px] object-cover rounded-md"
                            />
                        ) : (
                            <div className="h-[120px] bg-gray-700 rounded-md flex items-center justify-center text-gray-400 text-xs">
                                No Image
                            </div>
                        )}
                        <div className="p-1 flex flex-col">
                            <div className="text-xs font-semibold text-gray-200 break-words mb-1">{cast.name}</div>
                            <span className="text-xs text-gray-400 break-words">{cast.character}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
