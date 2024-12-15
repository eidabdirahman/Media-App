import Button from "./Button";
import { useRemoveAlbumMutation } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import { GoTrashcan } from "react-icons/go";
import PhotosList from "./PhotosList";

 function AlbumsListItem  ({album}) {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const handleRemoveAlbum = () =>{
    removeAlbum(album);
  }
    const header = <div className="flex flex-row items-center justify-between">
        <Button onClick={handleRemoveAlbum} loading={results.isLoading} className="mr-4">
            <GoTrashcan/>
        </Button>
        {album.title}
        </div>
  return (
   
    <ExpandablePanel key={album.id} header={header} >
     <PhotosList album={album}/>
    </ExpandablePanel>
  )
    
   
    
  
 
}

export default AlbumsListItem
