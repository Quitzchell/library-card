import { services } from "@/lib/services.config";

export default async function MusicList() {
  const musicItems = await services.music.getMusicItems(0, 3);

  return (
      <>
      {musicItems.data.map((musicItem) => (
        <div key={`${musicItem.bandcamp_item?.type}-${musicItem.bandcamp_item?.id}`}>
          <iframe
            src={`https://bandcamp.com/EmbeddedPlayer/${musicItem.bandcamp_item?.type}=${musicItem.bandcamp_item?.id}/size=large/bgcol=333333/linkcol=ffffff/tracklist=false/artwork=small/transparent=true/`}
            className="m-auto h-30 w-[90%] rounded shadow outline-2 outline-black"
            seamless
          />
        </div>
      ))}
    </>
  );
}
