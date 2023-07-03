<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use HasFactory,SoftDeletes;
    protected $table='blog';

    public function comment(){
        return $this->hasMany(Comment::class,'BlogID','id');
    }

    public function tag(){
        $array=array();
        foreach(json_decode($this->tag) as $item){
            $tag=Tag::find($item->id);
            if($tag){
                array_push($array,$tag);
            }
        }
        return $array;
    }

    public function addTag($string){
        $temp=array();
        foreach(explode(',', $string) as $item){
            $tag=Tag::where('name',$item)->first();
            if(!$tag && $item){
                $tag=new Tag();
                $tag->name=$item;
                $tag->color='#' . dechex(rand(0,10000000));
                $tag->save();
            }
            if($tag){
                $result=true;
                if($result){
                    array_push($temp,json_decode('{"id":'.$tag->id.'}'));
                }
            }
        }
        return json_encode($temp);
    }

    public function updateTag($string){
        $temp=array();
        foreach(explode(',', $string) as $item){
            $tag=Tag::where('name',$item)->first();
            if(!$tag && $item){
                $tag=new Tag();
                $tag->name=$item;
                $tag->color='#' . dechex(rand(0,10000000));
                $tag->save();
            }
            if($tag && count($temp)<=4){
                array_push($temp,json_decode('{"id":'.$tag->id.'}'));
            }
        }
        return json_encode($temp);
    }

    public function addCover(Request $request){
        if($request->file('cover')){
            $path=$request->file('cover')->storeAs('cover/'.(string)(count(Blog::all())+1),$request->file('cover')->getClientOriginalName(),'public');
            if($path){
                if(Storage::exists($this->cover)){
                    Storage::disk('local')->delete(str_replace('/storage/','/public/',$this->cover));
                }
                return '/storage/'.$path;
            }
        }

        return $this->cover;
    }

    //暫時移除，這個功能是在瀏覽文章的頁面可以直接新增標籤的功能，因為需要在新增文章的功能已經有類似的功能，故此先暫時移除
    // public function addTag($name){
    //     $temp=json_decode($this->tag);
    //     $tag=Tag::where('name',$name)->first();
    //     if(!$tag && $name){
    //         $tag=new Tag();
    //         $tag->name=$name;
    //         $tag->color='#' . dechex(rand(0,10000000));
    //         $tag->save();
    //     }
    //     if($tag && count($temp)<=4){
    //         $result=true;
    //         foreach($temp as $item){
    //             if($item->id==$tag->id){
    //                 $result=false;
    //                 break;
    //             }
    //         }
    //         if($result){
    //             array_push($temp,json_decode('{"id":'.$tag->id.'}'));
    //         }
    //     }
    //     return json_encode($temp);
    // }

    //暫時移除，這個功能是在瀏覽文章的頁面可以直接刪除標籤的功能
    // public function deleteTag($id){
    //     $temp=json_decode($this->tag);
    //     if($temp){
    //         $result=false;
    //         foreach($temp as $key=>$item){
    //             if($item->id==$id){
    //                 $result=$key;
    //                 break;
    //             }
    //         }
    //         if($result){
    //             array_splice($temp, $key, 1);
    //         }
    //     }
    //     return json_encode($temp);
    // }
}
