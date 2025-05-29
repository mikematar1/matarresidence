<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Google\Cloud\Storage\StorageClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Photo_Gallery extends Controller
{
    public function addAndRemoveImages(Request $request){ // images_removed/images_added

        if($request->has("images_added")){
            $images = $request->images_added;

            if(!empty($images)){
                for($i=0;$i<sizeof($images);$i++){
                    $base64Image = $images[$i];
                    $imageData = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Image));
                    $filename = uniqid() . '.png';
                    $folderPath = 'gallery/';

                    Storage::disk('s3')->put($folderPath . $filename, $imageData);
                    $url = Storage::disk('s3')->url($folderPath . $filename);
                    Image::create([
                        "room_id"=>0,
                        "image_url"=>$url

                    ]);
                }
            }
        }
        if($request->has("images_removed")){
            $images = $request->images_removed;
            $folder_name = "gallery/";
            if(!empty($images)){
                for($i=0;$i<sizeof($images);$i++){
                    $imageid = $images[$i];
                    $image = Image::find($imageid);
                    $url = $image->image_url;
                    if (preg_match('/([\w]+.(png|jpg|jpeg|gif))/', $url, $matches)) {

                        $objectKey = str_replace("https://hotel-images-bucket.s3.eu-north-1.amazonaws.com/", '', $url);

                    // Delete the object using Laravel's Storage facade
                    Storage::disk('s3')->delete($objectKey);
                        $image->delete();
                    }

                }
            }
        }
        return $this->getImages();
    }
    public function getImages(){
        return Image::where('room_id','=',0)->get();
    }
}
